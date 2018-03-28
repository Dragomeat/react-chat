import {BaseStatusConstants, MessagesConstants} from '_constants';

const initialState = {
    data: [],
    status: BaseStatusConstants.INITIALIZED,
    currentPage: 1,
    latestPage: 1,
    autoScrollToBottom: true,
};

export function messageReducer(state = initialState, action) {
    switch (action.type) {
        case MessagesConstants.SET_AUTO_SCROLL:
            return {
                ...state,
                autoScrollToBottom: action.payload.value,
            };
        case MessagesConstants.SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.data.currentPage,
                status: BaseStatusConstants.INITIALIZED,
            };
        case MessagesConstants.SET_LATEST_PAGE:
            return {
                ...state,
                latestPage: action.data.latestPage,
                status: BaseStatusConstants.INITIALIZED,
            };
        case MessagesConstants.MESSAGES_FETCH_REQUEST:
            return {
                ...state,
                status: BaseStatusConstants.FETCHING,
            };
        case MessagesConstants.MESSAGES_FETCH_SUCCESS:
            return {
                ...state,
                data: state.data.concat(action.payload.data),
                status: BaseStatusConstants.FETCHED,
            };
        case MessagesConstants.MESSAGES_FETCH_FAILURE:
            return {
                ...state,
                status: BaseStatusConstants.FAILED,
            };
        case MessagesConstants.ADD_MESSAGE:
            return {
                ...state,
                data: state.data.concat(action.payload.message),
            };
        default:
            return state;
    }
}