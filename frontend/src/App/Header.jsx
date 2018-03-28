import * as React from 'react';
import {Link} from 'react-router-dom';
import {Menu} from 'semantic-ui-react';
import {MiniProfile} from './MiniProfile';
import {AuthBar} from './AuthBar';

export class Header extends React.Component {
    render() {
        const {isLoggedIn, user} = this.props;

        return (
            <Menu>
                <Menu.Item name={'Home'} as={Link} to={'/'}>
                    Home
                </Menu.Item>
                {isLoggedIn ? <MiniProfile user={user}/> : <AuthBar/>}
            </Menu>
        );
    }
}