# Dover's Greybearded QoL Enhancements

Enhances the [Greybearded Qol](https://github.com/mosh-greybearded-qol) module with additional quality of life improvements, specifically targeting the character creation experience.

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

## Screenshots

## Technical Details

This module works by:
1. Registering a custom Handlebars helper (`splitAttributes`) to process attribute strings.
2. Overriding the default `select-class.html` template from the parent module.
3. Patching the `ClassSelectorApp` to support the new interactive layout.
