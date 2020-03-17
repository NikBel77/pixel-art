import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './side.css'
import UPNG from 'upng-js'
import download from 'downloadjs'

const modalApngId = 'modal-apng';
const modalPngId = 'modal-png'

function Modal(props) {
    return (
        <div id={props.modalId} className="modal">
            <div className="modal-content">
                <div className="input-field">
                    <input id={props.inputId} type="text" data-length="10" />
                    <label htmlFor={props.inputId}>Enter file name</label>
                </div>
                <button className="modal-close btn-small"
                    onClick={() => {
                        const input = document.getElementById(props.inputId);
                        props.save(input.value);
                        input.value = '';
                    }}
                >Save</button>
            </div>
        </div>
    )
}

class SideBar extends Component {
    downloadAPNG(filename) {
        const buffer = this.props.bufferArray.map((frame) => frame.imageData.data.buffer);
        const [width, height] = [this.props.canvasSize.width, this.props.canvasSize.height];
        const fps = this.props.fps;
        const delays = new Array(buffer.length).fill(1000 / fps);
        const cnum = 0;
        const apng = UPNG.encode(buffer, width, height, cnum, delays);

        download(apng, `${filename}.png`, 'apng');
    }
    downloadPNG(filename) {
        if (!this.props.bufferArray[this.props.currentFrame].dataURL) return
        const png = this.props.bufferArray[this.props.currentFrame].dataURL;
        download(png, `${filename}.png`, 'png');
    }
    async upload() {
        const promiseArray = this.handleFiles(this.refs.in.files);
        const files = await Promise.all(promiseArray);
        console.log(files)
    }

    handleFiles(files) {
        const result = [];
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            if (!file.type.startsWith('image/')) continue;

            let img = document.createElement("img");
            img.file = file;

            let reader = new FileReader();
            const promise = new Promise(resolve => {
                reader.onload = (e) => {
                    img.src = e.target.result;
                    resolve(img);
                }
            });
            reader.readAsDataURL(file);
            result.push(promise);
        }
        return result;
    }

    render() {
        return (
            <div className='side-bar'>
                <Link to='/' className='btn btn-small'>Back</Link>
                <div className='side-bar__settings'>
                    <button data-target={modalPngId} className="btn modal-trigger">save as png</button>
                    <button data-target={modalApngId} className="btn modal-trigger">save as apng</button>
                </div>
                <div>
                    <input ref='in' type='file' style={{ display: 'none' }}
                        id='uploader' onChange={this.upload.bind(this)}
                    />
                    <label htmlFor='uploader' className='btn'>upload file</label>
                </div>
                <Modal modalId={modalPngId} inputId='input-1' format='.png'
                    save={this.downloadPNG.bind(this)}
                />
                <Modal modalId={modalApngId} inputId='input-2' format='.apng'
                    save={this.downloadAPNG.bind(this)}
                />
            </div>
        )
    }
}

export default connect(
    (state) => ({
        bufferArray: state.imageDataStore,
        currentFrame: state.currentFrameStore,
        canvasSize: state.sizeStore,
        fps: state.sizeStore.previewFps,
    }),
    () => ({})
)(SideBar)