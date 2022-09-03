import React, {useState} from 'react';

const AddPageComponent = ({addComponent}) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className={'addPageComponent'}>
            <p className={'addPageComponent__heading'}
               onClick={() => setShowMenu(prev => !prev)}>Komponente hinzufügen</p>
            <div className={'addPageComponent__list'} style={{display: showMenu ? 'block' : 'none'}}>
                <p onClick={() => {
                    addComponent('h1', 'Überschrift 1');
                    setShowMenu(false);
                }}>Überschrift 1</p>
                <p onClick={() => {
                    addComponent('h2', 'Überschrift 2');
                    setShowMenu(false);
                }}>Überschrift 2</p>
                <p onClick={() => {
                    addComponent('h3', 'Überschrift 3');
                    setShowMenu(false);
                }}>Überschrift 3</p>
                <p onClick={() => {
                    addComponent('text', 'Text');
                    setShowMenu(false);
                }}>Textblock</p>
            </div>
        </div>
    );
};

export default AddPageComponent;
