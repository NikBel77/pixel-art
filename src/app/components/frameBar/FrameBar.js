import React, { Component } from 'react'
import './frame.css'
import { connect } from 'react-redux'

const previewCnavasId = 'preview-canvas';
const canvasId = 'main-canvas';

class FrameBar extends Component {
    render() {
        return (
            <div className='frame-bar'>
                <div className='frame-bar__frame-wrapper'>
                    {this.props.bufferArray.map((data, i) => {
                        return (
                            <div
                                key={i}
                                className={i === this.props.currentFrame
                                    ? 'frame-bar__frame frame-bar__frame-active' : 'frame-bar__frame'}
                                onClick={() => { this.props.setActiveFrame(i) }}>
                                <img className='frame-bar__img' src={data.dataURL} alt=''></img>
                                <div className='frame-bar__number'>{i + 1}</div>
                                <div className='frame-bar__delete'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (this.props.currentFrame === i
                                            || this.props.bufferArray.length - 1 === this.props.currentFrame) {
                                            this.props.setActiveFrame(0);
                                        }
                                        document.getElementById(previewCnavasId)
                                            .dispatchEvent(new CustomEvent('refrash'));
                                        this.props.deleteFrame(i);

                                        document.getElementById(canvasId)
                                            .dispatchEvent(new CustomEvent('refrash'));
                                        this.forceUpdate();
                                    }}
                                ></div>
                                <div
                                    className='frame-bar__copy'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        document.getElementById(previewCnavasId)
                                            .dispatchEvent(new CustomEvent('refrash'));
                                        this.props.copyFrame(i)
                                        this.forceUpdate();
                                    }}
                                ></div>

                            </div>
                        )
                    })}
                </div>
                <button
                    className='btn'
                    onClick={() => { this.props.addFrame() }}
                >Add Frame</button>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        canvasSize: state.settingsStore,
        bufferArray: state.imageDataStore,
        currentFrame: state.currentFrameStore,
    }),
    (dispatch) => ({
        setActiveFrame: (number) => {
            dispatch({ type: 'CHANGE_CURRENT_FRAME', number });
        },
        addFrame: (cleanFrame) => {
            dispatch({ type: 'ADD_FRAME', cleanFrame });
        },
        deleteFrame: (number) => {
            dispatch({ type: 'DELETE_FRAME', number });
        },
        copyFrame: (number) => {
            dispatch({ type: 'COPY_FRAME', number });
        }
    })
)(FrameBar)