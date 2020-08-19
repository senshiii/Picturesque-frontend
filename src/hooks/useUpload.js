import { useState, useCallback } from 'react';
import rootRef from '../firebase/firebase';

const useUpload = () => {
	const [ progress, setProgress ] = useState('');
	const [ done, setDone ] = useState(false);
	const [ error, setError ] = useState();

	const uploadFile = useCallback((file) => {
		const task = rootRef.child(`images/public/${file.name}`).put(file);
		task.on(
			'state_changed',
			(snap) => {
				let progress = Math.floor(snap.bytesTransferred / snap.totalBytes) * 100;
				setProgress(`Uploading: ${progress}%`);
			},
			(err) => {
				setError(err);
				setDone(false);
			},
			() => {
				task.snapshot.ref.getDownloadURL().then((downloadUrl) => {
					setProgress('Saving image...');
					setDone(downloadUrl);
				});
			}
		);
	}, []);

	return {
		uploadFile,
		done,
		progress,
		error
	};
};

export default useUpload;
