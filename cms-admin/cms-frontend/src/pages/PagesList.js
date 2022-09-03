import React, {useContext} from 'react';
import AdminContent from '../components/general/AdminContent';
import PageHeading from '../components/general/PageHeading';
import {AdminContext} from '../components/data/AdminData';
import Page from '../components/pagesList/Page';
import Button from '../components/general/Button';
import {useHistory} from 'react-router-dom';
import ButtonContainer from '../components/general/ButtonContainer';
import {DELETE} from '../utils/fetch';
import {getBackendUrl} from '../utils/backend';

const PagesList = () => {
    const {pagesData, setPagesData} = useContext(AdminContext);
    const dataUrl = getBackendUrl();
    const history = useHistory();

    const createPage = () => {
        history.push('/pages/-1');
    };

    const deletePage = async (id) => {
        await DELETE({url: `${dataUrl}page/?id=${id}`});
        setPagesData(prev => prev.filter(page => page.id !== id));
    };
    return (
        <AdminContent>
            <div className={'pagesList'}>
                <PageHeading>Seiten</PageHeading>

                Es sind {(pagesData != null && pagesData.length > 0) ?
                    pagesData.length :
                    'keine'} Seiten vorhanden

                {pagesData != null && pagesData.map((page, index) => (
                    <Page key={index}
                          page={page}
                          deletePage={() => deletePage(page.id)}/>
                ))}

                <ButtonContainer>
                    <Button onClick={createPage}>Seite erstellen</Button>
                </ButtonContainer>
            </div>
        </AdminContent>
    );
};

export default PagesList;
