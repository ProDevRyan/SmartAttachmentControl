import * as React from 'react';
import * as EXIF from 'exif-js';

export interface FileMetadata {
    name: string;
    size: number;
    type: string;
    lastModified: string;
    exif?: {
        dateTaken?: string | null;
        camera?: string | null;
        gps?: {
            latitude: any;
            longitude: any;
        } | null;
        width?: number;
        height?: number;
        orientation?: number;
        iso?: number;
        focalLength?: any;
        exposureTime?: any;
        fNumber?: any;
    };
}

export interface FileData {
    name: string;
    size: number;
    type: string;
    base64: string;
}

// Documentation component
const DocumentationOverlay: React.FC<{ onClose?: () => void }> = () => {
    return (
        <div className="documentation-overlay">
            <div className="documentation-content">
                <div className="doc-section">
                    <h1>Smart Attachment Control - Developer Documentation</h1>
                    
                    <h2>Overview</h2>
                    <p>The Smart Attachment Control is a fully customizable Power Apps Component Framework (PCF) control that enables drag-and-drop file uploads with real-time preview and management. Files are converted to base64-encoded JSON strings that can be easily transformed into Power Apps collections for further processing, storage, or integration with SharePoint, Dataverse, or other data sources. The control provides extensive styling options, file type restrictions, size limits, and built-in validation to create a professional file upload experience.</p>
                </div>

                <div className="doc-section">
                    <h2>Quick Start</h2>
                    <ol>
                        <li>Add the control to your screen</li>
                        <li>Add this code to the control's <strong>OnChange</strong> event (replace <code>SmartAttachmentControl</code> with your control's name):</li>
                    </ol>
                    <p><strong>Note:</strong> The metadata example includes commonly-used EXIF fields. Customize the collection schema based on your needs.</p>
                    <pre><code>{'// Convert files to collection\n'}
{'ClearCollect(\n'}
{'    colAttachments,\n'}
{'    ForAll(\n'}
{'        ParseJSON(SmartAttachmentControl.Files),\n'}
{'        {\n'}
{'            name: Text(ThisRecord.name),\n'}
{'            size: Value(ThisRecord.size),\n'}
{'            type: Text(ThisRecord.type),\n'}
{'            base64: Text(ThisRecord.base64)\n'}
{'        }\n'}
{'    )\n'}
{');\n\n'}
{'// Convert metadata to collection (includes EXIF data for images)\n'}
{'ClearCollect(\n'}
{'    colFileMetadata,\n'}
{'    ForAll(\n'}
{'        ParseJSON(SmartAttachmentControl.FileMetadata),\n'}
{'        {\n'}
{'            name: Text(ThisRecord.name),\n'}
{'            size: Value(ThisRecord.size),\n'}
{'            type: Text(ThisRecord.type),\n'}
{'            lastModified: DateTimeValue(ThisRecord.lastModified),\n'}
{'            dateTaken: If(\n'}
{'                !IsBlank(ThisRecord.exif.dateTaken),\n'}
{'                DateTimeValue(ThisRecord.exif.dateTaken),\n'}
{'                Blank()\n'}
{'            ),\n'}
{'            camera: Text(ThisRecord.exif.camera),\n'}
{'            width: Value(ThisRecord.exif.width),\n'}
{'            height: Value(ThisRecord.exif.height),\n'}
{'            iso: Value(ThisRecord.exif.iso)\n'}
{'        }\n'}
{'    )\n'}
{')'}</code></pre>
                </div>

                <div className="doc-section">
                    <h2>Data Properties</h2>
                    
                    <div className="property-item">
                        <h3>Files (Output)</h3>
                        <p><strong>Type:</strong> Single Line Text</p>
                        <p><strong>Description:</strong> JSON string containing all uploaded files with base64 data</p>
                        <p><strong>Note:</strong> Use the OnChange event to convert this to a Power Apps collection</p>
                    </div>

                    <div className="property-item">
                        <h3>FileMetadata (Output)</h3>
                        <p><strong>Type:</strong> Single Line Text</p>
                        <p><strong>Description:</strong> JSON string containing file metadata including EXIF data for images</p>
                        <p><strong>Includes:</strong> Name, size, type, lastModified, and for images: dateTaken, camera, GPS, dimensions, ISO, focal length, exposure time, f-number</p>
                        <p><strong>Note:</strong> Use ParseJSON to convert this to a Power Apps collection. Review the JSON output to see which fields are populated for your specific files, then customize your collection schema accordingly.</p>
                    </div>

                    <div className="property-item">
                        <h3>ClearFiles (Input)</h3>
                        <p><strong>Type:</strong> Whole Number | <strong>Default:</strong> 0</p>
                        <p><strong>Usage:</strong> Increment this counter to clear all uploaded files</p>
                        <p><strong>Example:</strong> <code>ClearFiles = varClearCounter</code></p>
                        <p><strong>How it works:</strong> When the number changes, the control detects the change and clears all files</p>
                    </div>

                    <div className="property-item">
                        <h3>ShowDocumentation (Input)</h3>
                        <p><strong>Type:</strong> Boolean | <strong>Default:</strong> false</p>
                        <p><strong>Usage:</strong> Set to true to display this documentation overlay</p>
                    </div>
                </div>

                <div className="doc-section">
                    <h2>Style Properties - Colors</h2>
                    <div className="property-grid">
                        <div className="property-item">
                            <h4>stylePrimaryColorHex</h4>
                            <p>Default: #3860B2</p>
                            <p>Primary color for buttons, borders, and accents</p>
                        </div>
                        <div className="property-item">
                            <h4>styleMainTextColor</h4>
                            <p>Default: #000000</p>
                            <p>Color for primary text</p>
                        </div>
                        <div className="property-item">
                            <h4>styleButtonTextColor</h4>
                            <p>Default: #FFFFFF</p>
                            <p>Text color on buttons</p>
                        </div>
                        <div className="property-item">
                            <h4>styleBackgroundColorHex</h4>
                            <p>Default: #e1dfdd</p>
                            <p>Background color for drop zone and header</p>
                        </div>
                        <div className="property-item">
                            <h4>styleErrorColorHex</h4>
                            <p>Default: #d13438</p>
                            <p>Color for error messages and delete icon</p>
                        </div>
                    </div>
                </div>

                <div className="doc-section">
                    <h2>Style Properties - Layout</h2>
                    <div className="property-grid">
                        <div className="property-item">
                            <h4>styleBorderRadius</h4>
                            <p>Default: 5 | Range: 0-50</p>
                            <p>Border radius in pixels</p>
                        </div>
                        <div className="property-item">
                            <h4>styleBoxShadowSize</h4>
                            <p>Default: 3 | Range: 0-20</p>
                            <p>Box shadow offset (0 = no shadow)</p>
                        </div>
                        <div className="property-item">
                            <h4>styleGap</h4>
                            <p>Default: 20 | Range: 0-100</p>
                            <p>Space between drop zone and file list</p>
                        </div>
                        <div className="property-item">
                            <h4>styleLayoutHorizontal</h4>
                            <p>Default: true</p>
                            <p>true = side-by-side | false = vertical stack</p>
                        </div>
                        <div className="property-item">
                            <h4>styleFont</h4>
                            <p>Default: Open Sans</p>
                            <p>Font family for all text</p>
                        </div>
                    </div>
                </div>

                <div className="doc-section">
                    <h2>Icon Properties (SVG)</h2>
                    <p>All icon properties accept SVG markup. Leave blank to use defaults from Fluent 2 icon library.</p>
                    <div className="property-grid">
                        <div className="property-item">
                            <h4>svgDropZone</h4>
                            <p>Icon in drop zone (50x50px)</p>
                        </div>
                        <div className="property-item">
                            <h4>svgEmptyFileList</h4>
                            <p>Icon when no files uploaded (50x50px)</p>
                        </div>
                        <div className="property-item">
                            <h4>svgTypeImage</h4>
                            <p>Icon for image files (24x24px)</p>
                        </div>
                        <div className="property-item">
                            <h4>svgTypeDoc</h4>
                            <p>Icon for document files (24x24px)</p>
                        </div>
                        <div className="property-item">
                            <h4>svgTypeOther</h4>
                            <p>Icon for other file types (24x24px)</p>
                        </div>
                        <div className="property-item">
                            <h4>svgDeleteIcon</h4>
                            <p>Delete button icon (20x20px)</p>
                        </div>
                    </div>
                </div>

                <div className="doc-section">
                    <h2>File Settings</h2>
                    <div className="property-item">
                        <h3>settingMaxFileSizeMB</h3>
                        <p><strong>Default:</strong> 10 | <strong>Range:</strong> 1-100</p>
                        <p>Maximum file size in megabytes. Files exceeding this will be rejected.</p>
                    </div>
                    <div className="property-item">
                        <h3>settingMaxNumberOfFiles</h3>
                        <p><strong>Default:</strong> 5 | <strong>Range:</strong> 1-50</p>
                        <p>Maximum number of files allowed. Additional files beyond this limit will be rejected.</p>
                    </div>
                    <div className="property-item">
                        <h3>settingAllowedFileTypes</h3>
                        <p><strong>Default:</strong> (empty - all types allowed)</p>
                        <p><strong>Format:</strong> Comma-separated extensions without dots (e.g., "pdf,jpg,png,docx")</p>
                        <p>Leave blank to allow all file types.</p>
                    </div>
                    <div className="property-item">
                        <h3>textBrowseButtonText</h3>
                        <p><strong>Default:</strong> Select files</p>
                        <p>Text displayed on the browse button</p>
                    </div>
                </div>

                <div className="doc-section">
                    <h2>Working with File Data</h2>
                    <h3>Converting JSON to Collections</h3>
                    <p>Place this code in the control's <strong>OnChange</strong> event:</p>
                    <p><strong>Important:</strong> The metadata collection example below shows a <em>sample</em> of commonly-used EXIF fields. Review the JSON output in <code>FileMetadata</code> to see all available fields for your files, then adjust the collection schema to include only the fields you need.</p>
                    <pre><code>{'// Convert files to collection\n'}
{'ClearCollect(\n'}
{'    colAttachments,\n'}
{'    ForAll(\n'}
{'        ParseJSON(SmartAttachmentControl.Files),\n'}
{'        {\n'}
{'            name: Text(ThisRecord.name),\n'}
{'            size: Value(ThisRecord.size),\n'}
{'            type: Text(ThisRecord.type),\n'}
{'            base64: Text(ThisRecord.base64)\n'}
{'        }\n'}
{'    )\n'}
{');\n\n'}
{'// Convert metadata to collection (SAMPLE - customize for your needs)\n'}
{'// For images: includes EXIF data like dateTaken, camera, dimensions, etc.\n'}
{'// For non-images: only basic metadata (name, size, type, lastModified)\n'}
{'ClearCollect(\n'}
{'    colFileMetadata,\n'}
{'    ForAll(\n'}
{'        ParseJSON(SmartAttachmentControl.FileMetadata),\n'}
{'        {\n'}
{'            name: Text(ThisRecord.name),\n'}
{'            size: Value(ThisRecord.size),\n'}
{'            type: Text(ThisRecord.type),\n'}
{'            lastModified: DateTimeValue(ThisRecord.lastModified),\n'}
{'            // EXIF fields (images only) - customize based on your needs:\n'}
{'            dateTaken: If(\n'}
{'                !IsBlank(ThisRecord.exif.dateTaken),\n'}
{'                DateTimeValue(ThisRecord.exif.dateTaken),\n'}
{'                Blank()\n'}
{'            ),\n'}
{'            camera: Text(ThisRecord.exif.camera),\n'}
{'            width: Value(ThisRecord.exif.width),\n'}
{'            height: Value(ThisRecord.exif.height),\n'}
{'            iso: Value(ThisRecord.exif.iso)\n'}
{'            // Additional available EXIF fields: orientation, focalLength,\n'}
{'            // exposureTime, fNumber, gps.latitude, gps.longitude\n'}
{'        }\n'}
{'    )\n'}
{')'}</code></pre>
                    
                    <h3>Collection Schema</h3>
                    <p>After conversion, <code>colAttachments</code> contains:</p>
                    <ul>
                        <li><strong>name</strong> (Text): Original filename</li>
                        <li><strong>size</strong> (Number): File size in bytes</li>
                        <li><strong>type</strong> (Text): MIME type (e.g., "application/pdf")</li>
                        <li><strong>base64</strong> (Text): Base64-encoded file data with data URI prefix</li>
                    </ul>
                    
                    <p>And <code>colFileMetadata</code> contains (based on the sample schema above - customize as needed):</p>
                    <ul>
                        <li><strong>name</strong> (Text): Original filename</li>
                        <li><strong>size</strong> (Number): File size in bytes</li>
                        <li><strong>type</strong> (Text): MIME type</li>
                        <li><strong>lastModified</strong> (DateTime): File last modified date</li>
                        <li><strong>dateTaken</strong> (DateTime): Date photo was taken (images only, if available in EXIF)</li>
                        <li><strong>camera</strong> (Text): Camera make and model (images only, if available in EXIF)</li>
                        <li><strong>width</strong> (Number): Image width in pixels (images only)</li>
                        <li><strong>height</strong> (Number): Image height in pixels (images only)</li>
                        <li><strong>iso</strong> (Number): ISO speed rating (images only, if available in EXIF)</li>
                    </ul>
                    <p><strong>Note:</strong> The example above shows commonly-used fields. Additional EXIF data available includes: <code>orientation</code>, <code>focalLength</code>, <code>exposureTime</code>, <code>fNumber</code>, and GPS coordinates (<code>gps.latitude</code>, <code>gps.longitude</code>). Inspect the JSON in <code>FileMetadata</code> to see what's available for your specific files.</p>

                    <h3>Using Metadata in Your App</h3>
                    <pre><code>{'// Get date a photo was taken\n'}
{'LookUp(\n'}
{'    colFileMetadata,\n'}
{'    name = "vacation.jpg"\n'}
{').dateTaken\n\n'}
{'// Filter photos by date taken\n'}
{'Filter(\n'}
{'    colFileMetadata,\n'}
{'    DateValue(dateTaken) = DateValue("2024-07-04")\n'}
{')\n\n'}
{'// Display camera info\n'}
{'LookUp(\n'}
{'    colFileMetadata,\n'}
{'    name = "photo.jpg"\n'}
{').camera'}</code></pre>

                    <h3>Clearing Files Programmatically</h3>
                    <pre><code>{'// Initialize counter variable (in App.OnStart or Screen.OnVisible)\n'}
{'UpdateContext({\n'}
{'    varClearCounter: 0\n'}
{'});\n\n'}
{'// When you want to clear files, increment the counter\n'}
{'UpdateContext({\n'}
{'    varClearCounter: varClearCounter + 1\n'}
{'});'}</code></pre>
                    <p><strong>Note:</strong> Each time the counter changes, files are cleared. This avoids timing issues with boolean toggles.</p>
                </div>

                <div className="doc-section">
                    <h2>Common Customization Scenarios</h2>
                    
                    <h3>Compact Layout</h3>
                    <pre><code>styleGap: 10
styleBorderRadius: 2
styleBoxShadowSize: 1</code></pre>

                    <h3>Restrict to PDFs Only</h3>
                    <pre><code>settingAllowedFileTypes: "pdf"
settingMaxFileSizeMB: 25</code></pre>

                    <h3>Photo Upload</h3>
                    <pre><code>settingAllowedFileTypes: "jpg,jpeg,png,heic"
settingMaxFileSizeMB: 5
settingMaxNumberOfFiles: 10</code></pre>
                </div>

                <div className="doc-section">
                    <h2>Troubleshooting</h2>
                    <ul>
                        <li><strong>Files not appearing in collection:</strong> Verify OnChange event contains the ParseJSON code. Ensure control name matches your control instance.</li>
                        <li><strong>ClearFiles not working:</strong> Make sure you're incrementing the counter variable, not just setting it to the same value repeatedly.</li>
                        <li><strong>Large files rejected:</strong> Increase settingMaxFileSizeMB. Check file doesn't exceed Power Apps 50MB limit.</li>
                        <li><strong>Layout looks wrong:</strong> Try toggling styleLayoutHorizontal. Adjust Component Container Width/Height.</li>
                    </ul>
                </div>

                <div className="doc-section">
                    <h2>Best Practices</h2>
                    <ol>
                        <li>Always add the OnChange code to convert files to a usable collection</li>
                        <li>Use a numeric counter variable for ClearFiles - increment it each time you want to clear</li>
                        <li>Use allowed file types to prevent unwanted uploads</li>
                        <li>Keep max file size reasonable (under 25MB recommended)</li>
                        <li>Test with various file types before deploying</li>
                        <li>Consider mobile users - use vertical layout for narrow screens</li>
                        <li>Provide clear error messaging in your app for upload failures</li>
                    </ol>
                </div>

                <div className="doc-footer">
                    <p><strong>Control Version:</strong> 1.0.7</p>
                    <p><strong>Namespace:</strong> PA911CustomControls.SmartAttachmentControl</p>
                    <p><strong>New in v1.0.7:</strong> FileMetadata output with EXIF data extraction for images</p>
                </div>
            </div>
        </div>
    );
};

export interface FileUploaderProps {
    files: FileData[];
    onFilesChange: (files: FileData[]) => void;
    onMetadataChange?: (metadata: FileMetadata[]) => void;
    clearFilesTriggered?: boolean;
    showDocumentation?: boolean;
    stylePrimaryColorHex?: string;
    styleMainTextColor?: string;
    styleButtonTextColor?: string;
    styleBackgroundColorHex?: string;
    styleErrorColorHex?: string;
    styleBorderRadius?: number;
    styleBoxShadowSize?: number;
    styleGap?: number;
    styleLayoutHorizontal?: boolean;
    styleFont?: string;
    svgDropZone?: string;
    svgEmptyFileList?: string;
    svgTypeImage?: string;
    svgTypeDoc?: string;
    svgTypeOther?: string;
    svgDeleteIcon?: string;
    settingMaxFileSizeMB?: number;
    settingMaxNumberOfFiles?: number;
    settingAllowedFileTypes?: string;
    textBrowseButtonText?: string;
}

// Memoized FileItem component to prevent unnecessary re-renders
interface FileItemProps {
    file: FileData;
    index: number;
    onRemove: (index: number) => void;
    borderRadius: number;
    mainTextColor: string;
    errorColor: string;
    deleteIcon: string;
    backgroundColor: string;
    getFileIcon: (fileName: string) => string;
    formatFileSize: (bytes: number) => string;
}

const FileItem = React.memo<FileItemProps>(({ file, index, onRemove, borderRadius, mainTextColor, errorColor, deleteIcon, getFileIcon, formatFileSize, backgroundColor }) => {
    const handleRemove = React.useCallback(() => {
        onRemove(index);
    }, [index, onRemove]);

    return (
        <div className="file-item" style={{ borderRadius: `${borderRadius}px`, backgroundColor: backgroundColor }}>
            <div className="file-icon" dangerouslySetInnerHTML={{ __html: getFileIcon(file.name) }} style={{ width: '24px', height: '24px' }} />
            <div className="file-info">
                <div className="file-name" style={{ color: mainTextColor }}>{file.name}</div>
                <div className="file-size">{formatFileSize(file.size)}</div>
            </div>
            <button 
                className="remove-button"
                style={{ borderRadius: `${borderRadius}px` }}
                onClick={handleRemove}
                title="Remove file"
            >
                <div className="remove-icon" dangerouslySetInnerHTML={{ __html: deleteIcon }} style={{ width: '20px', height: '20px' }} />
            </button>
        </div>
    );
}, (prevProps, nextProps) => {
    // Custom comparison to prevent re-renders when unrelated files change
    return prevProps.file.name === nextProps.file.name &&
           prevProps.file.size === nextProps.file.size &&
           prevProps.borderRadius === nextProps.borderRadius &&
           prevProps.mainTextColor === nextProps.mainTextColor &&
           prevProps.errorColor === nextProps.errorColor &&
           prevProps.deleteIcon === nextProps.deleteIcon &&
           prevProps.backgroundColor === nextProps.backgroundColor;
});

export class FileUploader extends React.PureComponent<FileUploaderProps, { errorMessage: string }> {
    private fileInputRef: React.RefObject<HTMLInputElement>;
    // Pre-compute and cache these values
    private cachedHoverColor: string = '';
    private cachedButtonHoverColor: string = '';
    private cachedPrimaryColor: string = '';
    private cachedBackgroundColor: string = '';

    constructor(props: FileUploaderProps) {
        super(props);
        this.fileInputRef = React.createRef();
        this.state = {
            errorMessage: ''
        };
        
        // Bind methods once in constructor
        this.handleFileSelect = this.handleFileSelect.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleDragLeave = this.handleDragLeave.bind(this);
        this.handleBrowseClick = this.handleBrowseClick.bind(this);
        this.handleRemoveFile = this.handleRemoveFile.bind(this);
        this.getFileIcon = this.getFileIcon.bind(this);
        this.formatFileSize = this.formatFileSize.bind(this);
    }

    componentDidUpdate(prevProps: FileUploaderProps) {
        // Clear error message when ClearFiles is triggered
        if (this.props.clearFilesTriggered && !prevProps.clearFilesTriggered && this.state.errorMessage) {
            this.setState({ errorMessage: '' });
        }
    }

    private handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            this.processFiles(Array.from(files));
        }
        // Reset input so same file can be selected again
        event.target.value = '';
    };

    private handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        const dropZone = event.currentTarget;
        dropZone.classList.remove('drag-over');

        const files = event.dataTransfer.files;
        if (files && files.length > 0) {
            this.processFiles(Array.from(files));
        }
    };

    private validateFiles = (files: File[]): { valid: File[], error: string } => {
        const maxSize = (this.props.settingMaxFileSizeMB || 10) * 1024 * 1024;
        const maxCount = this.props.settingMaxNumberOfFiles || 5;
        // Normalize allowed types: remove leading dots and convert to lowercase
        const allowedTypes = this.props.settingAllowedFileTypes?.split(',').map(t => t.trim().toLowerCase().replace(/^\./, '')) || [];
        
        const valid: File[] = [];
        const errors: string[] = [];
        const remainingSlots = maxCount - this.props.files.length;
        let reachedMaxCount = false;

        for (const file of files) {
            // Check if we've reached the max count
            if (valid.length >= remainingSlots) {
                if (!reachedMaxCount) {
                    errors.push(`Maximum ${maxCount} file${maxCount !== 1 ? 's' : ''} allowed. ${valid.length} file${valid.length !== 1 ? 's' : ''} will be added.`);
                    reachedMaxCount = true;
                }
                continue;
            }

            // Check file type first (priority over size) if restrictions are in place
            if (allowedTypes.length > 0) {
                const ext = file.name.split('.').pop()?.toLowerCase() || '';
                if (!allowedTypes.includes(ext)) {
                    const allowedDisplay = allowedTypes.map(t => t.toUpperCase()).join(', ');
                    const typeError = `File type "${ext.toUpperCase()}" is not allowed. Allowed types: ${allowedDisplay}`;
                    if (!errors.includes(typeError)) {
                        errors.push(typeError);
                    }
                    continue;
                }
            }

            // Check file size
            if (file.size > maxSize) {
                // Skip this file but continue checking others
                const sizeError = `File "${file.name}" exceeds the maximum size of ${this.props.settingMaxFileSizeMB || 10} MB and was not added.`;
                if (!errors.includes(sizeError)) {
                    errors.push(sizeError);
                }
                continue;
            }

            valid.push(file);
        }

        return { valid, error: errors.join(' ') };
    };

    private handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        const dropZone = event.currentTarget;
        dropZone.classList.add('drag-over');
    };

    private handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        const dropZone = event.currentTarget;
        dropZone.classList.remove('drag-over');
    };

    private extractMetadata = async (file: File): Promise<FileMetadata> => {
        return new Promise((resolve) => {
            const metadata: FileMetadata = {
                name: file.name,
                size: file.size,
                type: file.type,
                lastModified: new Date(file.lastModified).toISOString()
            };

            // Extract EXIF data for images
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = new Image();
                    img.onload = () => {
                        EXIF.getData(img as any, function(this: any) {
                            const exifData = EXIF.getAllTags(this);
                            metadata.exif = {
                                dateTaken: exifData.DateTime || exifData.DateTimeOriginal || null,
                                camera: exifData.Make && exifData.Model ? `${exifData.Make} ${exifData.Model}` : null,
                                gps: exifData.GPSLatitude && exifData.GPSLongitude ? {
                                    latitude: exifData.GPSLatitude,
                                    longitude: exifData.GPSLongitude
                                } : null,
                                width: exifData.PixelXDimension || img.width,
                                height: exifData.PixelYDimension || img.height,
                                orientation: exifData.Orientation,
                                iso: exifData.ISOSpeedRatings,
                                focalLength: exifData.FocalLength,
                                exposureTime: exifData.ExposureTime,
                                fNumber: exifData.FNumber
                            };
                            resolve(metadata);
                        });
                    };
                    img.src = e.target?.result as string;
                };
                reader.readAsDataURL(file);
            } else {
                resolve(metadata);
            }
        });
    };

    private processFiles = (files: File[]) => {
        // Clear any existing error when user attempts to add files
        this.setState({ errorMessage: '' });

        const { valid, error } = this.validateFiles(files);
        
        // If there are valid files, process them
        if (valid.length > 0) {
            const filePromises = valid.map(file => {
                return new Promise<FileData>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        const base64 = reader.result as string;
                        resolve({
                            name: file.name,
                            size: file.size,
                            type: file.type,
                            base64: base64
                        });
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            });

            // Extract metadata for all files
            const metadataPromises = valid.map(file => this.extractMetadata(file));

            Promise.all([Promise.all(filePromises), Promise.all(metadataPromises)]).then(([newFiles, newMetadata]) => {
                const updatedFiles = [...this.props.files, ...newFiles];
                this.props.onFilesChange(updatedFiles);
                
                // Notify about metadata if callback is provided
                if (this.props.onMetadataChange) {
                    // Combine existing metadata with new metadata
                    // Since we can't retrieve old metadata, we'll create placeholder entries for existing files
                    const existingMetadata: FileMetadata[] = this.props.files.map(f => ({
                        name: f.name,
                        size: f.size,
                        type: f.type,
                        lastModified: new Date().toISOString()
                    }));
                    const allMetadata = [...existingMetadata, ...newMetadata];
                    this.props.onMetadataChange(allMetadata);
                }
                
                // Show error after adding valid files
                if (error) {
                    this.setState({ errorMessage: error });
                }
            });
        } else if (error) {
            // No valid files but there's an error
            this.setState({ errorMessage: error });
        }
    };

    private handleBrowseClick = () => {
        this.fileInputRef.current?.click();
    };

    private handleRemoveFile = (index: number) => {
        const updatedFiles = this.props.files.filter((_, i) => i !== index);
        this.props.onFilesChange(updatedFiles);
        
        // Notify about metadata change if callback is provided
        if (this.props.onMetadataChange && updatedFiles.length === 0) {
            this.props.onMetadataChange([]);
        }
        
        // Clear error when file is removed (might resolve the issue)
        if (this.state.errorMessage) {
            this.setState({ errorMessage: '' });
        }
    };

    private getMaxFileSizeDisplay = (): string => {
        const maxSizeMB = this.props.settingMaxFileSizeMB || 10;
        return `Maximum file size: ${maxSizeMB} MB`;
    };

    private getAllowedTypesDisplay = (): string => {
        const allowed = this.props.settingAllowedFileTypes;
        if (!allowed) return '';
        
        const typeArray = allowed.split(',').map(t => t.trim().replace(/^\./, '').toUpperCase());
        const types = typeArray.join(', ');
        const label = typeArray.length === 1 ? 'Allowed file type' : 'Allowed file types';
        
        return `${label}: ${types}`;
    };

    private formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    private darkenColor = (hex: string, percent: number): string => {
        const num = parseInt(hex.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) - amt;
        const G = (num >> 8 & 0x00FF) - amt;
        const B = (num & 0x0000FF) - amt;
        return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255))
            .toString(16).slice(1).toUpperCase();
    };

    private getFileIcon = (fileName: string): string => {
        const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp', 'ico', 'heic', 'tif', 'tiff'];
        const docExts = ['pdf', 'txt', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'csv', 'rtf'];
        
        const ext = fileName.split('.').pop()?.toLowerCase() || '';
        
        if (imageExts.includes(ext)) {
            return this.props.svgTypeImage || this.getDefaultImageSvg();
        } else if (docExts.includes(ext)) {
            return this.props.svgTypeDoc || this.getDefaultDocSvg();
        } else {
            return this.props.svgTypeOther || this.getDefaultOtherSvg();
        }
    };

    private getDefaultImageSvg = (): string => {
        return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.75 3C19.5449 3 21 4.45507 21 6.25V17.75C21 19.5449 19.5449 21 17.75 21H6.25C4.45507 21 3 19.5449 3 17.75V6.25C3 4.45507 4.45507 3 6.25 3H17.75ZM18.3305 19.4014L12.5247 13.7148C12.2596 13.4553 11.8501 13.4316 11.5588 13.644L11.4752 13.7148L5.66845 19.4011C5.8504 19.4651 6.04613 19.5 6.25 19.5H17.75C17.9535 19.5 18.1489 19.4653 18.3305 19.4014L12.5247 13.7148L18.3305 19.4014ZM17.75 4.5H6.25C5.2835 4.5 4.5 5.2835 4.5 6.25V17.75C4.5 17.9584 4.53643 18.1583 4.60326 18.3437L10.4258 12.643C11.2589 11.8273 12.5675 11.7885 13.4458 12.5266L13.5742 12.6431L19.3964 18.3447C19.4634 18.159 19.5 17.9588 19.5 17.75V6.25C19.5 5.2835 18.7165 4.5 17.75 4.5ZM15.2521 6.5C16.4959 6.5 17.5042 7.50831 17.5042 8.75212C17.5042 9.99592 16.4959 11.0042 15.2521 11.0042C14.0083 11.0042 13 9.99592 13 8.75212C13 7.50831 14.0083 6.5 15.2521 6.5ZM15.2521 8C14.8367 8 14.5 8.33673 14.5 8.75212C14.5 9.1675 14.8367 9.50423 15.2521 9.50423C15.6675 9.50423 16.0042 9.1675 16.0042 8.75212C16.0042 8.33673 15.6675 8 15.2521 8Z" fill="#242424"/></svg>';
    };

    private getDefaultDocSvg = (): string => {
        return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.75 11.5C8.33579 11.5 8 11.8358 8 12.25C8 12.6642 8.33579 13 8.75 13H15.25C15.6642 13 16 12.6642 16 12.25C16 11.8358 15.6642 11.5 15.25 11.5H8.75ZM8.75 14.25C8.33579 14.25 8 14.5858 8 15C8 15.4142 8.33579 15.75 8.75 15.75H15.25C15.6642 15.75 16 15.4142 16 15C16 14.5858 15.6642 14.25 15.25 14.25H8.75ZM8.75 17C8.33579 17 8 17.3358 8 17.75C8 18.1642 8.33579 18.5 8.75 18.5H15.25C15.6642 18.5 16 18.1642 16 17.75C16 17.3358 15.6642 17 15.25 17H8.75ZM13.585 2.586L19.414 8.414C19.789 8.789 20 9.298 20 9.828V20C20 21.104 19.104 22 18 22H6C4.896 22 4 21.104 4 20V4C4 2.896 4.896 2 6 2H12.172C12.1999 2 12.2271 2.00371 12.2542 2.00741C12.2738 2.01008 12.2933 2.01274 12.313 2.014C12.528 2.029 12.74 2.07 12.937 2.152C12.9944 2.17648 13.0488 2.20797 13.103 2.23933C13.1197 2.24897 13.1363 2.25859 13.153 2.268C13.1685 2.27647 13.1845 2.28426 13.2005 2.29207C13.2281 2.30548 13.2557 2.31894 13.281 2.336C13.359 2.389 13.429 2.452 13.5 2.516C13.5115 2.5262 13.5238 2.53567 13.5363 2.5452C13.5531 2.55808 13.57 2.57105 13.585 2.586ZM18 20.5C18.276 20.5 18.5 20.275 18.5 20V10H14C12.896 10 12 9.104 12 8V3.5H6C5.724 3.5 5.5 3.725 5.5 4V20C5.5 20.275 5.724 20.5 6 20.5H18ZM17.378 8.5L13.5 4.621V8C13.5 8.275 13.724 8.5 14 8.5H17.378Z" fill="#242424"/></svg>';
    };

    private getDefaultOtherSvg = (): string => {
        return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 2C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V9.82777C20 9.29733 19.7893 8.78863 19.4142 8.41355L13.5864 2.58579C13.2114 2.21071 12.7027 2 12.1722 2H6ZM5.5 4C5.5 3.72386 5.72386 3.5 6 3.5H12V8C12 9.10457 12.8954 10 14 10H18.5V20C18.5 20.2761 18.2761 20.5 18 20.5H6C5.72386 20.5 5.5 20.2761 5.5 20V4ZM17.3793 8.5H14C13.7239 8.5 13.5 8.27614 13.5 8V4.62066L17.3793 8.5Z" fill="#242424"/></svg>';
    };

    private getDefaultDeleteSvg = (errorColor: string): string => {
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 5H14C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5ZM8.5 5C8.5 3.067 10.067 1.5 12 1.5C13.933 1.5 15.5 3.067 15.5 5H21.25C21.6642 5 22 5.33579 22 5.75C22 6.16421 21.6642 6.5 21.25 6.5H19.9309L18.7589 18.6112C18.5729 20.5334 16.9575 22 15.0263 22H8.97369C7.04254 22 5.42715 20.5334 5.24113 18.6112L4.06908 6.5H2.75C2.33579 6.5 2 6.16421 2 5.75C2 5.33579 2.33579 5 2.75 5H8.5ZM10.5 9.75C10.5 9.33579 10.1642 9 9.75 9C9.33579 9 9 9.33579 9 9.75V17.25C9 17.6642 9.33579 18 9.75 18C10.1642 18 10.5 17.6642 10.5 17.25V9.75ZM14.25 9C14.6642 9 15 9.33579 15 9.75V17.25C15 17.6642 14.6642 18 14.25 18C13.8358 18 13.5 17.6642 13.5 17.25V9.75C13.5 9.33579 13.8358 9 14.25 9ZM6.73416 18.4667C6.84577 19.62 7.815 20.5 8.97369 20.5H15.0263C16.185 20.5 17.1542 19.62 17.2658 18.4667L18.4239 6.5H5.57608L6.73416 18.4667Z" fill="${errorColor}"/></svg>`;
    };

    render() {
        const primaryColor = this.props.stylePrimaryColorHex || '#3860B2';
        const mainTextColor = this.props.styleMainTextColor || '#000000';
        const buttonTextColor = this.props.styleButtonTextColor || '#FFFFFF';
        const backgroundColor = this.props.styleBackgroundColorHex || '#e1dfdd';
        const errorColor = this.props.styleErrorColorHex || '#d13438';
        const borderRadius = (this.props.styleBorderRadius !== undefined && this.props.styleBorderRadius !== null) ? this.props.styleBorderRadius : 5;
        const boxShadowSize = (this.props.styleBoxShadowSize !== undefined && this.props.styleBoxShadowSize !== null) ? this.props.styleBoxShadowSize : 5;
        const gap = (this.props.styleGap !== undefined && this.props.styleGap !== null) ? this.props.styleGap : 20;
        const isHorizontal = this.props.styleLayoutHorizontal !== false;
        const buttonText = this.props.textBrowseButtonText || 'Select files';
        const fontFamily = this.props.styleFont || 'Open Sans';
        
        // Cache hover colors only when colors change
        if (this.cachedPrimaryColor !== primaryColor || this.cachedBackgroundColor !== backgroundColor) {
            this.cachedPrimaryColor = primaryColor;
            this.cachedBackgroundColor = backgroundColor;
            this.cachedHoverColor = this.darkenColor(backgroundColor, 5);
            this.cachedButtonHoverColor = this.darkenColor(primaryColor, 10);
        }
        
        const boxShadow = boxShadowSize > 0 ? `${boxShadowSize}px ${boxShadowSize}px 10px 0px rgba(0, 0, 0, 0.25)` : 'none';

        
        const dropZoneSvg = this.props.svgDropZone || '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 8.25C10.5 7.2835 11.2835 6.5 12.25 6.5H24V15.25C24 17.3211 25.6789 19 27.75 19H37.5V39.75C37.5 40.7165 36.7165 41.5 35.75 41.5H24.2608C23.7353 42.4086 23.1029 43.2476 22.3809 44H35.75C38.0972 44 40 42.0972 40 39.75V18.4142C40 17.8175 39.7629 17.2452 39.341 16.8232L27.1768 4.65901C26.7548 4.23705 26.1825 4 25.5858 4H12.25C9.90279 4 8 5.90279 8 8.25V22.9963C8.79632 22.6642 9.63275 22.4091 10.5 22.2402V8.25ZM35.4822 16.5H27.75C27.0596 16.5 26.5 15.9404 26.5 15.25V7.51777L35.4822 16.5ZM24 35C24 41.0751 19.0751 46 13 46C6.92487 46 2 41.0751 2 35C2 28.9249 6.92487 24 13 24C19.0751 24 24 28.9249 24 35ZM14 28C14 27.4477 13.5523 27 13 27C12.4477 27 12 27.4477 12 28V34H6C5.44771 34 5 34.4477 5 35C5 35.5523 5.44771 36 6 36H12V42C12 42.5523 12.4477 43 13 43C13.5523 43 14 42.5523 14 42V36H20C20.5523 36 21 35.5523 21 35C21 34.4477 20.5523 34 20 34H14V28Z" fill="#242424"/></svg>';
        const emptyListSvg = this.props.svgEmptyFileList || '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.25 6C8.79822 6 6 8.79822 6 12.25V35.75C6 39.2018 8.79822 42 12.25 42H35.75C39.2018 42 42 39.2018 42 35.75V12.25C42 8.79822 39.2018 6 35.75 6H12.25ZM39.5 24H29.75C29.0596 24 28.5 24.5596 28.5 25.25V26.5C28.5 28.9853 26.4853 31 24 31C21.5147 31 19.5 28.9853 19.5 26.5V25.25C19.5 24.5596 18.9404 24 18.25 24H8.5V12.25C8.5 10.1789 10.1789 8.5 12.25 8.5H35.75C37.8211 8.5 39.5 10.1789 39.5 12.25V24ZM8.5 26.5H17C17 30.366 20.134 33.5 24 33.5C27.866 33.5 31 30.366 31 26.5H39.5V35.75C39.5 37.8211 37.8211 39.5 35.75 39.5H12.25C10.1789 39.5 8.5 37.8211 8.5 35.75V26.5Z" fill="#242424"/></svg>';
        const deleteIconSvg = this.props.svgDeleteIcon || this.getDefaultDeleteSvg(errorColor);
        
        
        const maxFileSizeText = this.getMaxFileSizeDisplay();
        const allowedTypesText = this.getAllowedTypesDisplay();
        const containerPadding = boxShadowSize > 0 ? boxShadowSize + 2 : 0;

        // Show documentation overlay if requested
        if (this.props.showDocumentation) {
            return <DocumentationOverlay />;
        }

        return (
            <div className={`file-uploader-container ${!isHorizontal ? 'vertical' : ''}`} style={{ fontFamily: fontFamily, padding: `${containerPadding}px`, gap: `${gap}px` }}>
                <div 
                    className="drop-zone"
                    style={{
                        borderColor: primaryColor,
                        backgroundColor: backgroundColor,
                        borderRadius: `${borderRadius}px`,
                        boxShadow: boxShadow
                    }}
                    onDrop={this.handleDrop}
                    onDragOver={this.handleDragOver}
                    onDragLeave={this.handleDragLeave}
                    onClick={this.handleBrowseClick}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = this.cachedHoverColor}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = backgroundColor}
                >
                    <div className="drop-zone-icon" dangerouslySetInnerHTML={{ __html: dropZoneSvg }} style={{ width: '50px', height: '50px' }} />
                    <div className="drop-zone-text" style={{ color: mainTextColor }}>Drag and drop files here</div>
                    <div className="drop-zone-subtext" style={{ color: mainTextColor }}>or</div>
                    <button 
                        className="browse-button"
                        style={{
                            backgroundColor: primaryColor,
                            color: buttonTextColor,
                            borderRadius: `${borderRadius}px`
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = this.cachedButtonHoverColor}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = primaryColor}
                        onClick={(e) => {
                            e.stopPropagation();
                            this.handleBrowseClick();
                        }}
                    >
                        {buttonText}
                    </button>
                    <div className="allowed-types-text" style={{ color: mainTextColor }}>
                        {maxFileSizeText}
                    </div>
                    {allowedTypesText && (
                        <div className="allowed-types-text" style={{ color: mainTextColor }}>
                            {allowedTypesText}
                        </div>
                    )}
                    {this.state.errorMessage && (
                        <div className="error-message" style={{ color: errorColor, borderColor: errorColor }}>
                            {this.state.errorMessage}
                        </div>
                    )}
                    <input
                        ref={this.fileInputRef}
                        type="file"
                        multiple
                        style={{ display: 'none' }}
                        onChange={this.handleFileSelect}
                    />
                </div>

                <div className="file-list" style={{ borderRadius: `${borderRadius}px`, boxShadow: boxShadow }}>
                    <div className="file-list-header" style={{ backgroundColor: backgroundColor, color: mainTextColor }}>
                        Selected Files ({this.props.files.length})
                    </div>
                    <div className="file-list-content" style={{ overflowY: this.props.files.length === 0 ? 'hidden' : 'auto' }}>
                        {this.props.files.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-state-icon" dangerouslySetInnerHTML={{ __html: emptyListSvg }} style={{ width: '50px', height: '50px' }} />
                                <div className="empty-state-text" style={{ color: mainTextColor }}>No files added yet</div>
                            </div>
                        ) : (
                            this.props.files.map((file, index) => (
                                <FileItem
                                    key={`${file.name}-${index}`}
                                    file={file}
                                    index={index}
                                    onRemove={this.handleRemoveFile}
                                    borderRadius={borderRadius}
                                    mainTextColor={mainTextColor}
                                    errorColor={errorColor}
                                    deleteIcon={deleteIconSvg}
                                    backgroundColor={backgroundColor}
                                    getFileIcon={this.getFileIcon}
                                    formatFileSize={this.formatFileSize}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
