/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import AdminContent from '../components/general/AdminContent';
import GridContainer from '../components/general/grid/GridContainer';
import GridColumn from '../components/general/grid/GridColumn';
import GridBoxHeader from '../components/general/grid/GridBoxHeader';
import GridBoxHeading from '../components/general/grid/GridBoxHeading';
import GridBox from '../components/general/grid/GridBox';
import {ReactSortable} from 'react-sortablejs';
import PageHeading from '../components/general/PageHeading';
import {FaArrowsAlt, FaTrashAlt} from 'react-icons/fa';
import TextInput from '../components/input/TextInput';
import TabList from '../components/tabs/TabList';
import {layoutTabs} from '../utils/layoutTabs';
import ButtonContainer from '../components/general/ButtonContainer';
import Button from '../components/general/Button';
import {loadDataFromServer, PUT} from '../utils/fetch';
import {Store} from 'react-notifications-component';
import {getBackendUrl} from '../utils/backend';

const LayoutNavbar = () => {
    const dataUrl = getBackendUrl();
    const [items, setItems] = useState([]);

    const addItem = () => {
        let id = 0;
        for (let i = 0; i < items.length; i++) {
            if (items[i].id > id) id = items[i].id;
        }
        id++;

        setItems(prev => [...prev, {id: id, text: 'Text', href: '/'}]);
    };

    useEffect(() => {
        loadDataFromServer('layoutNavbar', (v) => {
            const navbar = v['navbar'];
            setItems(navbar.map((item, index) => ({id: index, text: item.text, href: item.href})));
        }, dataUrl, {});
    }, []);

    const save = async () => {
        const data = await PUT({url: `${dataUrl}layoutNavbar/`, body: items});
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

    const deleteElement = (index) => {
        setItems(prev => prev.filter((item, i) => i !== index));
    };

    return (
        <AdminContent>
            <div className={'layoutNavbar'}>
                <PageHeading>Navbar</PageHeading>

                <TabList tabs={layoutTabs} current={0}/>
                <GridContainer>
                    <GridColumn>
                        <GridBox>
                            <GridBoxHeader>
                                <GridBoxHeading>Navbar-Elemente</GridBoxHeading>
                            </GridBoxHeader>

                            <ReactSortable list={items} setList={setItems} handle={'.handle'}>
                                {items.map((item, index) => (
                                    <div key={index} className={'layoutNavbar__navbarItem noTextSelect'}>
                                        <div className={'layoutNavbar__navbarItem__actions'}>
                                            <FaArrowsAlt className={'handle'}/>
                                            <FaTrashAlt style={{marginTop: '10px', cursor: 'pointer'}} onClick={() => deleteElement(index)}/>
                                        </div>
                                        <div className={'layoutNavbar__navbarItem__content'}>
                                            <TextInput labelText={'Text'} state={item.text} setState={(v) => {
                                                setItems(prev => prev.map(i => {
                                                    return i.id === item.id ? {
                                                        ...i,
                                                        text: v
                                                    } : i;
                                                }));
                                            }}/>
                                            <TextInput labelText={'URL'} state={item.href} setState={(v) => {
                                                setItems(prev => prev.map(i => {
                                                    return i.id === item.id ? {
                                                        ...i,
                                                        href: v
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
                    <Button onClick={addItem}>Eintrag hinzufügen</Button>
                    <Button onClick={save}>Speichern</Button>
                </ButtonContainer>
            </div>
        </AdminContent>
    );
};

export default LayoutNavbar;
