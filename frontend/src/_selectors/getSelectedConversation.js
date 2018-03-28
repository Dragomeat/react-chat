export const getSelectedConversation = (conversations, selected_id = null) => {
    if (!selected_id) {
        return null;
    }

    return conversations.find((conversation) => {
        return conversation.id === selected_id;
    });
};