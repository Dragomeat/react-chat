import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {ConversationsComponent} from './ConversationsComponent';
import {getSelectedConversation} from '_selectors';
import {bindActionCreators} from 'redux';
import {fetchConversationsIfNeeded} from '_actions';
import {isCurrentStatus} from '_utils';
import {BaseStatusConstants} from '_constants';

const mapStateToProps = (state, props) => ({
    selectedConversation: getSelectedConversation(state.conversations.data, props.match.params.id),
    conversations: state.conversations.data,
    isFetching: isCurrentStatus(BaseStatusConstants.FETCHING, state.conversations),
    user: state.user.data,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchConversationsIfNeeded,
}, dispatch);

export const Conversations = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ConversationsComponent)
);