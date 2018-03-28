import * as React from 'react';
import * as PropTypes from 'prop-types';
import {Comment, Form, Header, Loader, Segment} from 'semantic-ui-react';
import {Scrollbars} from 'react-custom-scrollbars';
import {MessageType, ConversationType} from '_types';
import {Message} from './Message';
import {fetchMessagesIfNeeded} from '../../_actions';

export class MessagesComponent extends React.Component {
    static propTypes = {
        isFetching: PropTypes.bool.isRequired,
        selectedConversation: ConversationType.isRequired,
        autoScrollToBottom: PropTypes.bool.isRequired,
        setAutoScroll: PropTypes.func.isRequired,
        messages: PropTypes.arrayOf(MessageType).isRequired,
    };

    constructor(state, context) {
        super(state, context);

        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        const {_container} = this.refs;

         _container.scrollToBottom();
        //
        // dispatch(listen('conversation.' + selectedConversation.id, '.message.created', (data) => {
        //     console.log(data);
        //     dispatch(addMessage(selectedConversation.id, data.message));
        // }));
    }

    componentDidUpdate(prevProps) {
        const { _container } = this.refs;
        const { autoScrollToBottom } = this.props;


        if (autoScrollToBottom && this.props.messages.length >= prevProps.messages.length) {
            _container.scrollToBottom();
        }
    }

    handleScroll(values) {
        const { _container } = this.refs;
        const { autoScrollToBottom: prevAutoScrollToBottom, setAutoScroll, fetchMessagesIfNeeded, selectedConversation } = this.props;
        const autoScrollToBottom = values.top >= 0.96;

        if (autoScrollToBottom !== prevAutoScrollToBottom) {
            setAutoScroll(autoScrollToBottom);
        }

        const loadNewMessages = _container.getScrollTop() <= 50;

        if (loadNewMessages) {
            fetchMessagesIfNeeded(selectedConversation.id, 2);
        }
    }

    render() {
        const {isFetching, selectedConversation, messages} = this.props;

        return (
            <div>
                <Header as='h3' dividing>{selectedConversation.name}</Header>

                <Segment basic style={{height: '800px'}}>
                    <Scrollbars
                        autoHide
                        autoHideTimeout={500}
                        autoHideDuration={200}
                        onScrollFrame={this.handleScroll}
                        ref='_container'
                    >
                        <Comment.Group>
                            <Loader active={isFetching} inline='centered' />

                            {messages.map((message) => (
                                <Message
                                    key={message.id}
                                    message={message}
                                />
                            ))}
                        </Comment.Group>
                    </Scrollbars>
                </Segment>

                <Form reply>
                    <Form.TextArea autoHeight/>
                </Form>
            </div>
        );
    }
}