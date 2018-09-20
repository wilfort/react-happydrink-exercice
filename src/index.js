import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
    <App title = "HappyDrink"
     color = "green"/>,
    document.getElementById('root')
);
registerServiceWorker();
