export const getMessagesForSelectedConversation = (messages, selected_id) => {
    return messages
        .filter((message) => {
            return message.conversation_id === selected_id;
        })
        .sort(function (a, b) {
            let aCreatedAt = new Date(a.created_at).getTime();
            let bCreatedAt = new Date(b.created_at).getTime();

            if (aCreatedAt > bCreatedAt) return 1;
            if (aCreatedAt < bCreatedAt) return -1;

            return 0;
        });
};