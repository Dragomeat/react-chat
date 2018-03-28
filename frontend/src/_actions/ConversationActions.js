import axios from 'axios';
import {ConversationConstants} from '../_constants';

function receiveConversations(conversations) {
    return {
        type: ConversationConstants.CONVERSATIONS_FETCH_SUCCESS,
        payload: {
            data: conversations,
        },
    };
}

function fetchConversations() {
    return (dispatch) => {
        axios.get('/api/conversations')
            .then((response) => response.data.data)
            .then((conversations) => dispatch(receiveConversations(conversations)))
    };
}

function shouldFetchConversations(state) {
    return !(state.isFetching || state.isFetched);
}

export function selectConversation(id) {
    return {
        type: ConversationConstants.SELECT_CONVERSATION,
        payload: {
            id: id,
        }
    };
}

export function fetchConversationsIfNeeded() {
    return (dispatch, getState) => {
         const state = getState();

         if (shouldFetchConversations(state.conversations)) {
             dispatch(fetchConversations());
         }
    };
}