// Environment variables from your Vite `.env`
const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`;

export const uploadFiles = async (files) => {

    console.log(files, 'from upload files function here');

    let formData = new FormData()
    // formData.append('file', imageFile);
    formData.append('upload_preset', UPLOAD_PRESET);
    let uploaded = []

    for (const f of files) {
        const { file, type } = f

        console.log(file, 'file object');
        console.log('Uploading file:', file.name, 'Type:', file.type);

        if (!file) {
            console.error('File is undefined or invalid!');
            continue;
        }


        formData.append('file', file)
        formData.append('upload_preset', UPLOAD_PRESET);

        // Determine the resource type based on file type
        if (file.type.startsWith('video/')) {
            formData.append('resource_type', 'video');
        } else if (file.type.startsWith('image/')) {
            formData.append('resource_type', 'image');
        } else {
            formData.append('resource_type', 'raw');
        }

        try {
            const res = await fetch(CLOUDINARY_UPLOAD_URL, {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                const data = await res.json();
                uploaded.push({
                    file: data,
                    type
                });
            } else {
                const errorData = await res.json();
                console.error(`Failed to upload file: ${errorData.error.message}`);
            }
        } catch (err) {
            console.error("Error uploading file:", err);
        }
        formData = new FormData();
    }

    console.log(uploaded);
    return uploaded;
}