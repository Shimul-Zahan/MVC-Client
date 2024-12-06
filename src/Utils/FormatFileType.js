
export const formatFileType = (mimeType) => {
    if (!mimeType) return "Unknown";
    const typeMap = {
        "application/pdf": "PDF Document",
        "text/plain": "Text File",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "Word Document",
        "application/vnd.ms-excel": "Excel Spreadsheet",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation": "PowerPoint Presentation",
        "application/zip": "ZIP Archive",
    };

    // Check for common types
    if (typeMap[mimeType]) return typeMap[mimeType];

    // For generic types (e.g., image/jpeg)
    const mainType = mimeType.split("/")[0]; // E.g., "image", "video"
    return mainType.charAt(0).toUpperCase() + mainType.slice(1); // Capitalize first letter
};
