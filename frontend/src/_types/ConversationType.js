import * as PropTypes from 'prop-types';
import {MessageType} from './MessageType';

export const ConversationType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    newMessages: PropTypes.number.isRequired,
    latestMessage: MessageType,
    updated_at: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
});