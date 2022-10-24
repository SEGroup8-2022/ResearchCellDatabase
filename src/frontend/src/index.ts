import { mount } from 'redom';
import './public/styles/main.scss';
import './public/assets/favicon.ico';

import App from './App';

window.addEventListener('load', _event => {
    mount(document.body, new App())
});
