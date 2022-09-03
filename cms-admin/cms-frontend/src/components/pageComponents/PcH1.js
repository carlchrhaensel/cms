import React from 'react';

const PcH1 = ({setContent, initialState}) => {
    return (
        <h1 className={'pcH1 pageComponent__textInput'}
            contentEditable={true}
            suppressContentEditableWarning={true}
            onInput={(event) => {
                setContent(event.currentTarget.textContent);
            }}>
            {initialState}
        </h1>
    );
};

export default PcH1;
