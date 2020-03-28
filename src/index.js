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

ReactDOM.render((
    <Provider store={ store }>
        {isSupported ? (
            <App />
        ) : (
            <Error />
        )}
    </Provider>
), document.getElementById('root'));
