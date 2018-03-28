import * as PropTypes from 'prop-types';
import {ConversationType} from './ConversationType';
import {UserType} from './UserType';

export const ParticipantType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    conversation: ConversationType,
    user: UserType,
    updated_at: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
});