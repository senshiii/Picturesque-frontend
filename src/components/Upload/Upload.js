import React, { Fragment, useCallback, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Backdrop from '../Layout/Backdrop/Backdrop';
import classes from './Upload.module.css';
import PHI from '../../assets/images/image.png';
import Spinner from '../UI/Spinner/Spinner';
import * as actions from '../../store/actions/actions';

import useUpload from '../../hooks/useUpload';

const Upload = (props) => {
	const [ src, setSrc ] = useState(PHI);
	const [ file, setFile ] = useState(false);
	const [ load, setLoad ] = useState(false);
	const [ access, setAccess ] = useState('public');
	const { uploadFile, done, progress, error } = useUpload();
	const [ tags, setTags ] = useState('');
	const { addImg, id, token, closeUpload } = props;

	useEffect(
		() => {
			if (done) {
				const img = {
					url: done.dUrl,
					access,
					name: done.name,
					tags,
					size: access === 'public' ? 0 : file.size / 1024 / 1024
				};
				axios
					.post(`http://localhost:8080/user/${id}/images`, img, {
						headers: {
							authorization: `Bearer ${token}`
						}
					})
					.then((res) => {
						closeUpload();
						addImg(res.data);
					})
					.catch((err) => {
						console.log(err);
					});
			}
		},
		[ done, addImg, id, token, access, file.size, closeUpload, tags ]
	);

	const uploadHandler = useCallback(
		() => {
			setLoad(true);
			uploadFile(file);
		},
		[ uploadFile, file ]
	);

	const fileChangedHandler = (e) => {
		if (e.target.files[0]) {
			setFile(e.target.files[0]);
			setSrc(URL.createObjectURL(e.target.files[0]));
		}
	};

	return (
		<Fragment>
			<Backdrop />
			<div className={classes.Upload}>
				{!load ? (
					<div className={classes.UploadForm}>
						<h2>Upload Image</h2>
						<input id="file-input" type="file" onChange={fileChangedHandler} hidden accept="image/*" />
						<img src={src} className={classes.UploadedImg} alt="Uploaded file" />
						<div className={classes.Access}>
							<div>
								<label htmlFor="public">Public</label>
								<input
									type="checkbox"
									id="public"
									checked={access === 'public'}
									onChange={() => setAccess('public')}
								/>
							</div>
							<div>
								<label htmlFor="private">Private</label>
								<input
									type="checkbox"
									id="private"
									checked={access === 'private'}
									onChange={() => setAccess('private')}
								/>
							</div>
						</div>
						{access === 'public' && (
							<textarea
								className={classes.Tags}
								draggable="false"
								placeholder="Enter Tags. Tags begin with '#'. For only a single tag, using # is not required. Max 5 tags allowed. First 5 are taken. Rest are ignored."
								value={tags}
								onChange={e => setTags(e.target.value.trim())}
							>
								{tags}
							</textarea>
						)}
						<div>
							{file ? (
								<button onClick={uploadHandler} disabled={!file} className={classes.ActionBtns}>
									Upload
								</button>
							) : (
								<label
									htmlFor="file-input"
									className={[ classes.FileInput, classes.ActionBtns ].join(' ')}
								>
									Select Image
								</label>
							)}
							<button onClick={props.closeUpload} className={classes.ActionBtns}>
								Close
							</button>
						</div>
					</div>
				) : (
					<div className={classes.Loading}>
						<Spinner />
						<p className={classes.LoadingText}>{progress}</p>
					</div>
				)}
			</div>
		</Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
		id: state.auth.id,
		token: state.auth.token,
		loading: state.auth.loading
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addImg: (data) => dispatch(actions.dispatchAddImage(data))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
