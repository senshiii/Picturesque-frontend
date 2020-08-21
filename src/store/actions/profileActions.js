import axios from 'axios';
import * as types from '../types';

const profileStart = () => {
	return {
		type: types.PROFILE_START
	};
};

const profileFail = (error) => {
	return {
		type: types.PROFILE_FAIL,
		error
	};
};

const profileSuccess = (profile) => {
	return {
		type: types.PROFILE_SUCCESS,
		profile
	};
};

export const dispatchAddImage = (data) => {
	return {
		type: types.ADD_IMG,
		img: data.upload,
		storage: data.storage
	};
};

const dispatchDelImg = (id, storage) => {
	return {
		type: types.DEL_IMG,
		id,
		storage
	};
};

export const delImg = (userId, imgId) => (dispatch) => {
	axios
		.delete(`http://localhost:8080/user/${userId}/images/${imgId}`)
		.then((res) => {
			dispatch(dispatchDelImg(res.data.id, res.data.storage));
		})
		.catch((err) => {
			console.log(err);
			dispatch(profileFail(err));
		});
};

export const profile = (id) => (dispatch) => {
	dispatch(profileStart());
	axios
		.get(`http://localhost:8080/user/${id}/profile`)
		.then((res) => {
			// console.log('My Profile Info', res);
			dispatch(profileSuccess(res.data));
		})
		.catch((err) => {
			console.log(err);
			dispatch(profileFail(err));
		});
};

export const clearProfile = () => {
	return {
		type: types.CLEAR_PROFILE
	}
}
