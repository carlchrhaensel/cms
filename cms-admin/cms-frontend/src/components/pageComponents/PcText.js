/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import PropTypes from 'prop-types';

import HtmlEditor from '../input/HtmlEditor';

const PcText = ({initialState, setContent}) => {
    return (
        <HtmlEditor initialState={initialState} setContent={setContent}/>
    );
};

PcText.propTypes = {
    initialState: PropTypes.string
};

export default PcText;
