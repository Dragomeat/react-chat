import React from 'react';
import {Item, Segment} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

export class Conversation extends React.Component {
    render() {
        const {conversation} = this.props;

        return (
            <Item style={{
                paddingRight: '5px',
                paddingLeft: '5px',
            }}>
                <Item.Image
                    size='mini'
                    avatar
                    src='https://react.semantic-ui.com/assets/images/avatar/small/helen.jpg'
                />

                <Item.Content verticalAlign='top'>
                    <Item.Header as={Link} to={`/conversations/${conversation.id}`} size='mini'>
                        {conversation.name.substr(0, 35)}
                    </Item.Header>
                    <Item.Description>
                        <Segment size='mini' color='blue'>
                            <b>{conversation.latestMessage.participant.user.name}:</b> {conversation.latestMessage.content.substr(0, 100)}
                        </Segment>
                    </Item.Description>
                </Item.Content>
            </Item>
        );
    }
}