import * as PropTypes from 'prop-types';

export const UserType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
});