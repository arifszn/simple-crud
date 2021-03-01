import React, { useEffect } from 'react';

const Dashboard = () => {
    useEffect(() => {
        window.less.modifyVars({
            '@primary-color': '#FF0000'
        })
    }, [])

    return (
        <React.Fragment>
            Dashboard component
        </React.Fragment>
    )
}

export default Dashboard;