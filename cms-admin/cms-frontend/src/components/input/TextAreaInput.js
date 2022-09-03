import React from 'react';
import PropTypes from 'prop-types';

/**
 * @param state
 * @param setState
 * @param labelText
 * @param placeholder
 * @param disabled
 * @param cols
 * @param rows
 * @param onChange
 * @returns {JSX.Element}
 * @constructor
 */
const TextAreaInput = ({state, setState, labelText, placeholder, disabled, cols, rows, onChange}) => {
    return (
        <div className={'textAreaInput'}>
            <label>{labelText}</label>
            <textarea cols={cols}
                      rows={rows}
                      value={state}
                      onChange={(e) => {
                          setState(e.target.value);
                          onChange && onChange();
                      }}
                      placeholder={placeholder}
                      disabled={disabled}/>
        </div>
    );
};

TextAreaInput.defaultProps = {
    cols: 30,
    rows: 10,
    labelText: '',
    placeHolder: '',
    disabled: false
};

TextAreaInput.propTypes = {
    cols: PropTypes.number,
    rows: PropTypes.number,
    setState: PropTypes.func,
    labelText: PropTypes.string,
    placeHolder: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func
};


export default TextAreaInput;