import React from 'react';
import styled from 'styled-components';

// Create an ErrorTitle component that'll render an <h1> tag with some styles
const ErrorTitle = styled.h1`
    font-size: 1.5em;
    color: palevioletred;
`;

// Create an ErrorSubTitle component that'll render an <small> tag with some styles
const ErrorSubTitle = styled.small`
    color: grey;
`;

// Create a ErrorWrapper component that'll render an <section> tag with some styles
const ErrorWrapper = styled.section`
    text-align: center;
    padding: 4em;
    background: papayawhip;
`;

/**
 * Error boundary fallback UI to display when error occurs
 */
const ErrorBoundaryFallbackUI = () => {
    return (
        <ErrorWrapper>
            <ErrorTitle>
                <code>Something went wrong!</code>
            </ErrorTitle>
            {(!process.env.NODE_ENV || process.env.NODE_ENV === 'development') &&
                <ErrorSubTitle>
                    <code>Open <strong>console</strong> for more details.</code>
                </ErrorSubTitle>
            }
        </ErrorWrapper>
    )
}

export default ErrorBoundaryFallbackUI;