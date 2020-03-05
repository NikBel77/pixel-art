import React, { Component } from 'react'
import './frame.css'
import { connect } from 'react-redux'

class FrameBar extends Component {
    render() {
        return (
            <div className='frame-bar'>
                <div className='frame-bar__frame-wrapper'>
                    {this.props.bufferArray.map((data, i) => {
                        return (
                        <div key={i}
                            className={i === this.props.currentFrame
                                ? 'frame-bar__frame frame-bar__frame-active' : 'frame-bar__frame'}
                            onClick={() => { this.props.setActiveFrame(i) }}>
                            <img className='frame-bar__img' src={data.dataURL}></img>
                            <div className='frame-bar__number'>{i + 1}</div>
                        </div>
                        )
                    })}
                </div>
                <button className='btn' onClick={ this.props.addFrame }>Add Frame</button>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        bufferArray: state.imageDataStore,
        currentFrame: state.currentFrameStore,
    }),
    (dispatch) => ({
        setActiveFrame: (number) => {
            dispatch({ type: 'CHANGE_CURRENT_FRAME', number });
        },
        addFrame: () => {
            dispatch({ type: 'ADD_FRAME' });
        }
    })
)(FrameBar)