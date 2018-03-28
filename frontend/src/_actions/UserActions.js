import axios from 'axios';
import {UserConstants} from '_constants';
import {isCurrentStatus} from '_utils';
import {BaseStatusConstants} from '_constants';

function requestCurrentUser() {
    return {
        type: UserConstants.LOGIN_REQUEST,
    };
}

function receiveCurrentUser(body) {
    return {
        type: UserConstants.LOGIN_SUCCESS,
        user: body.data
    };
}

function failureCurrentUser(error) {
    return {
        type: UserConstants.LOGIN_FAILURE
    };
}

function fetchCurrentUser() {
    return (dispatch) => {
        dispatch(requestCurrentUser());

        axios.get('/api/user')        
            .then((response) => response.data)
            .then((body) => {
                dispatch(receiveCurrentUser(body));
            })
            .catch((e) => dispatch(failureCurrentUser(e)));
    };
}

function shouldFetchCurrentUser(state) {
    if (!state.token) {
        return;
    }

    return isCurrentStatus(BaseStatusConstants.INITIALIZED, state);
}

export function fetchCurrentUserIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchCurrentUser(getState().user)) {
            dispatch(fetchCurrentUser());
        }
    };
}

export function authTokenUpdate(token) {
    return {
        type: UserConstants.AUTH_TOKEN_UPDATE,
        payload: {
            token,
        },
    };
}

export function login(email, password) {
    return (dispatch) => {
        axios.post('/api/auth/login', {email, password})
            .then((response) => response.data)
            .then((body) => {
                dispatch(authTokenUpdate(body.data.token));
                dispatch(receiveCurrentUser(body));
            })
            .catch((e) => dispatch(failureCurrentUser(e)));
    };
}