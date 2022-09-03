import React from 'react';
import SideNav from '../nav/SideNav';
import PropTypes from 'prop-types';

const AdminContent = ({children, sideNav}) => {
    return (
        <div id={'admin-content'} className={'adminContent'}>
            {sideNav && <SideNav/>}
            {children}
        </div>
    );
};

AdminContent.propTypes = {
    sideNav: PropTypes.bool
};

AdminContent.defaultProps = {
    sideNav: true
};

export default AdminContent;
