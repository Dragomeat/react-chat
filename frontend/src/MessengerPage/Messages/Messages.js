import * as React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {bindActionCreators} from 'redux';
import {getMessagesForSelectedConversation, getSelectedConversation} from '_selectors';
import {isCurrentStatus} from '_utils';
import {BaseStatusConstants} from '_constants';
import {fetchMessagesIfNeeded, selectConversation, setAutoScroll} from '_actions';
import {MessagesComponent} from './MessagesComponent';

const mapStateToProps = (state, props) => ({
    autoScrollToBottom: state.messages.autoScrollToBottom,
    idOfSelectedConversation: state.conversations.selectedConversation,
    selectedConversation: getSelectedConversation(state.conversations.data, props.match.params.id),
    messages: getMessagesForSelectedConversation(state.messages.data, props.match.params.id),
    currentPageOfMessages: state.messages.currentPage,
    isFetching: isCurrentStatus(BaseStatusConstants.FETCHING, state.messages),
    user: state.user.data,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchMessagesIfNeeded,
    selectConversation,
    setAutoScroll,
}, dispatch);


class MessagesContainer extends React.Component {
    componentWillReceiveProps(nextProps) {
        const {idOfSelectedConversation} = nextProps;
        const {selectConversation, match} = this.props;


        console.log('componentWillReceiveProps', idOfSelectedConversation, match.params.id);
        if (idOfSelectedConversation !== match.params.id) {
            selectConversation(match.params.id);
        }
    }

    componentDidUpdate() {
        const {selectedConversation} = this.props;

        if (selectedConversation) {
            console.log(selectedConversation);
            this.props.fetchMessagesIfNeeded(selectedConversation.id, 1);
        }
    }

    render() {
        const {isFetching, messages, autoScrollToBottom, setAutoScroll, fetchMessagesIfNeeded, selectedConversation} = this.props;

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
        />;
    }
}


export const Messages = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MessagesContainer)
);
