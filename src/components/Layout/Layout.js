import React, { useEffect, useState } from 'react';
import ProLayout, { PageContainer, SettingDrawer } from '@ant-design/pro-layout';
import { LikeOutlined, UserOutlined, SmileOutlined, CrownOutlined } from '@ant-design/icons';
import { Button, Descriptions, Result, Avatar, Space, Statistic } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import Routes from '../../helpers/Routes';

const defaultProps = {
    title: 'DEMO',
    route: {
        routes: [
            {
                path: Routes.web.dashboard,
                name: 'Dashboard',
                icon: <SmileOutlined />,
            },
            {
                path: Routes.web.logout,
                name: 'Logout',
                icon: <LikeOutlined />,
            },
        ],
    },
};

const Layout = ({ children, ...rest }) => {
    const location = useLocation();
    const [pathname, setPathname] = useState(location.pathname);
    let history = useHistory();

    const navigateToPath = (path) => {
        history.push(path);
        setPathname(path);
    }
    
    return (
        <React.Fragment>
            <div
                style={{
                    height: '100vh',
                }}
            >
                <ProLayout
                    {...defaultProps}
                    location={{
                        pathname,
                    }}
                    fixSiderbar
                    onMenuHeaderClick={(e) => navigateToPath(Routes.web.dashboard)}
                    menuItemRender={(item, dom) => (
                        <a
                            onClick={() => {
                                navigateToPath(item.path)
                            }}
                        >
                            {dom}
                        </a>
                    )}
                    rightContentRender={() => (
                        <div>
                            <Avatar shape="square" size="small" icon={<UserOutlined />} />
                        </div>
                    )}
                >
                    <PageContainer content="SZN">{children}</PageContainer>
                </ProLayout>
            </div>
        </React.Fragment>
    )
}

export default Layout;