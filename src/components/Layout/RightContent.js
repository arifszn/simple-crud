import React from 'react';
import AvatarDropdown from './AvatarDropdown';
import styled from 'styled-components';

// Create a Wrapper component that'll render an <section> tag with some styles
const Wrapper = styled.div`
    display: flex;
    float: right;
    margin-left: auto;
    overflow: hidden;
`;

const RightContent = () => {
    return (
        <React.Fragment>
            <Wrapper>
                <AvatarDropdown/>
            </Wrapper>
        </React.Fragment>
    )
}

export default RightContent;