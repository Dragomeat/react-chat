import {BaseStatusConstants, ConversationConstants, MessagesConstants} from '_constants';

const initialState = {
    data: [],
    status: BaseStatusConstants.INITIALIZED,
    autoScrollToBottom: true,
};

export function messageReducer(state = initialState, action) {
    switch (action.type) {
        case ConversationConstants.SELECT_CONVERSATION:
            return {
                ...state,
                offset: 0,
            };
        case MessagesConstants.SET_AUTO_SCROLL:
            return {
                ...state,
                autoScrollToBottom: action.payload.value,
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