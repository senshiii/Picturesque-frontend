import * as types from '../types';

const initState = {
    id: null,
    token: null,
    isAuth: false,
    loading: false,
    error: null,
    images: null
};

const reducer = (state = initState, action) => {
    switch(action.type){
        case types.AUTH_START: 
            return {
                ...state,
                loading: true,
                error: null
            }
        case types.AUTH_SUCCESS:
            return {
                ...state,
                id: action.id,
                token: action.token,
                loading: false,
                error: null,
                isAuth: true
            }
        case types.AUTH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case types.AUTH_LOGOUT: 
            return {
                ...state,
                id: null,
                token: null,
                isAuth: false
            }
        default: return state;
    }
}

export default reducer;

