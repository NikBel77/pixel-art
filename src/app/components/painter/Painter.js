import React, { Component } from 'react'
import './painter.css'
import canvasEventList from './canvasEventList'
import { connect } from 'react-redux'

class Painter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            coords: {
                x: 0,
                y: 0,
                top: 0,
                left: 0,
            },
        }
        this.activeTool = this.props.activeTool;
        this.activeFrame = this.props.currentFrame;
    }
    
    componentDidMount() {
        this.bindEvents(canvasEventList);
        this.refs.shadow.addEventListener('mousedown', (e) => {
            e.preventDefault(); 
            e.target.style.display = 'none';
            this.refs.mainCanvas.dispatchEvent(new MouseEvent('mousedown', e));
        });
        this.refs.shadow.addEventListener('mouseup', (e) => {
            this.refs.mainCanvas.dispatchEvent(new MouseEvent('mouseup', e));
        });
        document.body.addEventListener('contextmenu', (e) => e.preventDefault());
        this.refs.mainCanvas.width = this.props.canvasSize.width;
        this.refs.mainCanvas.height = this.props.canvasSize.height;
        this.toggleCanvasEvents(this.activeTool);
        this.props.addNextDataUrl(this.refs.mainCanvas.toDataURL(), this.props.currentFrame);
    }

    shouldComponentUpdate(nextProps) {
        if(this.activeFrame !== nextProps.currentFrame) {
            const ctx = this.refs.mainCanvas.getContext('2d')
            const imgData = ctx.getImageData(0, 0, this.props.canvasSize.width, this.props.canvasSize.height);

            this.props.saveImageData(imgData, this.activeFrame);
            ctx.putImageData(this.props.bufferArray[nextProps.currentFrame].imageData, 0, 0);
            this.activeFrame = nextProps.currentFrame;
        }
        if(nextProps.activeTool !== this.activeTool) {
            this.toggleCanvasEvents(this.activeTool, true);
            this.toggleCanvasEvents(nextProps.activeTool);
            this.activeTool = nextProps.activeTool;
        }
        return true;
    }

    bindEvents(eventList) {
        if(typeof eventList !== 'object') throw Error('event list must be an object');

        Object.keys(eventList).forEach((tool) => {
            if (typeof eventList[tool] !== 'object') throw Error('every item in event list must be an object');

            Object.keys(eventList[tool]).forEach((event) => {
                if (typeof eventList[tool][event] !== 'function') throw Error('event must by a function');
                eventList[tool][event] = eventList[tool][event].bind(this);
            });
        });
    }

    toggleCanvasEvents(tool, isRemove = false) {
        if(!tool) return;
        if(!canvasEventList[tool]) throw Error('no events in list: check canvasEventsList.js');

        const canvas = this.refs.mainCanvas;
        const list = canvasEventList[tool];
        const events = Object.keys(list);

        if(isRemove) {
            events.forEach(event => {
                canvas.removeEventListener(event, list[event]);
            });
        } else {
            events.forEach(event => {
                canvas.addEventListener(event, list[event]);
            });
        }
    }

    updateCoords(x, y) {
        if(this.state.coords.x === x && this.state.coords.y === y) return;
        this.setState({
            coords: {
                x: x,
                y: y,
                top: ((y * this.props.canvasSize.scale) -
                    (Math.floor(this.props.canvasSize.penSize / 2) * this.props.canvasSize.scale)),
                left: ((x * this.props.canvasSize.scale) -
                    (Math.floor(this.props.canvasSize.penSize / 2) * this.props.canvasSize.scale)),
            }
        });
    }

    getCoordsFromOffset(offsetX, offsetY) {
        const x = Math.floor(offsetX / this.props.canvasSize.scale);
        const y = Math.floor(offsetY / this.props.canvasSize.scale);
        return [x >= 0 ? x : 0, y >= 0 ? y : 0];
    }

    toggleCoordsSide(elem) {
        if(elem.classList.contains('painter__coords-rigth-side')) {
            elem.classList.remove('painter__coords-rigth-side');
            elem.classList.add('painter__coords-left-side');
        }
        else if (elem.classList.contains('painter__coords-left-side')) {
            elem.classList.remove('painter__coords-left-side');
            elem.classList.add('painter__coords-rigth-side');
        }
    }

    checkShadow = (e) => {
        if(e.nativeEvent.which) return;
        if (this.refs.shadow.style.display === 'block') return;
        this.refs.shadow.style.display = 'block';
    }

    render() {
        return (
            <div className='painter'>

                <div className='painter__inner z-depth-4'
                    style={{width: `${this.props.canvasSize.width}px`,
                        height: `${this.props.canvasSize.height}px`}}
                    onMouseEnter={() => { this.refs.shadow.style.display = 'Block' }}
                    onMouseLeave={() => { this.refs.shadow.style.display = 'none' }}
                    onMouseMove={ this.checkShadow }
                    ref='wrapper'>

                    <canvas className='canvas' ref='mainCanvas'
                        data-tool={null}
                        onMouseMove={(e) => { 
                            this.updateCoords(...this.getCoordsFromOffset(e.nativeEvent.offsetX, e.nativeEvent.offsetY)) 
                        }}
                        onMouseUp={(e) => { this.props.addNextDataUrl(e.target.toDataURL(), this.props.currentFrame) }}>
                    </canvas>

                    <div className='painter__coords painter__coords-rigth-side'
                        ref='coordsScreen' onMouseEnter={(e) => { this.toggleCoordsSide(e.target) }}>
                        X : {this.state.coords.x} Y : {this.state.coords.y} Tool : {this.props.activeTool}
                    </div>

                    <div className='painter__shadow'
                        style={{width: `${this.props.canvasSize.scale * this.props.canvasSize.penSize}px`,
                            height: `${this.props.canvasSize.scale * this.props.canvasSize.penSize}px`,
                            top: `${this.state.coords.top}px`,
                            left: `${this.state.coords.left}px`,
                            display: 'none'}}
                        ref='shadow'
                        onMouseMove={(e) => {
                            let [x, y] = this.getCoordsFromOffset(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                            const middle = Math.floor(this.props.canvasSize.penSize / 2);
                            if (x !== middle || y !== middle) {
                                this.updateCoords(this.state.coords.x + (x - middle), this.state.coords.y + (y - middle));
                            }
                        }}
                    ></div>
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        mainColor: state.colorStore.mainColor,
        auxColor: state.colorStore.auxColor,
        initialColor: state.colorStore.initialColor,
        activeTool: state.toolStore.activeTool,
        canvasSize: state.sizeStore,
        currentFrame: state.currentFrameStore,
        bufferArray: state.imageDataStore,
    }),
    (dispatch) => ({
        saveImageData: (imageData, number) => {
            dispatch({ type: 'CHANGE_IMAGE_DATA', imageData, number })
        },
        addNextDataUrl: (dataURL, number) => {
          dispatch({ type: 'CHANGE_DATA_URL', dataURL, number });
        }
    })
)(Painter);