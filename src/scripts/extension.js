Hooks.once("init", async () => {
  Handlebars.registerHelper("splitAttributes", function (attributesString) {
    if (!attributesString) return "";

    const parts = attributesString
      .split(/<br\s*\/?>/i)
      .map((p) => p.trim())
      .filter((p) => p);

    const positives = [];
    const negatives = [];
    const others = [];

    parts.forEach((part) => {
      if (part.startsWith("+")) {
        positives.push(part);
      } else if (part.startsWith("-")) {
        negatives.push(part);
      } else {
        const match = part.match(/^(-?\+?[\d]+)/);
        if (match) {
          const val = parseInt(match[1]);
          if (val < 0) negatives.push(part);
          else positives.push(part);
        } else {
          others.push(part);
        }
      }
    });

    const buildList = (items, className) => {
      if (!items.length) return "";
      return items
        .map((item) => `<div class="${className}">${item}</div>`)
        .join("");
    };

    let html = '<div class="attr-columns">';

    if (positives.length || others.length) {
      html += `<div class="attr-col positive-col">${buildList([...positives, ...others], "attr-item positive")}</div>`;
    }

    if (negatives.length) {
      html += `<div class="attr-col negative-col">${buildList(negatives, "attr-item negative")}</div>`;
    }

    html += "</div>";
    return html;
  });

  const overridePath =
    "modules/dovers-greybearded-qol-enhancements/templates/select-class-override.html";
  const originalKey =
    "modules/mosh-greybearded-qol/templates/character-creator/select-class.html";

  try {
    const response = await fetch(overridePath);
    if (!response.ok) throw new Error("Failed to fetch override template");

    const templateContent = await response.text();
    const compiled = Handlebars.compile(templateContent);

    if (!Handlebars.templates) Handlebars.templates = {};
    Handlebars.templates[originalKey] = compiled;
    Handlebars.registerPartial(originalKey, compiled);
  } catch (e) {
    console.error("Dovers QoL Extension | Failed to inject template:", e);
    return;
  }

  try {
    const module =
      await import("/modules/mosh-greybearded-qol/scripts/character-creator/select-class.js");
    const ClassSelectorApp = module.ClassSelectorApp;

    if (ClassSelectorApp) {
      console.log("Dovers QoL Extension | Patching ClassSelectorApp...");
      ClassSelectorApp.prototype._updateSelectionUi = function () {
        const root = this.element;
        if (!root) return;

        const selectedId = this._selectedClassId;

        root
          .querySelectorAll(".class-list-item, .class-card")
          .forEach((item) => {
            const isSelected = item.dataset.classId === selectedId;
            item.classList.toggle("selected", isSelected);
          });

        let hasSelection = false;
        const detailViews = root.querySelectorAll(".class-detail-view");

        if (detailViews.length > 0) {
          detailViews.forEach((view) => {
            if (view.dataset.classId === selectedId) {
              view.classList.add("active");
              view.style.display = "block";
              hasSelection = true;
            } else {
              view.classList.remove("active");
              view.style.display = "none";
            }
          });
        }

        const placeholder = root.querySelector(".class-detail-placeholder");
        if (placeholder) {
          if (hasSelection) {
            placeholder.style.display = "none";
          } else {
            placeholder.style.display = "flex";
          }
        }

        const confirmBtn =
          root.querySelector('[data-action="confirm"]') ||
          root.querySelector("#confirm-button");
        if (confirmBtn) {
          const locked = !selectedId;
          confirmBtn.classList.toggle("locked", locked);
          confirmBtn.disabled = locked;
        }
      };
      console.log("Dovers QoL Extension | Class Selection UI logic patched.");
    }
  } catch (e) {
    console.error("Dovers QoL Extension | Error patching UI logic:", e);
  }
});
