import React from 'react';
import {Comment} from 'semantic-ui-react';

export class Message extends React.Component {

    render() {
        const { message } = this.props;

        return (
            <Comment>
                <Comment.Avatar as='a' src='https://react.semantic-ui.com/assets/images/avatar/small/matt.jpg' />
                <Comment.Content>
                    <Comment.Author as='a'>{message.participant.user.name}</Comment.Author>
                    <Comment.Metadata>
                        <span>{message.created_at}</span>
                    </Comment.Metadata>
                    <Comment.Text>{message.content}</Comment.Text>
                    <Comment.Actions>
                        <a>Reply</a>
                    </Comment.Actions>
                </Comment.Content>
            </Comment>
        );
    }
}