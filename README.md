# Dover's Greybearded QoL Enhancements

Enhances the [Greybearded QoL](https://github.com/mosh-greybearded-qol) module with additional quality of life improvements, specifically targeting the character creation experience.

## Features

### Enhanced Class Selection UI
Replaces the standard class selection interface with a modern "Master-Detail" layout:
- **Split View:** A list of classes on the left and detailed information on the right.
- **Improved Readability:** Attributes are automatically parsed and split into positive and negative columns for easier comparison.
- **Visual Upgrades:** Includes class icons and structured sections for Trauma Responses, Descriptions, and Skills.

## Installation

1. Install via the Foundry VTT Module browser (if available) or by using the Manifest URL.
2. Ensure the **Greybearded QoL** module is installed and active, as this module depends on it.

## Dependencies

- **Foundry VTT:** Version 13+
- **Module:** `mosh-greybearded-qol`
- **Systems:** `mosh`

## Screenshots

| Before | After |
| --- | --- |
| <img alt="image" src="https://github.com/user-attachments/assets/4fb2b657-3207-4129-89df-41ce6552ba63" /> | <img width="726" height="749" alt="image" src="https://github.com/user-attachments/assets/0431dc78-70f5-4f78-b21f-e736e7c89511" /> <br/> <img width="726" height="954" alt="image" src="https://github.com/user-attachments/assets/670ed4be-b656-42c4-b410-aa9710e031fe" /> |





## Technical Details

This module works by:
1. Registering a custom Handlebars helper (`splitAttributes`) to process attribute strings.
2. Overriding the default `select-class.html` template from the parent module.
3. Patching the `ClassSelectorApp` to support the new interactive layout.
