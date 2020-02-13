import React, { Component } from 'react'
import './preview.css'
import { connect } from 'react-redux'

class Preview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fpsValue: 10,
            maxFps: 16,
            minFps: 1,
        }

        this.frameCounter = 0;
        this.animationPlayer = null;
    }

    componentDidMount() {
        this.refs.previewCanvas.width = this.props.previewCanvasSize;
        this.refs.previewCanvas.height = this.props.previewCanvasSize;
        this.animationPlayer = this.startAnimation(1000 / this.state.fpsValue);
    }

    startAnimation(dalay) {
        return setInterval(this.changeFrame.bind(this), dalay);
    }

    changeFrame() {
        const img = new Image(this.props.previewCanvasSize, this.props.previewCanvasSize);
        img.src = this.props.bufferArray[this.frameCounter].dataURL;
        const ctx = this.refs.previewCanvas.getContext('2d')
        ctx.clearRect(0, 0, this.props.previewCanvasSize, this.props.previewCanvasSize);
        ctx.drawImage(img, 0, 0, this.props.previewCanvasSize, this.props.previewCanvasSize);

        if(this.frameCounter >= this.props.bufferArray.length - 1) this.frameCounter = 0;
        else this.frameCounter += 1;
    }

    changeFps(value) {
        this.setState({
            fpsValue: value,
        })
    }

    render() {
        return (
            <div className='preview'>
                <div className='preview__inner'>
                    <div className='preview__screen'
                        style={{ width: this.props.previewCanvasSize, height: this.props.previewCanvasSize }}>
                        <canvas className='preview__canvas' ref='previewCanvas'></canvas>
                    </div>
                    <div className='preview__fps-controller'>
                        <input type='range' id='fps-controller'
                            defaultValue={this.state.fpsValue}
                            max={this.state.maxFps}
                            min={this.state.minFps}
                            step={1}
                            onInput={ (e) => {
                                this.changeFps(e.nativeEvent.target.value);
                                clearInterval(this.animationPlayer);
                                this.animationPlayer = this.startAnimation(1000 / this.state.fpsValue);
                            }}> 
                        </input>
                        <label htmlFor='fps-controller' className='preview__fps-view'>
                            FPS: <span>{this.state.fpsValue}</span>
                        </label>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        previewCanvasSize: state.sizeStore.previewCanvasSize,
        bufferArray: state.imageDataStore,
    }),
    (dispatch) => ({
        
    })
)(Preview)