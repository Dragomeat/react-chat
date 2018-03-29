import {BaseStatusConstants, ConversationConstants, MessagesConstants} from '_constants';
import {updateItemInArray} from '_utils';

const initialState = {
    data: [],
    // selectedConversation: null,
    status: BaseStatusConstants.INITIALIZED,
};

export function conversationReducer(state = initialState, action) {
    switch (action.type) {
        // case ConversationConstants.SELECT_CONVERSATION:
        //     return {
        //         ...state,
        //         selectedConversation: action.payload.id,
        //     };
        case ConversationConstants.CONVERSATIONS_FETCH_REQUEST:
            return {
                ...state,
                status: BaseStatusConstants.FETCHING,
            };
        case ConversationConstants.CONVERSATIONS_FETCH_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                status: BaseStatusConstants.FETCHED,
            };
        case ConversationConstants.CONVERSATIONS_FETCH_FAILURE:
            return {
                ...state,
                status: BaseStatusConstants.FAILED,
            };
        default:
            return state;
    }
}
