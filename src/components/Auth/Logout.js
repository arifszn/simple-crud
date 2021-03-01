import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Routes from '../../helpers/Routes';
import { removeToken } from '../../redux/slices/tokenSlice';
import { removeUser } from '../../redux/slices/userSlice';

const Logout = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(removeToken());
        dispatch(removeUser());
    }, [dispatch])

    return (
        <Redirect
            to={Routes.web.login}
        />
    );
}

export default Logout;