import React from 'react';

const PageHeading = ({children}) => {
    return (
        <p className={'pageHeading'}>
            {children}
        </p>
    );
};

export default PageHeading;
