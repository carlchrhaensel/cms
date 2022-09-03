/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {loadDataFromServer, POST, PUT} from '../utils/fetch';
import {AdminContext} from '../components/data/AdminData';
import AdminContent from '../components/general/AdminContent';
import PageHeading from '../components/general/PageHeading';
import PageComponent from '../components/pageComponents/PageComponent';
import AddPageComponent from '../components/editPage/AddPageComponent';
import GridContainer from '../components/general/grid/GridContainer';
import GridColumn from '../components/general/grid/GridColumn';
import GridBox from '../components/general/grid/GridBox';
import ButtonContainer from '../components/general/ButtonContainer';
import Button from '../components/general/Button';
import PcH1 from '../components/pageComponents/PcH1';
import TextInput from '../components/input/TextInput';
import GridBoxHeader from '../components/general/grid/GridBoxHeader';
import GridBoxHeading from '../components/general/grid/GridBoxHeading';
import {Store} from 'react-notifications-component';
import {ReactSortable} from 'react-sortablejs';
import {FaArrowsAlt, FaTrashAlt} from 'react-icons/fa';
import {getBackendUrl} from '../utils/backend';

const EditPage = () => {
    const {id} = useParams();
    const dataUrl = getBackendUrl();
    const {setPagesData} = useContext(AdminContext);
    const [pageData, setPageData] = useState({title: '', url: ''});
    const history = useHistory();

    useEffect(() => {
        console.log('page load data');
        if (parseInt(id) === -1) {
            setPageData({
                title: 'Seitentitel',
                url: '/newPage/',
                content: [{type: 'text', content: 'Seiteninhalt'}],
            });

            return;
        }

        loadDataFromServer('page', (v) => {
            let page = v.page;
            if (page.url === "") page.url = "/";
            setPageData(page);
        }, dataUrl, {'id': id});

        return () => {
            setPageData({title: '', url: ''});
        };
    }, []);

    const appendComponent = (type, defaultContent) => {
        setPageData(prev => ({
            ...prev,
            content: [...prev.content, {type: type, content: defaultContent}]
        }));
    };

    const save = async () => {
        if (pageData.url.length < 1 || pageData.title.length === 0) {
            Store.addNotification({
                title: 'Fehler',
                message: 'Bitte geben Sie eine URL und einen Titel an',
                type: 'danger',
                insert: 'top',
                container: 'top-right',
                animationIn: ['animate__animated', 'animate__fadeIn'],
                animationOut: ['animate__animated', 'animate__fadeOut'],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });
            return;
        }

        // TODO check if url already exists?

        if (parseInt(id) === -1) {
            // create new page
            const newPage = {
                title: pageData.title,
                url: pageData.url,
                content: pageData.content
            };
            const data = await POST({url: `${dataUrl}page/`, body: newPage});
            if (data.success === 'success') {
                setPagesData(prev => [...prev, {id: data.page.id, title: data.page.title, url: data.page.url}]);
            } else {
                Store.addNotification({
                    title: 'Fehler',
                    message: 'Möglicherweise ist die URL bereits in benutzung',
                    type: 'danger',
                    insert: 'top',
                    container: 'top-right',
                    animationIn: ['animate__animated', 'animate__fadeIn'],
                    animationOut: ['animate__animated', 'animate__fadeOut'],
                    dismiss: {
                        duration: 5000,
                        onScreen: true
                    }
                });

                return;
            }
        } else {
            // save changes
            const updPage = {
                title: pageData.title,
                url: pageData.url,
                content: pageData.content
            };

            let data = await PUT({url: `${dataUrl}page/?id=${id}`, body: updPage});
            if (data.success === 'success') {
                delete data.page.content;
                setPagesData(prev => {
                    return prev.map(i => {
                        return parseInt(i.id) === parseInt(id) ? data.page : i;
                    });
                });
            } else {
                Store.addNotification({
                    title: 'Fehler',
                    message: 'Möglicherweise ist die URL bereits in benutzung',
                    type: 'danger',
                    insert: 'top',
                    container: 'top-right',
                    animationIn: ['animate__animated', 'animate__fadeIn'],
                    animationOut: ['animate__animated', 'animate__fadeOut'],
                    dismiss: {
                        duration: 5000,
                        onScreen: true
                    }
                });

                return;
            }
        }

        history.push('/pages/');
    };

    const deleteElement = (index) => {
        setPageData(prev => ({
            ...prev,
            content: prev.content.filter((item, i) => i !== index)
        }));
    };

    return (
        <AdminContent>
            <div className={'editPage'}>
                <PageHeading>Seite {parseInt(id) !== -1 ? 'bearbeiten' : 'erstellen'}</PageHeading>

                <GridContainer>
                    <GridColumn>
                        <GridBox>
                            <GridBoxHeader>
                                <GridBoxHeading>Seitentitel</GridBoxHeading>
                            </GridBoxHeader>
                            <PcH1 setContent={(newTitle) => {
                                setPageData(prev => {
                                    prev.title = newTitle;
                                    return prev;
                                });
                            }} initialState={pageData.title}/>
                        </GridBox>

                        <GridBox>
                            <GridBoxHeader>
                                <GridBoxHeading>Seiteneinstellungen</GridBoxHeading>
                            </GridBoxHeader>
                            <TextInput state={pageData.url}
                                       setState={(url) => {
                                           setPageData((prev) => {
                                               if (!url.startsWith('/')) url = `/${url}`;
                                               return ({...prev, url: url});
                                           });
                                       }}
                                       placeholder={'URL'}
                                       labelText={'URL:'}/>
                        </GridBox>
                        <GridBox>
                            {Array.isArray(pageData.content) &&
                                <ReactSortable list={pageData.content} setList={(content) => {
                                    setPageData((prevState) => ({...prevState, content: content}));
                                }} handle={'.handle'}>
                                    {pageData.content && pageData.content.map((item, index) => {
                                        const setContent = (newContent) => {
                                            setPageData(prev => {
                                                prev.content[index].content = newContent;
                                                return prev;
                                            });
                                        };

                                        return (
                                            <div key={index} className={'editPage__pageComponent'}>
                                                <div>
                                                    <FaArrowsAlt className={'handle'}/>
                                                    <FaTrashAlt style={{marginTop: '10px', cursor: 'pointer'}}
                                                                onClick={() => deleteElement(index)}/>
                                                </div>
                                                <PageComponent type={item.type}
                                                               content={item.content}
                                                               setContent={setContent}/>
                                            </div>
                                        );
                                    })}
                                </ReactSortable>}

                        </GridBox>
                    </GridColumn>
                </GridContainer>

                <AddPageComponent addComponent={appendComponent}/>

                <ButtonContainer>
                    <Button onClick={save}>
                        Speichern
                    </Button>
                </ButtonContainer>
            </div>
        </AdminContent>
    );
};

export default EditPage;
