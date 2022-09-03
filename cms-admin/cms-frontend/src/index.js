import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {AdminData} from './components/data/AdminData';
import 'react-notifications-component/dist/theme.css';
//import 'tinymce/skins/content/default/content.min.css';

ReactDOM.render(
    <React.StrictMode>
        <AdminData>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </AdminData>
    </React.StrictMode>,
    document.getElementById('root')
);
