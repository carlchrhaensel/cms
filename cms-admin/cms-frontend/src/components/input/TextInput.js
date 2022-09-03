import React from 'react';
import PropTypes from 'prop-types';

/**
 * @param state
 * @param setState
 * @param labelText
 * @param placeholder
 * @param disabled
 * @param readOnly
 * @param onClick
 * @param onChange
 * @returns {JSX.Element}
 * @constructor
 */
const TextInput = ({state, setState, labelText, placeholder, disabled, readOnly, onClick, onChange}) => {
    return (
        <div className="textInput">
            <label>{labelText}</label>
            <input
                type="text"
                value={state}
                onChange={(e) => {
                    setState(e.target.value);
                    onChange && onChange();
                }}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                onClick={onClick}
            />
        </div>
    );
};

TextInput.defaultProps = {
    labelText: '',
    placeHolder: '',
    disabled: false,
    readOnly: false
};

TextInput.propTypes = {
    setState: PropTypes.func,
    labelText: PropTypes.string,
    placeHolder: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    readOnly: PropTypes.bool,
    onChange: PropTypes.func
};

export default TextInput;