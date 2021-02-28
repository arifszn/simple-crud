import Utils from "./Utils";

const web = {
    home: '/',
    login: '/login',
    signup: '/signup',
    forgetPassword: '/forget-password',
    resetPassword: '/reset-password/:token',
    notFound: '/not-found',
    dashboard: '/dashboard',
    logout: '/logout',
};

const api = {
    login: Utils.apiUrl+'/api/'+Utils.apiVersion+'/login',
    signup: Utils.apiUrl+'/api/'+Utils.apiVersion+'/signup',
    forgetPassword: Utils.apiUrl+'/api/'+Utils.apiVersion+'/forget-password',
    resetPassword: Utils.apiUrl+'/api/'+Utils.apiVersion+'/reset-password',
};

const Routes = {
    web: web,
    api: api
};

export default Routes;