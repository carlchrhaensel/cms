/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import AdminContent from '../components/general/AdminContent';
import PageHeading from '../components/general/PageHeading';
import TabList from '../components/tabs/TabList';
import {layoutTabs} from '../utils/layoutTabs';
import GridColumn from '../components/general/grid/GridColumn';
import GridBox from '../components/general/grid/GridBox';
import GridBoxHeader from '../components/general/grid/GridBoxHeader';
import GridBoxHeading from '../components/general/grid/GridBoxHeading';
import {ReactSortable} from 'react-sortablejs';
import {FaArrowsAlt, FaTrashAlt} from 'react-icons/fa';
import TextInput from '../components/input/TextInput';
import GridContainer from '../components/general/grid/GridContainer';
import ButtonContainer from '../components/general/ButtonContainer';
import Button from '../components/general/Button';
import {loadDataFromServer, PUT} from '../utils/fetch';
import {Store} from 'react-notifications-component';
import HtmlEditor from '../components/input/HtmlEditor';
import {getBackendUrl} from '../utils/backend';

const LayoutSidebar = () => {
    const dataUrl = getBackendUrl();

    const [items, setItems] = useState([]);

    useEffect(() => {
        loadDataFromServer('layoutSidebar', (v) => {
            const sidebar = v['sidebar'];
            setItems(sidebar.map((item, index) => ({id: index, heading: item.heading, content: item.content})));
        }, dataUrl, {});
    }, []);


    const save = async () => {
        // save changes

        const data = await PUT({url: `${dataUrl}layoutSidebar/`, body: items});
        if (data.success === 'success') {
            setItems(data['sidebar']);

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

    const addElement = () => {
        let id = 0;
        for (let i = 0; i < items.length; i++) {
            if (items[i].id > id) id = items[i].id;
        }

        setItems(prev => [...prev, {id: id + 1, heading: 'Überschrift', content: 'Text'}]);
    };

    const deleteElement = (index) => {
        setItems(prev => prev.filter((item, i) => i !== index));
    };

    return (
        <AdminContent>
            <div className={'layoutSidebar'}>
                <PageHeading>Sidebar</PageHeading>

                <TabList tabs={layoutTabs} current={3}/>

                <GridContainer>
                    <GridColumn>
                        <GridBox className={'layoutSidebar__elements'}>
                            <GridBoxHeader>
                                <GridBoxHeading>Sidebar-Elemente</GridBoxHeading>
                            </GridBoxHeader>

                            <ReactSortable list={items} setList={setItems} handle={'.handle'}>
                                {items.map((item, index) => (
                                    <div key={index} className={'layoutSidebar__sidebarItem noTextSelect'}>
                                        <div>
                                            <FaArrowsAlt className={'handle'}/>
                                            <FaTrashAlt style={{marginTop: '10px'}} onClick={() => deleteElement(index)}/>
                                        </div>
                                        <div>
                                            <TextInput labelText={'Überschrift'} state={item.heading} setState={(v) => {
                                                setItems(prev => prev.map(i => {
                                                    return i.id === item.id ? {
                                                        ...i,
                                                        heading: v
                                                    } : i;
                                                }));
                                            }}/>
                                            <p style={{margin: 0}}>Inhalt</p>
                                            <HtmlEditor labelText={'Inhalt'} initialState={item.content} setContent={(v) => {
                                                setItems(prev => prev.map(i => {
                                                    return i.id === item.id ? {
                                                        ...i,
                                                        content: v
                                                    } : i;
                                                }));
                                            }}/>

                                        </div>
                                    </div>
                                ))}
                            </ReactSortable>
                        </GridBox>
                    </GridColumn>
                </GridContainer>

                <ButtonContainer>
                    <Button onClick={addElement}>Element hinzufügen</Button>
                    <Button onClick={save}>Speichern</Button>
                </ButtonContainer>
            </div>
        </AdminContent>
    );
};

export default LayoutSidebar;
