import * as React from 'react';
import {Item, Header, Segment} from 'semantic-ui-react';
import {Scrollbars} from 'react-custom-scrollbars';
import {Conversation} from './Conversation';

export class ConversationsComponent extends React.Component {
    componentDidMount() {
        this.props.fetchConversationsIfNeeded();
    }

    render() {
        const { isFetching, conversations } = this.props;

        return (
            <div>
                <Header as='h3' dividing>
                    You conversations
                </Header>

                <Segment basic loading={isFetching} style={{height: '800px'}}>
                    <Scrollbars
                        autoHide
                        autoHideTimeout={500}
                        autoHideDuration={200}
                    >
                        <Item.Group divided>
                            {conversations.map((conversation) => (
                                <Conversation key={conversation.id}
                                              conversation={conversation}/>
                            ))}
                        </Item.Group>
                    </Scrollbars>
                </Segment>
            </div>
        );
    }
}