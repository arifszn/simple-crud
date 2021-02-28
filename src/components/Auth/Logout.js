import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Routes from '../../helpers/Routes';
import { removeToken } from '../../redux/slices/tokenSlice';

const Logout = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(removeToken());
    }, [])

    return (
        <Redirect
            to={Routes.web.login}
        />
    );
}

export default Logout;