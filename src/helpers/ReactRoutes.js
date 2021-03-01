
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Routes from "./Routes";
const Login = React.lazy(() => import('../components/Auth/Login'));
const Signup = React.lazy(() => import('../components/Auth/Signup'));
const ForgetPassword = React.lazy(() => import('../components/Auth/ForgetPassword'));
const ResetPassword = React.lazy(() => import('../components/Auth/ResetPassword'));
const Dashboard = React.lazy(() => import('../components/Dashboard/Dashboard'));
const Product = React.lazy(() => import('../components/Product/Product'));
const Logout = React.lazy(() => import('../components/Auth/Logout'));

const RedirectLogin = () => {
    const token = useSelector(state => state.token.value);

    return (
        <Redirect
            to={token ? Routes.web.dashboard : Routes.web.login}
        />
    )
}

const ReactRoutes = [
    {
        title: 'Home',
        path: Routes.web.home,
        exact: true,
        component: RedirectLogin,
        private: false
    },
    {
        title: 'Login',
        path: Routes.web.login,
        exact: true,
        component: Login,
        private: false
    },
    {
        title: 'Signup',
        path: Routes.web.signup,
        exact: true,
        component: Signup,
        private: false
    },
    {
        title: 'Forget Password',
        path: Routes.web.forgetPassword,
        exact: true,
        component: ForgetPassword,
        private: false
    },
    {
        title: 'Reset Password',
        path: Routes.web.resetPassword,
        exact: true,
        component: ResetPassword,
        private: false
    },
    {
        title: 'Dashboard',
        path: Routes.web.dashboard,
        exact: true,
        component: Dashboard,
        private: true
    },
    {
        title: 'Product',
        path: Routes.web.product,
        exact: true,
        component: Product,
        private: true
    },
    {
        title: 'Logout',
        path: Routes.web.logout,
        exact: true,
        component: Logout,
        private: true
    },
]

export default ReactRoutes;