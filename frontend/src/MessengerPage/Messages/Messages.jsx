import * as React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {bindActionCreators} from 'redux';
import {getMessagesForSelectedConversation, getSelectedConversation} from '_selectors';
import {isCurrentStatus} from '_utils';
import {BaseStatusConstants} from '_constants';
import {fetchMessagesIfNeeded, selectConversation, setAutoScroll} from '_actions';
import {MessagesComponent} from './MessagesComponent';

const mapStateToProps = (state, props) => {
    const messages = getMessagesForSelectedConversation(state.messages.data, props.match.params.id);

    return {
        messagesOffset: messages.length,
        autoScrollToBottom: state.messages.autoScrollToBottom,
        selectedConversation: getSelectedConversation(state.conversations.data, props.match.params.id),
        messages,
        isFetching: isCurrentStatus(BaseStatusConstants.FETCHING, state.messages),
        user: state.user.data,
    };
};
const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchMessagesIfNeeded,
    selectConversation,
    setAutoScroll,
}, dispatch);


class MessagesContainer extends React.Component {
    componentWillReceiveProps(nextProps) {
      //  const {selectedConversation: nextSelectedConversation} = nextProps;
     //   const {selectConversation, selectedConversation, match} = this.props;

       // console.log(selectedConversation, nextSelectedConversation, match.params.id);

        // if (selectedConversation === match.params.id) {
        //     selectConversation(match.params.id);
        // }
        //
        // if (selectedConversation && nextSelectedConversation && selectedConversation.id !== nextSelectedConversation.id) {
        //     selectConversation(nextSelectedConversation.id);
        // }
    }

    componentDidUpdate() {
        const {selectedConversation} = this.props;

        if (selectedConversation) {
            this.props.fetchMessagesIfNeeded(selectedConversation.id);
        }
    }

    render() {
        const {isFetching, messages, autoScrollToBottom, setAutoScroll, messagesOffset, fetchMessagesIfNeeded, selectedConversation} = this.props;

        if (!selectedConversation) {
            return <h1>Not found.</h1>;
        }

        return <MessagesComponent
            isFetching={isFetching}
            fetchMessagesIfNeeded={fetchMessagesIfNeeded}
            selectedConversation={selectedConversation}
            autoScrollToBottom={autoScrollToBottom}
            setAutoScroll={setAutoScroll}
            messages={messages}
            messagesOffset={messagesOffset}
        />;
    }
}


export const Messages = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MessagesContainer)
);
