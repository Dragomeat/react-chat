import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {GuestRouteComponent} from './GuestRouteComponent';
import {BaseStatusConstants} from '_constants';
import {isCurrentStatus} from '_utils';

const mapStateToProps = (state) => ({
    isLoggedIn: isCurrentStatus(BaseStatusConstants.FETCHED, state.user),
});

export const GuestRoute = withRouter(
    connect(mapStateToProps)(GuestRouteComponent)
);