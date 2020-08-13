import * as types from '../types';
import axios from 'axios';

export const register = (name, email, password) => (dispatch) => {
    dispatch(authStart());
    axios.post('http://localhost:8080/auth/register', {
        name,
        email,
        password
    })
    .then(res => {
        console.log(res);
        dispatch(authSuccess(res.data.user.id, res.data.token))
    })
    .catch(err => {
        console.log(err);
        dispatch(authFail(err));
    })
};

export const login = (email, password) => dispatch => {
    dispatch(authStart());
    axios.post('http://localhost:8080/auth/login', {
        email,
        password
    })
    .then(res => {
        console.log(res);
        dispatch(authSuccess(res.data.user.id, res.data.token))
    })
    .catch(err => {
        console.log(err);
        dispatch(authFail(err));
    });
}

export const authStart = () => {
	return {
		type: types.AUTH_START
	};
};

export const authSuccess = (id, token) => {
    return {
        type: types.AUTH_SUCCESS,
        id,
        token
    }
}

export const authFail = (error) => {
	return {
		type: types.AUTH_FAIL,
		error
	};
};

export const logout = () => {
    return {
        type: types.AUTH_LOGOUT
    }
}
