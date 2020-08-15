import React, { Fragment, useCallback, useState, useEffect } from "react";

import Backdrop from "../Layout/Backdrop/Backdrop";
import classes from "./Upload.module.css";
import PHI from "../../assets/images/image.png";
import Spinner from "../UI/Spinner/Spinner";

import useUpload from "../../hooks/useUpload";

const Upload = (props) => {
  const [src, setSrc] = useState(PHI);
  const [file, setFile] = useState(false);
  const [loading, setLoading] = useState(false);
	const { uploadFile, done, progress, error } = useUpload();
	
  useEffect(() => {
    if (done) {
      setTimeout(() => {
        props.closeUpload();
      }, 1500);
    }
  }, [done, props]);

  const uploadHandler = useCallback(() => {
    setLoading(true);
    uploadFile(file, props.id, props.token);
  }, [uploadFile, file, props]);

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
        {!loading ? (
          <div className={classes.UploadForm}>
            <h2>Upload Image</h2>
            <label htmlFor="file-input" className={classes.FileInput}>
              Select Image
            </label>
            <input
              id="file-input"
              type="file"
              onChange={fileChangedHandler}
              hidden
              accept="image/*"
            />
            <img
              src={src}
              className={classes.UploadedImg}
              alt="Uploaded file"
            />
            <div>
              <button
                onClick={uploadHandler}
                disabled={!file}
                className={classes.ActionBtns}
              >
                Upload
              </button>
              <button
                onClick={props.closeUpload}
                className={classes.ActionBtns}
              >
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

export default Upload;
