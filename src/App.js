import React, { Component } from 'react';
import './main.css'
import FrameBar from './components/frameBar/FrameBar'
import ToolBar from './components/toolBar/ToolBar'
import SideBar from './components/sideBar/SideBar'
import Header from './components/header/Header'
import Painter from './components/painter/Painter'
import Preview from './components/preview/Preview'
import toolList from './components/toolBar/toolList'

class App extends Component{
  state = {
    currentTool: toolList[0].name,
    currentColor: 'rgba(244, 67, 54, 255)',
    prevColor: 'rgba(0, 17, 255, 255)',

  }

  setCurrentTool = (tool) => {
    this.setState({ currentTool: tool });
  }

  render() {
    return (
    <div className='app grey lighten-2'>
      <Header />
      <ToolBar setCurrentTool={ this.setCurrentTool }
        currentColor={ this.state.currentColor }
        prevColor={ this.state.prevColor } />
      <Painter currentTool={ this.state.currentTool }
        currentColor={ this.state.currentColor }
        prevColor={ this.state.prevColor } />
      <FrameBar />
      <Preview />
      <SideBar />
    </div>
    )}
}

export default App
