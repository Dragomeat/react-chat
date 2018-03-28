import * as React from 'react';
import {Redirect, Route} from 'react-router-dom';

export class GuestRouteComponent extends React.Component {
    render() {
        const { isLoggedIn, component: Component, ...rest } = this.props;

        return (
            <Route
                {...rest}
                render={props =>
                    !isLoggedIn ? (
                        <Component {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: { from: this.props.location }
                            }}
                        />
                    )
                }
            />

        );
    }
}