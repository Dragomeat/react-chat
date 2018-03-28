import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {bindActionCreators} from 'redux';
import {MessengerPageComponent} from './MessengerPageComponent';

const mapStateToProps = (state, props) => ({});
const mapDispatchToProps = (dispatch) =>  bindActionCreators({}, dispatch);

export const MessengerPage = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MessengerPageComponent)
);