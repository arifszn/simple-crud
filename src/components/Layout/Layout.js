import React, { useState } from 'react';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import { HomeOutlined, HddOutlined } from '@ant-design/icons';
import { useHistory, useLocation } from 'react-router-dom';
import Routes from '../../helpers/Routes';
import RightContent from './RightContent';
import Utils from '../../helpers/Utils';

const defaultProps = {
    title: Utils.getAppName(),
    navTheme: 'light',
    layout: 'side',
    route: {
        routes: [
            {
                path: Routes.web.dashboard,
                name: 'Dashboard',
                icon: <HomeOutlined />,
            },
            {
                path: Routes.web.product,
                name: 'Product',
                icon: <HddOutlined />,
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
                            onClick={(e) => {
                                e.preventDefault();
                                navigateToPath(item.path);
                            }}
                            href={item.path}
                        >
                            {dom}
                        </a>
                    )}
                    rightContentRender={() => <RightContent/>}
                >
                    {children}
                    
                </ProLayout>
            </div>
        </React.Fragment>
    )
}

export default Layout;