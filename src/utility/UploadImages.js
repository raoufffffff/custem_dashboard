import axios from "axios";



const handleImageUpload = async (e) => {
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
    const imageData = e.target.files[0]; // This could be the image file or a URL
    const formData = new FormData();
    formData.append('image', imageData);
    formData.append('key', apiKey);
    try {
        let downloadURL = ""
        const res = await axios.post('https://api.imgbb.com/1/upload', formData)
        // Create a storage reference
        downloadURL = res.data.data.url

        // Add the image URL to state
        return downloadURL
    } catch (err) {
        console.error('Upload error:', err);
    }
};

export default handleImageUpload