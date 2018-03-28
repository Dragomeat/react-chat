import axios from 'axios';
import {BaseStatusConstants, MessagesConstants} from '_constants';
import {isCurrentStatus} from '_utils';
import {getPaginatorForConversation} from '_selectors';
import {getMessagesForSelectedConversation} from '../_selectors';

export function setAutoScroll(value) {
    return {
         type: MessagesConstants.SET_AUTO_SCROLL,
         payload: {
             value,
         }
    };
}

export function setCurrentPage(page) {
    return {
         type: MessagesConstants.SET_CURRENT_PAGE,
         data: {
             currentPage: page,
         }
    };
}

export function setLatestPage(page) {
    return {
        type: MessagesConstants.SET_LATEST_PAGE,
        data: {
            latestPage: page,
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

export function receiveMessages(conversation_id, messages, paginator) {
    messages = messages.map((message) => {
        return {
            ...message,
            conversation_id,
            page: paginator.currentPage,
        };
    });

    return {
        type: MessagesConstants.MESSAGES_FETCH_SUCCESS,
        payload: {
            data: messages,
            currentPage: paginator.currentPage,
            latestPage: paginator.latestPage,
        },
    };
}

export function fetchMessages(conversation_id, page) {
    return (dispatch) => {
        dispatch(requestMessages());

        axios.get(`/api/conversations/${conversation_id}/messages?page=${page}`)
            .then((response) => response.data)
            .then((body) => {
                dispatch(receiveMessages(conversation_id, body.data, {
                    currentPage: body.meta.current_page,
                    latestPage: body.meta.last_page,
                }));
            });
    };
}

export function shouldFetchMessages(conversation_id, page, state) {
    if(isCurrentStatus(BaseStatusConstants.INITIALIZED, state.messages)) {
        return true;
    }

    const paginator = getPaginatorForConversation(state.conversations.data, conversation_id);
    const countOfMessages = getMessagesForSelectedConversation(state.messages.data, conversation_id).length;

    if (countOfMessages < paginator.currentPage * 25 && !isCurrentStatus(BaseStatusConstants.FETCHING, state.messages)) {
        return true;
    }

    console.log(paginator.currentPage !== page && paginator.latestPage >= page && !isCurrentStatus(BaseStatusConstants.FETCHING, state.messages));

    return paginator.currentPage !== page && paginator.latestPage >= page && !isCurrentStatus(BaseStatusConstants.FETCHING, state.messages);
}

export function fetchMessagesIfNeeded(conversation_id, page) {
    return (dispatch, getState) => {
        if (shouldFetchMessages(conversation_id, page, getState())) {
            dispatch(fetchMessages(conversation_id, page));
        }
    };
}