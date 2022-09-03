/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import AdminContent from '../components/general/AdminContent';
import PageHeading from '../components/general/PageHeading';
import GridContainer from '../components/general/grid/GridContainer';
import GridColumn from '../components/general/grid/GridColumn';
import GridBox from '../components/general/grid/GridBox';
import GridBoxHeading from '../components/general/grid/GridBoxHeading';
import GridBoxHeader from '../components/general/grid/GridBoxHeader';
import {loadDataFromServer, PUT} from '../utils/fetch';
import {Store} from 'react-notifications-component';
import ButtonContainer from '../components/general/ButtonContainer';
import Button from '../components/general/Button';
import {getBackendUrl} from '../utils/backend';

const Theme = () => {
   const dataUrl = getBackendUrl();
    const [selectedTheme, setSelectedTheme] = useState('BaseTheme');

    const themes = [
        'BaseTheme',
        'Theme01'
    ];

    useEffect(() => {
        loadDataFromServer('theme', (v) => {
            setSelectedTheme(v.theme);
        }, dataUrl, {});
    }, []);

    const save = async () => {
        // save changes
        const newData = {theme: selectedTheme};

        const data = await PUT({url: `${dataUrl}theme/`, body: newData});

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
            <div className={'theme'}>
                <PageHeading>Theme</PageHeading>

                <GridContainer>
                    <GridColumn>
                        <GridBox>
                            <GridBoxHeader>
                                <GridBoxHeading>Themeauswahl</GridBoxHeading>
                            </GridBoxHeader>

                            <div className={'theme__list'}>
                                {themes.map((theme, index) => <div key={index}
                                                                   onClick={() => setSelectedTheme(theme)}
                                                                   className={'theme__list__theme ' +
                                                                       `${theme === selectedTheme ? 'theme__list__theme-current' : ''}`}>{theme}</div>)}
                            </div>
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

export default Theme;
