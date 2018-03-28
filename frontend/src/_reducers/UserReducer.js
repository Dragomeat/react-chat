import {BaseStatusConstants, UserConstants} from '_constants';

const initialState = {
    data: null,
    token: null,
    status: BaseStatusConstants.INITIALIZED,
};

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case UserConstants.AUTH_TOKEN_UPDATE:
            return {
                ...state,
                token: action.payload.token,
            };
        case UserConstants.LOGIN_REQUEST:
            return {
                ...state,
                status: BaseStatusConstants.FETCHING,
            };
        case UserConstants.LOGIN_SUCCESS:
            return {
                ...state,
                data: action.user,
                status: BaseStatusConstants.FETCHED,
            };
        case UserConstants.LOGIN_FAILURE:
            return {
                ...state,
                status: BaseStatusConstants.FAILED,
            };
        default:
            return state;
    }
}