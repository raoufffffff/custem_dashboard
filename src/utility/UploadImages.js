import imageCompression from 'browser-image-compression';
import axios from 'axios'
const handleImageUpload = async (e) => {
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
    const originalFile = e.target.files[0];

    // Optimization options
    const options = {
        maxSizeMB: 0.5,          // Target file size (0.5MB)
        maxWidthOrHeight: 1200,  // Maximum dimension
        useWebWorker: true,      // For better performance
        fileType: 'image/webp',  // Output format
        initialQuality: 0.75     // Quality (0.6-0.8 is usually good)
    };

    try {
        const optimizedFile = await imageCompression(originalFile, options);

        const formData = new FormData();
        formData.append('image', optimizedFile);
        formData.append('key', apiKey);

        const res = await axios.post('https://api.imgbb.com/1/upload', formData);
        return res.data.data.url;
    } catch (err) {
        console.error('Upload error:', err);
        throw err;
    }
};

export default handleImageUpload