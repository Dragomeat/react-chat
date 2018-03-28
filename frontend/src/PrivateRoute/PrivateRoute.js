import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {PrivateRouteComponent} from './PrivateRouteComponent';
import {isCurrentStatus} from '_utils';
import {BaseStatusConstants} from '_constants';

const mapStateToProps = (state) => ({
    isLoggedIn: isCurrentStatus(BaseStatusConstants.FETCHED, state.user),
});

export const PrivateRoute = withRouter(
    connect(mapStateToProps)(PrivateRouteComponent)
);