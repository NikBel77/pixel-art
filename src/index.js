import React from 'react'
import ReactDOM from 'react-dom'
import './main.css'
import './assets/materialize/materialize.min.css'
import App from './app/App'
import Landing from './landing/Landing'
import { Provider } from 'react-redux'
import { store } from './store'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

ReactDOM.render((
    <Provider store={ store }>
        <Router>
            <Switch>
                <Route path='/' exact component={ Landing }/>
                <Route path='/app' component={ App }/>
            </Switch>
        </Router>
    </Provider>
), document.getElementById('root'));
