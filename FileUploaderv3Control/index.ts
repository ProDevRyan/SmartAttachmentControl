import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { FileUploader, FileData } from "./FileUploaderv3";

export class SmartAttachmentControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private container!: HTMLDivElement;
    private notifyOutputChanged!: () => void;
    private files: FileData[] = [];
    private lastClearCounter: number = 0;

    constructor() {
        // Empty
    }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        this.container = container;
        this.notifyOutputChanged = notifyOutputChanged;
        
        // Parse existing files if any
        const filesValue = context.parameters.Files.raw;
        if (filesValue) {
            try {
                this.files = JSON.parse(filesValue);
            } catch (e) {
                this.files = [];
            }
        }
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        // Check if ClearFiles counter has changed (increment to trigger clear)
        const currentClearCounter = context.parameters.ClearFiles?.raw || 0;
        if (currentClearCounter !== this.lastClearCounter) {
            console.log(`ClearFiles counter changed: ${this.lastClearCounter} -> ${currentClearCounter}, clearing files`);
            this.lastClearCounter = currentClearCounter;
            this.files = [];
            this.notifyOutputChanged();
        }
        
        // Helper function to filter out "val" placeholder from test harness
        const getStringValue = (value: string | null | undefined): string | undefined => {
            if (!value || value === "val") return undefined;
            return value;
        };
        
        // Render the React component with custom properties
        ReactDOM.render(
            React.createElement(FileUploader, {
                files: this.files,
                onFilesChange: (newFiles: FileData[]) => {
                    this.files = newFiles;
                    this.notifyOutputChanged();
                },
                showDocumentation: context.parameters.ShowDocumentation?.raw === true,
                stylePrimaryColorHex: getStringValue(context.parameters.stylePrimaryColorHex?.raw),
                styleMainTextColor: getStringValue(context.parameters.styleMainTextColor?.raw),
                styleButtonTextColor: getStringValue(context.parameters.styleButtonTextColor?.raw),
                styleBackgroundColorHex: getStringValue(context.parameters.styleBackgroundColorHex?.raw),
                styleErrorColorHex: getStringValue(context.parameters.styleErrorColorHex?.raw),
                styleBorderRadius: context.parameters.styleBorderRadius?.raw !== undefined && context.parameters.styleBorderRadius?.raw !== null ? context.parameters.styleBorderRadius.raw : undefined,
                styleBoxShadowSize: context.parameters.styleBoxShadowSize?.raw !== undefined && context.parameters.styleBoxShadowSize?.raw !== null ? context.parameters.styleBoxShadowSize.raw : undefined,
                styleGap: context.parameters.styleGap?.raw !== undefined && context.parameters.styleGap?.raw !== null ? context.parameters.styleGap.raw : undefined,
                styleLayoutHorizontal: context.parameters.styleLayoutHorizontal?.raw !== false,
                styleFont: getStringValue(context.parameters.styleFont?.raw),
                svgDropZone: getStringValue(context.parameters.svgDropZone?.raw),
                svgEmptyFileList: getStringValue(context.parameters.svgEmptyFileList?.raw),
                svgTypeImage: getStringValue(context.parameters.svgTypeImage?.raw),
                svgTypeDoc: getStringValue(context.parameters.svgTypeDoc?.raw),
                svgTypeOther: getStringValue(context.parameters.svgTypeOther?.raw),
                svgDeleteIcon: getStringValue(context.parameters.svgDeleteIcon?.raw),
                settingMaxFileSizeMB: context.parameters.settingMaxFileSizeMB?.raw || undefined,
                settingMaxNumberOfFiles: context.parameters.settingMaxNumberOfFiles?.raw || undefined,
                settingAllowedFileTypes: getStringValue(context.parameters.settingAllowedFileTypes?.raw),
                textBrowseButtonText: getStringValue(context.parameters.textBrowseButtonText?.raw)
            }),
            this.container
        );
    }

    public getOutputs(): IOutputs {
        return {
            Files: JSON.stringify(this.files)
        };
    }

    public destroy(): void {
        ReactDOM.unmountComponentAtNode(this.container);
    }
}
