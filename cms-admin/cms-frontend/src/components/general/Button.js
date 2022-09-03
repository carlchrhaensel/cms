import React from 'react';
import PropTypes from 'prop-types';

/**
 * @param children
 * @param href
 * @param btnColor
 * @param onClick
 * @returns {JSX.Element}
 * @constructor
 */
const Button = ({children, href, disabled, onClick}) => {
    return (
        <a href={href}
           className={`btn ${disabled ? 'btn-disabled' : ''}`}
           onClick={() => {
               if (!disabled) onClick();
           }}>{children}</a>
    );
};

Button.defaultProps = {};

Button.propTypes = {
    href: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func
};

export default Button;