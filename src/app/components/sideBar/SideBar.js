import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './side.css'
import UPNG from 'upng-js'
import download from 'downloadjs'
import { convertImgData } from '../../../service'

const modalApngId = 'modal-apng';
const modalPngId = 'modal-png';
const canvasId = 'main-canvas';
const previewCnavasId = 'preview-canvas';

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

        download(apng, `${filename}.apng`, 'apng');
    }

    downloadPNG(filename) {
        if (!this.props.bufferArray[this.props.currentFrame].dataURL) return
        const png = this.props.bufferArray[this.props.currentFrame].dataURL;
        download(png, `${filename}.png`, 'png');
    }

    async upload() {
        const promiseArray = this.handleFiles(this.refs.in.files);
        const files = await Promise.all(promiseArray);
        const buffer = files.map((img) => {
            return this.extractImageData(img);
        });
        if (!buffer || !buffer.length) return
        this.props.setActiveFrame(0);
        this.props.setBuffer(buffer);
        
        document.getElementById(canvasId).dispatchEvent(new Event('refrash'));
        document.getElementById(previewCnavasId).dispatchEvent(new Event('refrash'));
    }

    extractImageData(img) {
        if (!img.src) return
        const canvas = document.createElement('canvas');
        const [width, height, scale] = [
            this.props.canvasSize.width, this.props.canvasSize.height, this.props.canvasSize.scale
        ];
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const imageData = convertImgData(ctx.getImageData(0, 0, width, height), { width, height, scale });
        ctx.putImageData(imageData, 0, 0);
        const dataURL = canvas.toDataURL();

        return { imageData, dataURL };
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

                <div className='side-bar__settings'>
                    <Link to='/' className='btn side-bar__settings-btn'>Back</Link>
                    <button data-target={modalPngId}
                        className="btn modal-trigger side-bar__settings-btn"
                    >save as png</button>
                    <button data-target={modalApngId}
                        className="btn modal-trigger side-bar__settings-btn"
                    >save as apng</button>
                    <div className='side-bar__settings-btn'>
                        <input ref='in' type='file' style={{ display: 'none' }}
                            id='uploader' onChange={this.upload.bind(this)}
                            multiple accept="image/*"
                        />
                        <label htmlFor='uploader' className='btn'>upload files</label>
                    </div>
                    
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
    (dispatch) => ({
        setBuffer: (buffer) => {
            dispatch({ type: 'SET_BUFFER_ARRAY', buffer })
        },
        setActiveFrame: (number) => {
            dispatch({ type: 'CHANGE_CURRENT_FRAME', number });
        },
    })
)(SideBar)