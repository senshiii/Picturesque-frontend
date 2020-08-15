import { useState, useCallback } from "react";
import rootRef from "../firebase/firebase";
import axios from "axios";

const useUpload = () => {
  const [progress, setProgress] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState();

  const uploadFile = useCallback((file, id, token) => {
    const task = rootRef.child(`images/public/${file.name}`).put(file);
    task.on(
      "state_changed",
      (snap) => {
        let progress =
          Math.floor(snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(`Uploading: ${progress}%`);
      },
      (err) => {
        setError(err);
        setDone(false);
      },
      () => {
        task.snapshot.ref.getDownloadURL().then((downloadUrl) => {
          const img = {
            url: downloadUrl,
          };
          setProgress('Saving your image...');
          axios
            .post(`http://localhost:8080/user/${id}/images`, img, {
              headers: {
                'authorization': `Bearer ${token}`
              }
            })
            .then((res) => {
              console.log(res);
              if (res.status === 200) setDone(true);
            })
            .catch((err) => {
              console.log(err);
              setError(err);
              setDone(true);
            });
        });
      }
    );
  }, []);

  return {
    uploadFile,
    done,
    progress,
    error,
  };
};

export default useUpload;
