import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App/App.js';
import registerServiceWorker from './registerServiceWorker';

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

registerServiceWorker();
