import * as React from 'react';
import {Dropdown, Icon, Image, Menu} from 'semantic-ui-react';

const UserAvatar = ({ user }) => (
   <span>
        <Image avatar src='https://react.semantic-ui.com/assets/images/wireframe/image.png'/> {user.name}
   </span>
);

export class MiniProfile extends React.Component {
    render() {
        const { user } = this.props;

        return (
            <Menu.Menu position={'right'}>
                <Dropdown trigger={<UserAvatar user={user}/>} pointing='top left' className='link item'>
                    <Dropdown.Menu>
                        <Dropdown.Item>
                            <Icon name={'user'}/>
                            Account
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Icon name={'settings'}/>
                            Settings
                        </Dropdown.Item>
                        <Dropdown.Divider/>
                        <Dropdown.Item>
                            <Icon name={'sign out'}/>
                            Logout
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Menu>
        );
    }
}