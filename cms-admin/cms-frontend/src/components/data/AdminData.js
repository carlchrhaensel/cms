import React, {createContext, useState} from 'react';

const AdminContext = createContext({});

const AdminData = ({children}) => {
    const dataUrl = 'http://localhost/cms-backend/backend/'; // TODO set dataUrl
    const [pagesData, setPagesData] = useState([]);

    // noinspection JSUnusedGlobalSymbols
    return (
        <AdminContext.Provider
            value={{
                dataUrl: dataUrl,

                pagesData: pagesData,
                setPagesData: setPagesData
            }}>
            {children}
        </AdminContext.Provider>
    );
};

AdminData.propTypes = {};
export {AdminData, AdminContext};