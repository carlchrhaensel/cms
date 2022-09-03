import React from 'react';
import logo from '../../img/logo.png';

const TopNav = () => {
    return (
        <div className={'topNav'}>
            <img src={logo} className={'topNav__logo'} alt=""/>
        </div>
    );
};

export default TopNav;
