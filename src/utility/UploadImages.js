import { firebase } from '../config'


const handleImageUpload = async (file) => {


    try {

        // Create a storage reference
        const storageRef = firebase.storage().ref().child(`images/${Date.now()}-${file.name}`);

        // Upload the file directly (no need to convert to blob or use fetch)
        const snapshot = await storageRef.put(file);

        // Get the publicly accessible URL
        const downloadURL = await snapshot.ref.getDownloadURL();

        console.log('Image uploaded and accessible at:', downloadURL);

        // Add the image URL to state
        return downloadURL
    } catch (err) {
        console.error('Upload error:', err);
    }
};

export default handleImageUpload