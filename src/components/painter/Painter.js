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
            },
        }
        this.activeTool = this.props.activeTool
    }
    
    componentDidMount() {
        this.bindEvents(canvasEventList);
        this.refs.shadow.addEventListener('mousedown', (e) => {
            e.preventDefault(); 
            e.target.style.display = 'none';
            this.refs.mainCanvas.dispatchEvent(new MouseEvent('mousedown', e));
        });
        document.body.addEventListener('contextmenu', (e) => e.preventDefault());
        this.refs.mainCanvas.width = this.props.canvasSize.width;
        this.refs.mainCanvas.height = this.props.canvasSize.height;
        this.toggleCanvasEvents(this.activeTool)
    }

    shouldComponentUpdate(nextProps) {
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

    updateCoords(e) {
        const [x, y] = this.getCoordsFromOffset(e.offsetX, e.offsetY);

        if(this.state.coords.x === x && this.state.coords.y === y) return;

        this.setState({
            coords: {
                x: x,
                y: y,
            }
        });

        this.refs.shadow.style.top = `${y * this.props.canvasSize.scale}px`;
        this.refs.shadow.style.left = `${x * this.props.canvasSize.scale}px`;
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

    checkShadow = () => {
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
                    onMouseMove={ this.checkShadow }>

                    <canvas className='canvas' ref='mainCanvas'
                        data-tool={null}
                        onMouseMove={(e) => { this.updateCoords(e.nativeEvent) }}>
                    </canvas>

                    <div className='painter__coords painter__coords-rigth-side'
                        ref='coordsScreen' onMouseEnter={(e) => { this.toggleCoordsSide(e.target) }}>
                        X : {this.state.coords.x} Y : {this.state.coords.y} Tool : {this.props.activeTool}
                    </div>

                    <div className='painter__shadow'
                        style={{width: `${this.props.canvasSize.scale}px`,
                            height: `${this.props.canvasSize.scale}px`,
                            display: 'none'}}
                        ref='shadow'
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
        canvasSize: state.sizeStore
    }),
    {}
)(Painter);