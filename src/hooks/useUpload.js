import { useState, useCallback } from 'react';
import rootRef from '../firebase/firebase';

const useUpload = () => {
	const [ progress, setProgress ] = useState(0);
	const [ uploaded, setUploaded ] = useState(false);
	const [ error, setError ] = useState();

	const uploadFile = useCallback(
		(file) => {
			const task = rootRef.child(`images/public/${file.name}`).put(file);
			task.on(
				'state_changed',
				(snap) => {
					let progress = Math.floor(snap.bytesTransferred / snap.totalBytes) * 100;
					setProgress(progress);
				},
				(err) => {
					setError(err);
					setUploaded(false);
				},
				() => {
					setUploaded(true);
				}
			);
		},
		[ rootRef ]
	);

	return {
        uploadFile,
		uploaded,
		progress,
        error,
	};
};

export default useUpload;
