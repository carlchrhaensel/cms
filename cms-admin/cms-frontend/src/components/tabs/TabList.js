import React from 'react';
import {Link} from 'react-router-dom';

const TabList = ({tabs, current}) => {
    return (
        <div className={'tabList'}>
            {tabs.map((tab, index) => {
                return <Link key={index}
                             className={`tabList__item ${index === current && 'tabList__item-current'} noTextSelect`}
                             to={tab.href}>{tab.text}</Link>;
            })}
        </div>
    );
};

export default TabList;
