import React, { Component } from 'react';
import './main.css'
import FrameBar from './components/frameBar/FrameBar'
import ToolBar from './components/toolBar/ToolBar'
import SideBar from './components/sideBar/SideBar'
import Header from './components/header/Header'
import Painter from './components/painter/Painter'
import Preview from './components/preview/Preview'

const toolList = {
  pen: 'pen',
  dropper: 'dropper',
  fill: 'fill',
  fillAll: 'fillAll',
  fillAllSame: 'fillAllSame',
  eraser: 'eraser'
}

class App extends Component{
  state = {
    currentTool: toolList.pen,
  }

  setCurrentTool = (tool) => {
    this.setState({ currentTool: tool });
  }

  render() {
    return (
    <div className='app grey lighten-2'>
      <Header />
      <ToolBar setCurrentTool={ this.setCurrentTool }/>
      <Painter currentTool={ this.state.currentTool }/>
      <FrameBar />
      <Preview />
      <SideBar />
    </div>
    )}
}

export default App;
