import React from 'react';
import {FaEdit, FaTrashAlt} from 'react-icons/fa';
import {useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';

const Page = ({page, deletePage}) => {
    const history = useHistory();

    if (page == null) return null;

    return (
        <div className={'page'}>
            <div className={'page__info'}>
                <p className={'page__info__title'}><span>Titel:</span>{page.title}</p>
                <p className={'page__info__url'}><span>URL:</span>{page.url === '' ? 'Startseite' : page.url}</p>
            </div>

            <div className={'page__actions'}>
                <FaTrashAlt onClick={deletePage}/>
                <FaEdit onClick={() => {
                    history.push(`/pages/${page.id}`);
                }}/>
            </div>
        </div>
    );
};

Page.defaultProps = {
    page: null,
    deletePage: () => {
    }
};

Page.propTypes = {
    page: PropTypes.object,
    deletePage: PropTypes.func
};

export default Page;
