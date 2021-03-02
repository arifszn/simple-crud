import Utils from "./Utils";

const web = {
    home: '/',
    login: '/login',
    signup: '/signup',
    forgetPassword: '/forget-password',
    resetPassword: '/reset-password/:token',
    notFound: '/not-found',
    dashboard: '/dashboard',
    products: '/products',
    newProduct: '/product/new',
    editProduct: '/product/edit/:id',
    logout: '/logout',
};

const api = {
    login: Utils.backend+'/api/'+Utils.apiVersion+'/login',
    signup: Utils.backend+'/api/'+Utils.apiVersion+'/signup',
    me: Utils.backend+'/api/'+Utils.apiVersion+'/me',
    refreshToken: Utils.backend+'/api/'+Utils.apiVersion+'/refresh-token',
    forgetPassword: Utils.backend+'/api/'+Utils.apiVersion+'/forget-password',
    resetPassword: Utils.backend+'/api/'+Utils.apiVersion+'/reset-password',
    product: Utils.backend+'/api/'+Utils.apiVersion+'/product',
    products: Utils.backend+'/api/'+Utils.apiVersion+'/products',
};

const Routes = {
    web: web,
    api: api
};

export default Routes;