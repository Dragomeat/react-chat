import axios from 'axios';
import {BaseStatusConstants, MessagesConstants} from '_constants';
import {isCurrentStatus} from '_utils';
import {getPaginatorForConversation} from '_selectors';
import {getMessagesForSelectedConversation} from '../_selectors';
import {isInitializedStatus} from '../_utils';

export function setAutoScroll(value) {
    return {
         type: MessagesConstants.SET_AUTO_SCROLL,
         payload: {
             value,
         }
    };
}

export function addMessage(conversation_id, message) {
    return {
        type: 'ADD_MESSAGE',
        payload: {
            message: message,
        },
    };
}

export function requestMessages() {
    return {
        type: MessagesConstants.MESSAGES_FETCH_REQUEST,
    };
}

export function receiveMessages(conversation_id, messages, offset) {
    messages = messages.map((message) => {
        return {
            ...message,
            conversation_id,
        };
    });

    return {
        type: MessagesConstants.MESSAGES_FETCH_SUCCESS,
        payload: {
            data: messages,
            offset: offset,
            conversationId: conversation_id,
        },
    };
}

export function fetchMessages(conversation_id, offset) {
    return (dispatch) => {
        dispatch(requestMessages());

        axios.get(`/api/conversations/${conversation_id}/messages?offset=${offset}`)
            .then((response) => response.data)
            .then((body) => {
                dispatch(receiveMessages(conversation_id, body.data, offset));
            });
    };
}

export function shouldFetchMessages(conversation_id, offset, state) {
    if(isInitializedStatus(state.messages)) {
        return true;
    }

    if (isCurrentStatus(BaseStatusConstants.FETCHING, state.messages)) {
        return false;
    }

    const currentOffset = getMessagesForSelectedConversation(state.messages.data, conversation_id).length;

    console.log(conversation_id, offset, currentOffset);

  //  return false;

    return currentOffset === offset;
}

export function fetchMessagesIfNeeded(conversation_id, offset = 0) {
    return (dispatch, getState) => {
        if (shouldFetchMessages(conversation_id, offset, getState())) {
            dispatch(fetchMessages(conversation_id, offset));
        }
    };
}