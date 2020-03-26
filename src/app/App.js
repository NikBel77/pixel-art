import React, { Component } from 'react'
import './app.css'
import AppInner from './components/AppInner'
import Landing from './components/landing/Landing'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

document.addEventListener('DOMContentLoaded', function() {
  let elems = document.querySelectorAll('.modal');
  if (window.M) {
      window.M.Modal.init(elems);
  }
});
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact component={Landing} />
          <Route path='/:frame' component={AppInner} />
        </Switch>
      </Router>
    )
  }
}

export default App
