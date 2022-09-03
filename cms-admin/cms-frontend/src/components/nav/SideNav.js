import React from 'react';
import {useHistory} from 'react-router-dom';
import {FaAlignJustify, FaHome, FaPalette, FaTable} from 'react-icons/fa';

const SideNav = () => {
    const history = useHistory();

    return (
        <div className={'sideNav'}>
            <p className={'sideNav__heading noTextSelect'}>Allgemein</p>

            <div className={'sideNav__item noTextSelect'} onClick={() => {
                history.push('/dashboard/');
            }}>
                <FaHome className={'sideNav__item__icon'}/>
                <p>Startseite</p>
            </div>

            <div className={'sideNav__item noTextSelect'} onClick={() => {
                history.push('/pages/');
            }}>
                <FaAlignJustify className={'sideNav__item__icon'}/>
                <p>Seiten</p>
            </div>

            <div className={'sideNav__item noTextSelect'} onClick={() => {
                history.push('/layout/navbar/');
            }}>
                <FaTable className={'sideNav__item__icon'}/>
                <p>Layout</p>
            </div>

            <div className={'sideNav__item noTextSelect'} onClick={() => {
                history.push('/theme/');
            }}>
                <FaPalette className={'sideNav__item__icon'}/>
                <p>Theme</p>
            </div>
        </div>
    );
};

export default SideNav;
