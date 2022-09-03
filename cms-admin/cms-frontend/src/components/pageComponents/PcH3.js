import React from 'react';

const PcH3 = ({initialState, setContent}) => {
    return (
        <h3 className={'pcH3 pageComponent__textInput'}
            contentEditable={true}
            suppressContentEditableWarning={true}
            onInput={(event) => {
                setContent(event.currentTarget.textContent);
            }}>
            {initialState}
        </h3>
    );
};

export default PcH3;
