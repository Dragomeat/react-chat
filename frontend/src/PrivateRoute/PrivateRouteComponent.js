import * as React from 'react';
import {Redirect, Route} from 'react-router-dom';

export class PrivateRouteComponent extends React.Component {
    render() {
        const {isLoggedIn, component: Component, ...rest} = this.props;

        return (
            <Route
                {...rest}
                render={props =>
                    isLoggedIn ? (
                        <Component {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/auth/login',
                                state: {from: this.props.location}
                            }}
                        />
                    )
                }
            />

        );
    }
}