/* eslint-disable react-hooks/exhaustive-deps */
import TopNav from './components/nav/TopNav';
import {Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PagesList from './pages/PagesList';
import {loadDataFromServer} from './utils/fetch';
import React, {useContext, useEffect} from 'react';
import {AdminContext} from './components/data/AdminData';
import Homepage from './pages/Homepage';
import EditPage from './pages/EditPage';
import LayoutNavbar from './pages/LayoutNavbar';
import LayoutFooter from './pages/LayoutFooter';
import LayoutHeader from './pages/LayoutHeader';
import LayoutSidebar from './pages/LayoutSidebar';
import Theme from './pages/Theme';
import { ReactNotifications } from 'react-notifications-component'
import {getBackendUrl} from './utils/backend';

function App() {
    const {setPagesData} = useContext(AdminContext);
    const dataUrl = getBackendUrl();

    useEffect(() => {
        loadDataFromServer('pages', setPagesData, dataUrl);
    }, [dataUrl]);

    return (
        <div className="admin">
            <ReactNotifications />
            <TopNav/>
            <Route path={'/'} exact component={() => <Homepage/>}/>
            <Route path={'/dashboard/'} exact component={() => <Dashboard/>}/>
            <Route path={'/pages/'} exact component={() => <PagesList/>}/>
            <Route path={'/pages/:id'} exact component={() => <EditPage/>}/>
            <Route path={'/theme/'} exact component={() => <Theme/>}/>

            <Route path={'/layout/navbar/'} exact component={() => <LayoutNavbar/>}/>
            <Route path={'/layout/footer/'} exact component={() => <LayoutFooter/>}/>
            <Route path={'/layout/header/'} exact component={() => <LayoutHeader/>}/>
            <Route path={'/layout/sidebar/'} exact component={() => <LayoutSidebar/>}/>
        </div>
    );
}

export default App;
