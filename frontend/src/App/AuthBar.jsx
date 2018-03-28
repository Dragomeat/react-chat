import * as React from 'react';
import {Link} from 'react-router-dom';
import {Button, Menu} from 'semantic-ui-react';

export class AuthBar extends React.Component {
    render() {
        return (
            <Menu.Menu position={'right'}>
                <Menu.Item>
                    <Button primary={true} as={Link} to={'/auth/login'}>
                        Login
                    </Button>
                </Menu.Item>
            </Menu.Menu>
        );
    }
}