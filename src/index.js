import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import Admin from './components/admin';
import registerServiceWorker from './registerServiceWorker';

const rootElement = document.getElementById('root');
console.log(rootElement);
if (rootElement) {
    ReactDOM.render(<App />, rootElement);
} else {
    console.log( document.getElementById('root-admin'));
    ReactDOM.render(<Admin />, document.getElementById('root-admin'));
}

registerServiceWorker();
