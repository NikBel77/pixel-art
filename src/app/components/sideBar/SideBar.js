import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './side.css'
import UPNG from 'upng-js'
import download from 'downloadjs'

class SideBar extends Component {
    downloadAPNG() {
        const buffer = this.props.bufferArray.map((frame) => frame.imageData.data.buffer);
        const [width, height] = [this.props.canvasSize.width, this.props.canvasSize.height];
        const fps = 10
        const delays = new Array(buffer.length).fill(1000 / fps);
        const cnum = 0;
        const apng = UPNG.encode(buffer, width, height, cnum, delays);

        download(apng, 'simple.apng', 'apng');
    }
    downloadPNG() {
        if (!this.props.bufferArray[this.props.currentFrame].dataURL) return
        const png = this.props.bufferArray[this.props.currentFrame].dataURL;
        download(png, 'simple.png', 'png');
    }

    render() {
        return (
            <div className='side-bar'>
                <Link to='/' className='btn btn-small'>Back</Link>
                <div className='side-bar__settings'>
                    <button className='btn-small'
                        onClick={this.downloadPNG.bind(this)}
                    >download as png</button>
                    <button className='btn-small'
                        onClick={this.downloadAPNG.bind(this)}
                    >download as apng</button>
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        bufferArray: state.imageDataStore,
        currentFrame: state.currentFrameStore,
        canvasSize: state.sizeStore,
    }),
    () => ({})
)(SideBar)