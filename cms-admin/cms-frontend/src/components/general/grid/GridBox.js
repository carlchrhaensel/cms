import React from 'react';
import PropTypes from 'prop-types';

const GridBox = ({children, className}) => {
    return (
        <div className={`gridBox ${className}`}>
            {children}
        </div>
    );
};

GridBox.propTypes = {
    className: PropTypes.string,
};

GridBox.defaultProps = {
    className: '',
};

export default GridBox;
