import React, { Component } from 'react';
import './app.css'
import FrameBar from './components/frameBar/FrameBar'
import ToolBar from './components/toolBar/ToolBar'
import SideBar from './components/sideBar/SideBar'
import Header from './components/header/Header'
import Painter from './components/painter/Painter'
import Preview from './components/preview/Preview'
import ColorPanel from './components/colorPanel/colorPanel'
import Landing from './components/landing/Landing'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

document.addEventListener('DOMContentLoaded', function() {
  let elems = document.querySelectorAll('.modal');
  if(window.M) {
    window.M.Modal.init(elems);
  }
});

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact component={Landing} />
          <Route path='/app'>
            <div className='app grey lighten-2'>
              <Header />
              <ToolBar />
              <Painter />
              <FrameBar />
              <Preview />
              <SideBar />
              <ColorPanel />
            </div>
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App
