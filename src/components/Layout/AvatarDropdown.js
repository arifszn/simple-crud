import React from 'react';
import { Dropdown, Menu, Avatar, Typography } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import './AvatarDropdown.scss';
import { useHistory } from 'react-router-dom';
import Routes from '../../helpers/Routes';
import { useSelector } from 'react-redux';

const AvatarDropdown = () => {
    const user = useSelector(state => state.user.value);

    let history = useHistory();

    const onMenuClick = (event) => {
        const { key } = event;

        if (key === 'logout') {
            history.push(Routes.web.logout);
        }
    }

    const menuHeaderDropdown = (
        <Menu selectedKeys={[]} onClick={onMenuClick}>
            <Menu.Item key="logout" style={{textAlign: 'center'}}>
                <LogoutOutlined />
                Log out
            </Menu.Item>
        </Menu>
    );

    return (
        <React.Fragment>
            <div className="z-avatar-dropdown-wrapper">
                <Dropdown overlay={menuHeaderDropdown}>
                    <span>
                        <Avatar icon={<UserOutlined />} size="small" alt="avatar" />
                        <Typography.Text type="secondary">{user && user.name}</Typography.Text>
                    </span>
                </Dropdown>
            </div>
        </React.Fragment>
    )
}

export default AvatarDropdown;