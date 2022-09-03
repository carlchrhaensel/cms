/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import AdminContent from '../components/general/AdminContent';
import PageHeading from '../components/general/PageHeading';
import GridContainer from '../components/general/grid/GridContainer';
import GridColumn from '../components/general/grid/GridColumn';
import GridBox from '../components/general/grid/GridBox';
import GridBoxHeader from '../components/general/grid/GridBoxHeader';
import GridBoxHeading from '../components/general/grid/GridBoxHeading';
import TextInput from '../components/input/TextInput';
import TabList from '../components/tabs/TabList';
import {layoutTabs} from '../utils/layoutTabs';
import {loadDataFromServer, PUT} from '../utils/fetch';
import {Store} from 'react-notifications-component';
import ButtonContainer from '../components/general/ButtonContainer';
import Button from '../components/general/Button';
import {getBackendUrl} from '../utils/backend';

const LayoutHeader = () => {
    const [heading, setHeading] = useState('');
    const [subHeading, setSubHeading] = useState('');
    const dataUrl = getBackendUrl();

    useEffect(() => {
        loadDataFromServer('layoutHeader', (v) => {
            setHeading(v["header"].headerHeading)
            setSubHeading(v["header"].headerSubHeading)
        }, dataUrl, {});
    }, []);

    const save = async () => {
        // save changes
        const newData = {headerHeading: heading, headerSubHeading: subHeading};

        const data = await PUT({url: `${dataUrl}layoutHeader/`, body: newData});

        if (data.success === 'success') {
            Store.addNotification({
                title: 'Änderungen gespeichert',
                type: 'success',
                insert: 'top',
                container: 'top-right',
                animationIn: ['animate__animated', 'animate__fadeIn'],
                animationOut: ['animate__animated', 'animate__fadeOut'],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });
        }
    };
    return (
        <AdminContent>
            <div className={'layoutHeader'}>
                <PageHeading>Header</PageHeading>

                <TabList tabs={layoutTabs} current={1}/>

                <GridContainer>
                    <GridColumn>
                        <GridBox>
                            <GridBoxHeader>
                                <GridBoxHeading>Header</GridBoxHeading>
                            </GridBoxHeader>


                            <TextInput state={heading} setState={setHeading} labelText={'Überschrift'}/>
                            <TextInput state={subHeading} setState={setSubHeading} labelText={'Unterüberschrift'}/>
                        </GridBox>
                    </GridColumn>
                </GridContainer>

                <ButtonContainer>
                    <Button onClick={save}>Speichern</Button>
                </ButtonContainer>
            </div>
        </AdminContent>
    );
};

export default LayoutHeader;
