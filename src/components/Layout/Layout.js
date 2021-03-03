import React from 'react';
import ProLayout from '@ant-design/pro-layout';
import { HomeOutlined, ShoppingOutlined } from '@ant-design/icons';
import { useHistory, useLocation } from 'react-router-dom';
import Routes from '../../helpers/Routes';
import RightContent from './RightContent';
import Utils from '../../helpers/Utils';

const defaultProps = {
    title: Utils.getAppName(),
    navTheme: 'light',
    layout: 'top',
    fixedHeader: true,
    logo: process.env.PUBLIC_URL + '/assets/img/logo.png',
    route: {
        routes: [
            {
                path: Routes.web.dashboard,
                name: 'Dashboard',
                icon: <HomeOutlined />,
            },
            {
                path: 'product',
                name: 'Product',
                icon: <ShoppingOutlined />,
                routes: [
                   
                    {
                        path: Routes.web.products,
                        name: 'Products',
                    },
                    {
                        path: Routes.web.newProduct,
                        name: 'New Product',
                    },
                ],
            },
        ],
    },
};

const Layout = ({ children, ...rest }) => {
    const location = useLocation();
    let history = useHistory();

    const navigateToPath = (path) => {
        history.push(path);
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
                    location={location}
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
                    breadcrumbRender={() => ('')}
                    rightContentRender={() => <RightContent/>}
                >
                    {children}
                    
                </ProLayout>
            </div>
        </React.Fragment>
    )
}

export default Layout;