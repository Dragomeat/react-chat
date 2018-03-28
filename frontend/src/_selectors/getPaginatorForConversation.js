import {getSelectedConversation} from './getSelectedConversation';

export function getPaginatorForConversation(conversations, conversation_id) {
    const conversation =  getSelectedConversation(conversations, conversation_id);

    if(!conversation) {
        return {
            currentPage: 1,
            latestPage: 1,
        };
    }

    return {
        currentPage: conversation.currentPage ? conversation.currentPage : 1,
        latestPage: conversation.latestPage ? conversation.latestPage : 1,
    };
}