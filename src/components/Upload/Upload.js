import React, { Fragment, useCallback, useState } from 'react';

import Backdrop from '../Layout/Backdrop/Backdrop';
import classes from './Upload.module.css';

import useUpload from '../../hooks/useUpload';

const Upload = (props) => {
	const [ file, setFile ] = useState();
	const { uploadFile, uploaded, progress, error } = useUpload();

	const uploadHandler = useCallback(
		() => {
			uploadFile(file);
		},
		[ uploadFile, file ]
	);

	// const getSource = useCallback(
	// 	() => {
	// 		const fr = new FileReader();
	// 		fr.onload = () => {
	// 			console.log(fr.readAsDataURL(file));
	// 		};
	// 		// return fr.readAsDataURL(file);
	// 	},
	// 	[ file ]
	// );

    const img = URL.createObjectURL(file);
	return props.showUpload ? (
		<Fragment>
			<Backdrop />
			<div className={classes.Upload}>
				<h2>Upload Image</h2>
				<input type="file" onChange={(e) => setFile(e.target.files[0])} placeholder="Select Image" />
				<button onClick={uploadHandler}>Upload</button>
				<button onClick={props.closeUpload}>Close</button>
                {file && <img src={img} alt="Upload" />}
				{progress && <p>{progress}%</p>}
				<img src={URL.createObjectURL(file)} alt="Uploaded file" />
				{error && <p>{error}</p>}
				{uploaded && <p>Image Uploaded</p>}
			</div>
		</Fragment>
	) : null;
};

export default Upload;
