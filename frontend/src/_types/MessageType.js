import * as PropTypes from 'prop-types';
import {ParticipantType} from './ParticipantType';

export const MessageType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    participant: ParticipantType,
    updated_at: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
});