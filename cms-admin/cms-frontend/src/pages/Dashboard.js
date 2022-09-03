import React, {useEffect, useState} from 'react';
import AdminContent from '../components/general/AdminContent';
import PageHeading from '../components/general/PageHeading';
import GridContainer from '../components/general/grid/GridContainer';
import GridColumn from '../components/general/grid/GridColumn';
import GridBox from '../components/general/grid/GridBox';
import GridBoxHeader from '../components/general/grid/GridBoxHeader';
import GridBoxHeading from '../components/general/grid/GridBoxHeading';
import {loadDataFromServer} from '../utils/fetch';
import {getBackendUrl} from '../utils/backend';

const Dashboard = () => {
    const dataUrl = getBackendUrl();
    const [stats, setStats] = useState({});

    useEffect(() => {
        loadDataFromServer('statistics', (v) => {
            setStats(v.stats);
        }, dataUrl, {});
    }, []);

    return (
        <AdminContent>
            <div className={'dashboard'}>
                <PageHeading>Dashboard</PageHeading>

                <GridContainer>
                    <GridColumn>
                        <GridBox>
                            <GridBoxHeader>
                                <GridBoxHeading>Aufrufe</GridBoxHeading>
                            </GridBoxHeader>

                            <p style={{margin: 0}}>Heute: {stats.today}</p>
                            <p style={{margin: 0}}>Dieses Jahr: {stats.year}</p>
                        </GridBox>
                    </GridColumn>
                </GridContainer>
            </div>
        </AdminContent>
    );
};

export default Dashboard;
