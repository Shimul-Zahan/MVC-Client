// Environment variables from your Vite `.env`
const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

export const uploadFiles = async (files) => {

    let formData = new FormData()
    // formData.append('file', imageFile);
    formData.append('upload_preset', UPLOAD_PRESET);
    let uploaded = []

    for (const f of files) {
        const { file, type } = f
        formData.append('file', file)

        try {
            const res = await fetch(CLOUDINARY_UPLOAD_URL, {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                const data = await res.json();
                uploaded.push({ file: data, type });
            } else {
                console.error(`Failed to upload file: ${res.statusText}`);
            }
        } catch (err) {
            console.error("Error uploading file:", err);
        }
    }

    return uploaded;
}