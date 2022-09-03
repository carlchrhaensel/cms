import React from 'react';
import PropTypes from 'prop-types';

const GridContainer = ({children, className}) => {
    return (
        <div className={`gridContainer ${className}`}>
            {children}
        </div>
    );
};

GridContainer.defaultProps = {
    className: ''
};

GridContainer.propTypes = {
    className: PropTypes.string
};

export default GridContainer;
