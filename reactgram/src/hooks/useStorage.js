import { useState, useEffect } from 'react';
import { projectStorage, projectFirestore, timestamp } from '../firebase/config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';


const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // Create a storage reference
    const storageRef = ref(projectStorage, file.name);
    const collectionRef = collection(projectFirestore, 'images');

    // Upload the file
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get the percentage of upload completed
        const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(percentage);
      },
      (error) => {
        setError(error);
      },
      async () => {
        // Get the download URL after upload completes
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        const createdAt = timestamp();
        await addDoc(collectionRef, { url: downloadURL, createdAt });
        setUrl(downloadURL);
      }
    );

    return () => {
      // Cancel the upload if the component is unmounted
      uploadTask.cancel();
    }
  }, [file]);

  return { progress, url, error };
}

export default useStorage;




