import * as React from 'react';
import {fetchCurrentUserIfNeeded} from '_actions';
import {Container, Loader} from 'semantic-ui-react';
import {Header} from './Header';
import {PrivateRoute} from 'PrivateRoute';
import {GuestRoute} from 'GuestRoute';
import {MessengerPage} from 'MessengerPage';
import {LoginPage} from 'LoginPage';
import {Redirect, Switch} from 'react-router-dom';

export class AppComponent extends React.Component {
    componentWillMount() {
        const {dispatch} = this.props;

        dispatch(fetchCurrentUserIfNeeded());
    }

    componentWillReceiveProps(nextProps) {
        const {dispatch} = this.props;

        dispatch(fetchCurrentUserIfNeeded());
    }

    render() {
        const {userFetching, isLoggedIn, user} = this.props;

        if (userFetching) {
            return <Loader active style={{
                margin: 'auto',
            }}/>;
        }

        return (
            <div>
                <Header isLoggedIn={isLoggedIn} user={user}/>
                <Container>
                    <Switch>
                        <Redirect exact from={'/'} to={'/conversations'}/>
                        <PrivateRoute path={'/conversations'} component={MessengerPage}/>
                        <GuestRoute exact path={'/auth/login'} component={LoginPage}/>
                    </Switch>
                </Container>
            </div>
        );
    }
}