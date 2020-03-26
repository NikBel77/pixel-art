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

import lama1 from '../../assets/images/lama/lama-1.png'
import lama2 from '../../assets/images/lama/lama-2.png'
import lama3 from '../../assets/images/lama/lama-3.png'
import lama4 from '../../assets/images/lama/lama-4.png'
import lama5 from '../../assets/images/lama/lama-5.png'
import lama6 from '../../assets/images/lama/lama-6.png'
import megaman1 from '../../assets/images/megaman/Megaman-1.png'
import megaman2 from '../../assets/images/megaman/Megaman-3.png'
import megaman3 from '../../assets/images/megaman/Megaman-2.png'
import trooper from '../../assets/images/stormtrooper/helmet-1.png'

const imageMap = new Map([
    ['lama', [lama1, lama2, lama3, lama4, lama5, lama6]],
    ['megaman', [megaman1, megaman2, megaman3]],
    ['trooper', [trooper]],
]);
const canvasId = 'main-canvas';
const previewCnavasId = 'preview-canvas';

class AppInner extends Component {
    componentDidMount() {
        let elems = document.querySelectorAll('.modal');
        if (window.M) {
            window.M.Modal.init(elems);
        }
        
        const frame = this.props.match.params.frame;
        const { width, height, scale } = this.props.canvasSettings;
        let imageArray = imageMap.get(frame);
        if (!imageArray) return

        importLocalImages(imageArray, { width, height, scale })
            .then((buffer) => {
                this.props.setBuffer(buffer);
                document.getElementById(canvasId).dispatchEvent(new Event('refrash'));
                document.getElementById(previewCnavasId).dispatchEvent(new Event('refrash'));
            });
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