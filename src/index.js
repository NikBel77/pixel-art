import React from 'react'
import ReactDOM from 'react-dom'
import './main.css'
import App from './app/App'
import Error from './app/components/Error/Error'
import { Provider } from 'react-redux'
import { store } from './store'
import { checkBrowser } from './utils/service'

const browserSuportedList = [
    'firefox', 'safari', 'chrome'
]
const browserMap = checkBrowser();
const isSupported = browserSuportedList.some(bw => browserMap.get(bw));

document.addEventListener('DOMContentLoaded', function() {
    let elems = document.querySelectorAll('.modal');
    if (window.M) {
        window.M.Modal.init(elems);
    }
});
ReactDOM.render((
    <Provider store={ store }>
        {isSupported ? (
            <App />
        ) : (
            <Error />
        )}
    </Provider>
), document.getElementById('root'));
