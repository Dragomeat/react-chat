import { login } from '_actions';
import {
    LoginPageComponent
} from './LoginPageComponent';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { formValueSelector } from 'redux-form';

const selector = formValueSelector('login');
const mapStateToProps = (state) => {
    const { email, password } = selector(state, 'email', 'password');

    return {
        email,
        password
    };
};
const mapDispatchToProps = (dispatch) => ({
    login: (email, password) => dispatch(login(email, password)),
});

export const LoginPage = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(LoginPageComponent)
);