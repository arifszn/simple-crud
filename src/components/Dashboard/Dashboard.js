import React, { useEffect } from 'react';
import Routes from '../../helpers/Routes';
import HTTP from '../HTTP';

const Dashboard = () => {
    
    useEffect(() => {
        
    }, [])

    return (
        <React.Fragment>
            <button onClick={() => {
                HTTP.get(Routes.api.me, {
                }).then(response => {
                })
            }}>GET</button>
        </React.Fragment>
    )
}

export default Dashboard;