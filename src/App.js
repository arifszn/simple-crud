import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import enUSIntl from 'antd/lib/locale/en_US';
import './App.scss';
import ErrorBoundaryFallbackUI from './components/ErrorBoundaryFallbackUI';
import { setupInterceptors } from './components/HTTP';
import Layout from './components/Layout/Layout';
import LazyLoading from './components/LazyLoading/LazyLoading';
import NotFound from './components/NotFound/NotFound';
import PrivateRoute from './components/PrivateRoute';
import SuspenseErrorBoundary from './components/SuspenseErrorBoundary';
import ReactRoutes from './helpers/ReactRoutes';
import Routes from './helpers/Routes';
import store from './redux/store';

/**
 * Remove an element by showing fade out effect
 * 
 * @param Element el 
 * @param int speed in millisecond
 */
const fadeoutAndRemoveElement = (el, speed) => {
    var seconds = speed/1000;
    el.style.transition = "opacity "+seconds+"s ease";

    el.style.opacity = 0;
    setTimeout(function() {
        el.parentNode.removeChild(el);
    }, speed);
}

/**
 * public routes
 */
const publicRoutes = () => {
    return ReactRoutes.filter(route => route.private === false).map((route, index) => (
        <Route key={index} exact={route.exact} path={route.path}>
            <route.component/>
        </Route>
    ));
}

/**
 * private routes
 */
const privateRoutes = () => {
    return ReactRoutes.filter(route => route.private === true).map((route, index) => (
        <PrivateRoute key={index} exact={route.exact} path={route.path}>
            <route.component/>
        </PrivateRoute>
    ));
}

/**
 * Root component of react
 */
const App = () => {
    useEffect(()=> {
        //remove preloader
        let preloader = document.getElementById("szn-preloader");
        
        if (preloader) {
             fadeoutAndRemoveElement(preloader, 1000);
        }
        
        setupInterceptors(store);
    }, []);
    
    return (
        <React.Fragment>
            <SuspenseErrorBoundary fallback={<ErrorBoundaryFallbackUI/>}>
                <Suspense fallback={<LazyLoading/>}>
                    <ConfigProvider locale={enUSIntl}>
                        <BrowserRouter>
                            <Switch>
                                
                                {/* public routes */}
                                {publicRoutes()}

                                {/* private routes */}
                                <PrivateRoute>
                                    <Layout>
                                        <Switch>
                                            {privateRoutes()}
                                            <Route>
                                                <NotFound/>
                                            </Route>
                                        </Switch>
                                    </Layout>
                                </PrivateRoute>

                                {/* 404 route */}
                                <Route>
                                    <NotFound/>
                                </Route>
                                <Route path={Routes.web.notFound}>
                                    <NotFound/>
                                </Route>
                                
                            </Switch>
                        </BrowserRouter>
                    </ConfigProvider>
                </Suspense>
            </SuspenseErrorBoundary>
        </React.Fragment>
    );
}

export default App;
