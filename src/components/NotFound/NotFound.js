import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';
import Routes from '../../helpers/Routes';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

// Create a Wrapper component that'll render an <section> tag with some styles
const Wrapper = styled.section`
    margin-top: 30px;
`;

/**
 * Display not found page
 */
const NotFound = () => {
    const token = useSelector(state => state.token.value);
    
    return (
        <Wrapper>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary"><Link to={token ? Routes.web.dashboard : Routes.web.login}>Back Home</Link></Button>}
            />
        </Wrapper>
    )
}

export default NotFound;