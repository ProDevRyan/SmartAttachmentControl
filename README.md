---
languages:
  - typescript
  - css
products:
  - power-platform
  - power-apps
page_type: sample
description: "A fully customizable Power Apps Component Framework (PCF) control that enables drag-and-drop local file selection with real-time preview, base64 encoding, and extensive styling options."
---

# Smart Attachment Control - Power Apps Component Framework Sample

## Summary

The Smart Attachment Control is a fully customizable Power Apps Component Framework (PCF) control that enables drag-and-drop local file selection with real-time preview and management. Files are converted to base64-encoded JSON strings that can be easily transformed into Power Apps collections for further processing, storage, or integration with SharePoint, Dataverse, or other data sources.

Built with React 16.14.0 and TypeScript, the control provides extensive styling options, file type restrictions, size limits, and built-in validation to create a professional file upload experience.

![Preview of the Smart Attachment Control](./assets/preview.png)

## Key Features

- **Drag-and-drop file upload** with visual feedback
- **Real-time file preview** with type-specific icons
- **Base64 encoding** for seamless Power Apps integration
- **File validation**: size limits, type restrictions, max file count
- **Extensive styling options**: colors, borders, shadows, fonts, layouts
- **Programmatic clearing** via counter-based property
- **Built-in developer documentation** overlay
- **Responsive layouts**: horizontal or vertical arrangement
- **Custom icon support** via SVG properties

## Compatibility

This control works for canvas apps.

## Applies to

[Power Apps component framework](https://learn.microsoft.com/power-apps/developer/component-framework/overview)

## Contributors

Created by **PowerPlatformRyan**
- GitHub: [@ProDevRyan](https://github.com/ProDevRyan)
- LinkedIn: [View profile](https://www.linkedin.com/in/ryan-d-johnston/)

## Version history

| Version | Date             | Comments                                                                 |
| ------- | ---------------- | ------------------------------------------------------------------------ |
| 1.0.0   | November 2025    | Initial release with drag-and-drop, validation, and styling options     |

## Prerequisites

- [Install the Microsoft Power Platform CLI](https://learn.microsoft.com/power-platform/developer/cli/introduction)
- Node.js (v16 or higher recommended)
- npm (comes with Node.js)

## Quick Start

### Building the Control

1. Clone this repository
2. Navigate to the project directory
3. Run `npm install` to install dependencies
4. Run `npm run build` to compile the control

### Creating a Solution Package

1. Navigate to the `Solution` folder
2. Run `msbuild /t:restore`
3. Run `msbuild /t:build`
4. Find the generated solution zip in `Solution/bin/Debug/`

### Importing to Power Apps

Import the solution zip file using:
- **Manual**: [Import via make.powerapps.com](https://learn.microsoft.com/powerapps/maker/data-platform/import-update-export-solutions)
- **CLI**: `pac solution import --path SmartAttachmentControl_1_0_5_unmanaged.zip --activate-plugins`

### Using the Control

1. Add the control to your Power Apps screen
2. Add this code to the control's **OnChange** event:

```javascript
ClearCollect(colAttachments, ForAll(ParseJSON(SmartAttachmentControl.Files), {
    name: Text(ThisRecord.name),
    size: Value(ThisRecord.size),
    type: Text(ThisRecord.type),
    base64: Text(ThisRecord.base64)
}))
```

3. Access files from the `colAttachments` collection

## Control Properties

### Data Properties

- **Files** (Output): JSON string containing uploaded files
- **ClearFiles** (Input): Numeric counter - increment to clear files
- **ShowDocumentation** (Input): Boolean - display developer documentation overlay

### Style Properties

#### Colors
- **stylePrimaryColorHex**: Button and border color (default: #3860B2)
- **styleMainTextColor**: Primary text color (default: #000000)
- **styleButtonTextColor**: Button text color (default: #FFFFFF)
- **styleBackgroundColorHex**: Drop zone background (default: #e1dfdd)
- **styleErrorColorHex**: Error messages and delete icon (default: #d13438)

#### Layout
- **styleBorderRadius**: Border radius in pixels (default: 5)
- **styleBoxShadowSize**: Shadow offset in pixels (default: 3)
- **styleGap**: Gap between drop zone and file list (default: 20)
- **styleLayoutHorizontal**: True for side-by-side, false for stacked (default: true)
- **styleFont**: Font family name (default: Open Sans)

### Icon Properties (SVG)
- **svgDropZone**: Custom drop zone icon
- **svgEmptyFileList**: Custom empty list icon
- **svgTypeImage**: Custom image file icon
- **svgTypeDoc**: Custom document file icon
- **svgTypeOther**: Custom other file type icon
- **svgDeleteIcon**: Custom delete button icon

### Settings
- **settingMaxFileSizeMB**: Maximum file size in MB (default: 10)
- **settingMaxNumberOfFiles**: Maximum file count (default: 5)
- **settingAllowedFileTypes**: Comma-separated extensions (e.g., ".pdf,.jpg,.doc")
- **textBrowseButtonText**: Browse button label (default: "Select files")

## Programmatic File Clearing

Initialize a counter variable:
```javascript
UpdateContext({varClearCounter: 0});
```

To clear files, increment the counter:
```javascript
UpdateContext({varClearCounter: varClearCounter + 1});
```

## Common Scenarios

### Restrict to PDFs Only
```
settingAllowedFileTypes: ".pdf"
settingMaxFileSizeMB: 25
```

### Photo Upload
```
settingAllowedFileTypes: ".jpg,.jpeg,.png,.heic"
settingMaxFileSizeMB: 5
settingMaxNumberOfFiles: 10
```

### Compact Layout
```
styleGap: 10
styleBorderRadius: 2
styleBoxShadowSize: 1
```

## Development

### Testing Locally
```bash
npm run start
```

This opens the test harness at `http://localhost:8181` where you can test the control with sample data.

### Building for Production
```bash
npm run build
```

### Linting
```bash
npm run lint
```

## Project Structure

```
SmartAttachmentControl/
├── SmartAttachmentControlComponent/    # Control source code
│   ├── ControlManifest.Input.xml       # Control manifest and properties
│   ├── index.ts                         # PCF lifecycle implementation
│   ├── SmartAttachment.tsx             # React component and documentation
│   └── css/
│       └── SmartAttachment.css         # Control styling
├── Solution/                        # Solution packaging
│   ├── Solution.cdsproj             # Solution project file
│   └── src/Other/
│       └── Solution.xml             # Solution metadata
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
├── pcfconfig.json                   # PCF configuration
└── README.md                        # This file
```

## Technical Details

- **Framework**: Power Apps Component Framework (PCF)
- **UI Library**: React 16.14.0
- **Language**: TypeScript 4.9.5
- **Build Tool**: pcf-scripts
- **File Encoding**: Base64 with data URI prefix
- **Control Version**: 1.0.4
- **Solution Version**: 1.0.5

## Known Limitations

- File size limited by Power Apps 50MB constraint
- Base64 encoding increases file size by ~33%
- Browser memory constraints apply for multiple large files
- CSS changes in test harness require manual rebuild and restart

## Troubleshooting

**Files not appearing in collection:**
- Verify OnChange event contains the ParseJSON code
- Ensure control name matches your control instance

**ClearFiles not working:**
- Make sure you're incrementing the counter, not setting to the same value
- Check that the counter variable is properly initialized

**Large files rejected:**
- Increase `settingMaxFileSizeMB`
- Check file doesn't exceed Power Apps 50MB limit

**Control updates not appearing:**
- Update both control manifest version and solution version
- Clear browser cache or try incognito mode
- Consider deleting and reimporting control from solution

## Related Information

- [Power Apps Component Framework Overview](https://learn.microsoft.com/power-apps/developer/component-framework/overview)
- [Create your first component](https://learn.microsoft.com/power-apps/developer/component-framework/implementing-controls-using-typescript)
- [React controls & platform libraries](https://learn.microsoft.com/power-apps/developer/component-framework/react-controls-platform-libraries)

## License

This project is provided as-is for use in Power Platform projects.

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**
