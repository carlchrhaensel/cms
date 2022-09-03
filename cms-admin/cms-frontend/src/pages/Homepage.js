import React from 'react';
import {Redirect} from 'react-router-dom';

const Homepage = () => {
    return (
        <Redirect to={"/dashboard/"}/>
    );
};

export default Homepage;
