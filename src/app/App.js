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

class App extends Component{

  state = {
    isLandingUp: true
  }

  hideLanding = () => {
    this.setState({
      isLandingUp: false
    })
  }

  showLanding = () => {
    this.setState({
      isLandingUp: true
    })
  }

  render() {
    if(this.state.isLandingUp) {
      return <Landing hideLanding={ this.hideLanding }/>
    } else {
      return (
        <div className='app grey lighten-2'>
          <Header />
          <ToolBar />
          <Painter />
          <FrameBar />
          <Preview />
          <SideBar showLanding={ this.showLanding }/>
          <ColorPanel />
        </div>
      )
    }
  }
}

export default App
