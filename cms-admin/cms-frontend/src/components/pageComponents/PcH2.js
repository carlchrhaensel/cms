import React from 'react';

const PcH2 = ({initialState, setContent}) => {
    return (
        <h2 className={'pcH2 pageComponent__textInput'}
            contentEditable={true}
            suppressContentEditableWarning={true}
            onInput={(event) => {
                setContent(event.currentTarget.textContent);
            }}>
            {initialState}
        </h2>
    );
};

export default PcH2;
