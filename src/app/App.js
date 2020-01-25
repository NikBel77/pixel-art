import React, { Component } from 'react';
import './app.css'
import FrameBar from './components/frameBar/FrameBar'
import ToolBar from './components/toolBar/ToolBar'
import SideBar from './components/sideBar/SideBar'
import Header from './components/header/Header'
import Painter from './components/painter/Painter'
import Preview from './components/preview/Preview'

class App extends Component{
  render() {
    return (
    <div className='app grey lighten-2'>
      <Header />
      <ToolBar />
      <Painter />
      <FrameBar />
      <Preview />
      <SideBar />
    </div>
    )}
}

export default App
