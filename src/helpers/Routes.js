import Utils from "./Utils";

const web = {
    home: '/',
    login: '/login',
    signup: '/signup',
    forgetPassword: '/forget-password',
    resetPassword: '/reset-password/:token',
    notFound: '/not-found',
    dashboard: '/dashboard',
    product: '/product',
    logout: '/logout',
};

const api = {
    login: Utils.apiUrl+'/api/'+Utils.apiVersion+'/login',
    signup: Utils.apiUrl+'/api/'+Utils.apiVersion+'/signup',
    me: Utils.apiUrl+'/api/'+Utils.apiVersion+'/me',
    refreshToken: Utils.apiUrl+'/api/'+Utils.apiVersion+'/refresh-token',
    forgetPassword: Utils.apiUrl+'/api/'+Utils.apiVersion+'/forget-password',
    resetPassword: Utils.apiUrl+'/api/'+Utils.apiVersion+'/reset-password',
    product: Utils.apiUrl+'/api/'+Utils.apiVersion+'/product',
    products: Utils.apiUrl+'/api/'+Utils.apiVersion+'/products',
};

const Routes = {
    web: web,
    api: api
};

export default Routes;