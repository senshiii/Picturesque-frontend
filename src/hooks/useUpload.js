import { useState, useCallback } from 'react';
import rootRef from '../firebase/firebase';
import { v4 } from 'uuid';

const useUpload = () => {
	const [ progress, setProgress ] = useState('');
	const [ done, setDone ] = useState(false);
	const [ error, setError ] = useState();

	const uploadFile = useCallback((file) => {
		let name = v4() + '.' + file.name.split('.')[1];
		const task = rootRef.child(`images/${name}`).put(file);
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
					setProgress('Saving...');
					setDone({ name, dUrl: downloadUrl });
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
