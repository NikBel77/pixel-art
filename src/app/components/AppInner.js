import React, { Component } from 'react'
import { connect } from 'react-redux'

import FrameBar from './frameBar/FrameBar'
import ToolBar from './toolBar/ToolBar'
import SideBar from './sideBar/SideBar'
import Header from './header/Header'
import Painter from './painter/Painter'
import Preview from './preview/Preview'
import ColorPanel from './colorPanel/colorPanel'
import { importLocalImages } from '../../utils/import'

import image from '../../assets/images/f.png'

const canvasId = 'main-canvas';
const previewCnavasId = 'preview-canvas';

class AppInner extends Component {
    componentDidMount() {
        const frame = this.props.match.params.frame;
        const { width, height, scale } = this.props.canvasSettings;
        // const imgSrcArray = [image, image];
        // importLocalImages(imgSrcArray, { width, height, scale })
        //     .then((buffer) => {
        //         this.props.setBuffer(buffer);
        //         document.getElementById(canvasId).dispatchEvent(new Event('refrash'));
        //         document.getElementById(previewCnavasId).dispatchEvent(new Event('refrash'));
        //     });
    }
    render() {
        return (
            <div className='app'>
                <Header />
                <div className='app__inner'>
                    <ToolBar />
                    <Painter />
                    <FrameBar />
                    <Preview />
                    <SideBar />
                    <ColorPanel />
                </div>
                <button onClick={() => {
                    document.getElementById(canvasId).dispatchEvent(new Event('refrash'));
                    document.getElementById(previewCnavasId).dispatchEvent(new Event('refrash'));
                }}>refrash</button>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        canvasSettings: state.settingsStore,
        bufferArray: state.imageDataStore,
    }),
    (dispatch) => ({
        setBuffer: (buffer) => {
            dispatch({ type: 'SET_BUFFER_ARRAY', buffer });
        }
    })
)(AppInner)