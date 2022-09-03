/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import AdminContent from '../components/general/AdminContent';
import PageHeading from '../components/general/PageHeading';
import TabList from '../components/tabs/TabList';
import {layoutTabs} from '../utils/layoutTabs';
import GridContainer from '../components/general/grid/GridContainer';
import GridColumn from '../components/general/grid/GridColumn';
import GridBox from '../components/general/grid/GridBox';
import GridBoxHeader from '../components/general/grid/GridBoxHeader';
import GridBoxHeading from '../components/general/grid/GridBoxHeading';
import {loadDataFromServer, PUT} from '../utils/fetch';
import ButtonContainer from '../components/general/ButtonContainer';
import Button from '../components/general/Button';
import { Store } from 'react-notifications-component';
import HtmlEditor from '../components/input/HtmlEditor';
import {getBackendUrl} from '../utils/backend';

const LayoutFooter = () => {
    const dataUrl = getBackendUrl();
    const [footerContent, setFooterContent] = useState(null);

    useEffect(() => {
        loadDataFromServer('layoutFooter', (v) => {
            setFooterContent(v.footer);
        }, dataUrl, {});
    }, []);

    const save = async () => {
        // save changes

        const data = await PUT({url: `${dataUrl}layoutFooter/`, body: {footer: footerContent}});

        if (data.success === 'success') {
            Store.addNotification({
                title: "Änderungen gespeichert",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });
        }
    };

    return (
        <AdminContent>
            <div className={'layoutFooter'}>
                <PageHeading>Footer</PageHeading>

                <TabList tabs={layoutTabs} current={2}/>

                <GridContainer>
                    <GridColumn>
                        <GridBox>
                            <GridBoxHeader>
                                <GridBoxHeading>Footer-Inhalt</GridBoxHeading>
                            </GridBoxHeader>

                            {footerContent != null && <HtmlEditor setContent={setFooterContent} initialState={footerContent}/>}
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

export default LayoutFooter;
