import React from 'react';
import PropTypes from 'prop-types';

const GridColumn = ({children, className, onClick}) => {
    return (
        <div className={`gridColumn ${className}`} onClick={onClick}>
            {children}
        </div>
    );
};

GridColumn.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func
};

GridColumn.defaultProps = {
    className: '',
    onClick: () => {
    }
};

export default GridColumn;
