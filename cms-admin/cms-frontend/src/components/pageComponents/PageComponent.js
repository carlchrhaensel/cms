import React from 'react';
import PcH1 from './PcH1';
import PcH2 from './PcH2';
import PcH3 from './PcH3';
import PcText from './PcText';

const PageComponent = ({type, content, setContent}) => {
    if (type === 'h1') return <PcH1 setContent={setContent} initialState={content}/>;
    if (type === 'h2') return <PcH2 setContent={setContent} initialState={content}/>;
    if (type === 'h3') return <PcH3 setContent={setContent} initialState={content}/>;

    if (type === 'text') return <PcText setContent={setContent} initialState={content}/>;

    return (
        <div>
            {content}
        </div>
    );
};

export default PageComponent;
