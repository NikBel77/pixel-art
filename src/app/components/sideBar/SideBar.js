import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './side.css'

class SideBar extends Component {
    download() {
        const el = document.createElement('a');
        if(!this.props.bufferArray[this.props.currentFrame].dataURL) return
        el.setAttribute('href', this.props.bufferArray[this.props.currentFrame].dataURL);
        el.setAttribute('download', 'first.png');
      
        el.style.display = 'none';
        document.body.appendChild(el);
      
        el.click();
      
        document.body.removeChild(el);
    }

    render() {
        return (
            <div className='side-bar'>
                <Link to='/' className='btn btn-small'>Back</Link>
                <div className='side-bar__settings'>
                    <button className='btn-small'
                        onClick={ this.download.bind(this) }
                    >download as png</button>
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        bufferArray: state.imageDataStore,
        currentFrame: state.currentFrameStore,
    }),
    () => ({})
)(SideBar)