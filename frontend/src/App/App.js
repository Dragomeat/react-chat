import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {AppComponent} from './AppComponent';
import {isCurrentStatus} from '_utils';
import {BaseStatusConstants} from '_constants';

const mapStateToProps = (state) => ({
    isLoggedIn: isCurrentStatus(BaseStatusConstants.FETCHED, state.user),
    userFetching: isCurrentStatus(BaseStatusConstants.FETCHING, state.user) || (
        isCurrentStatus(BaseStatusConstants.INITIALIZED, state.user) && state.user.token !== null
    ),
    user: state.user.data,
});
const mapDispatchToProps = (dispatch) => ({});

export const App = withRouter(
    connect(mapStateToProps)(AppComponent)
);