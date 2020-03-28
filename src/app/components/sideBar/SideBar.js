import React, { Component } from 'react'
import { connect } from 'react-redux'
import './side.css'
import { importImagesByLink } from '../../../utils/import'
import { downloadAPNG, downloadPNG } from '../../../utils/export'

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
                <button
                    className="modal-close btn-small"
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
    render() {
        return (
            <div className='side-bar'>

                <div className='side-bar__settings'>

                    <button data-target={modalPngId}
                        className="btn modal-trigger side-bar__settings-btn">
                        save single frame
                    </button>
                    <button data-target={modalApngId}
                        className="btn modal-trigger side-bar__settings-btn">
                        export as apng
                    </button>
                    <input ref='importFiles' type='file' style={{ display: 'none' }}
                        id='uploader'
                        onChange={() => {
                            const { width, height, scale } = this.props.canvasSettings;
                            importImagesByLink(this.refs.importFiles, { width, height, scale })
                                .then((buffer) => {
                                    this.props.setActiveFrame(0);
                                    this.props.setBuffer(buffer);

                                    document.getElementById(canvasId).dispatchEvent(new Event('refrash'));
                                    document.getElementById(previewCnavasId).dispatchEvent(new Event('refrash'));
                                });
                        }}
                        multiple accept="image/*"
                    />
                    <label htmlFor='uploader' className='side-bar__settings-btn btn'>
                        import files
                    </label>

                </div>
                <Modal modalId={modalPngId} inputId='input-1' format='.png'
                    save={(fileName) => {
                        downloadPNG(this.props.bufferArray, this.props.currentFrame, fileName);
                    }}
                />
                <Modal modalId={modalApngId} inputId='input-2' format='.apng'
                    save={(fileName) => {
                        const { fps, width, height } = this.props.canvasSettings;
                        downloadAPNG(this.props.bufferArray, { fps, width, height }, fileName);
                    }}
                />
            </div>
        )
    }
}

export default connect(
    (state) => ({
        bufferArray: state.imageDataStore,
        currentFrame: state.currentFrameStore,
        canvasSettings: state.settingsStore,
        fps: state.settingsStore.previewFps,
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