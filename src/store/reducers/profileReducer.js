import * as types from '../types';

const initialState = {
	loading: false,
	error: null,
	profile: null
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case types.PROFILE_START:
			return {
				...state,
				loading: true,
				profile: {
					...state.profile
				}
			};
		case types.PROFILE_SUCCESS:
			return {
				loading: false,
				error: null,
				profile: action.profile
			};
		case types.PROFILE_FAIL: {
			return {
				...state,
				loading: false,
				error: action.error,
				profile: {
					...state.profile
				}
			};
		}
		case types.ADD_IMG:
			return {
				...state,
				profile: {
					...state.profile,
					storage: action.storage,
					images: [action.img, ...state.profile.images]
				}
			};
		case types.DEL_IMG:
			return {
				...state,
				profile: {
					...state.profile,
					storage: action.storage,
					// eslint-disable-next-line
					images: state.profile.images.filter((el) => el._id != action.id)
				}
			};
		case types.CLEAR_PROFILE:
			return {
				...state,
				profile: null
			}
		default:
			return state;
	}
};

export default reducer;
