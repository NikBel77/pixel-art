import React, { Component } from 'react'
import './painter.css'
import canvasEventList from './canvasEventList';

class Painter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            canvasSize: {
                width: 512,
                height: 512,
                scale: 8,
                penSize: 1,
            },
            coords: {
                x: 0,
                y: 0,
            },
        }
    }
    
    componentDidMount() {
        this.refs.shadow.addEventListener('mousedown', (e) => { 
            e.target.style.display = 'none';
            this.refs.mainCanvas.dispatchEvent(new MouseEvent('mousedown', e));
            this.refs.mainCanvas.dispatchEvent(new MouseEvent('click', e));
        });
    }

    componentWillUpdate(props) {
        if(props.currentTool !== this.refs.mainCanvas.dataset.tool) {
            console.log('changed tool');
            this.setCanvasEvents(props.currentTool);
            this.refs.mainCanvas.dataset.tool = props.currentTool;
        }
        return true;
    }

    setCanvasEvents(tool) {
        if(!canvasEventList[tool]) throw Error('no events in list: check canvasEventsList.js');

        const canvas = this.refs.mainCanvas;
        const list = canvasEventList[tool];
        const events = Object.keys(list);

        events.forEach(event => {
            canvas.addEventListener(event, list[event]);
        });
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

        this.refs.shadow.style.top = `${y * this.state.canvasSize.scale}px`;
        this.refs.shadow.style.left = `${x * this.state.canvasSize.scale}px`;
    }

    getCoordsFromOffset(offsetX, offsetY) {
        const x = Math.floor(offsetX / this.state.canvasSize.scale);
        const y = Math.floor(offsetY / this.state.canvasSize.scale);
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
                    style={{width: `${this.state.canvasSize.width}px`,
                        height: `${this.state.canvasSize.height}px`}}
                    onMouseEnter={() => { this.refs.shadow.style.display = 'Block' }}
                    onMouseLeave={() => { this.refs.shadow.style.display = 'none' }}
                    onMouseMove={ this.checkShadow }>

                    <canvas className='canvas' ref='mainCanvas' data-tool={null}
                        style={{width: `${this.state.canvasSize.width}px`,
                            height: `${this.state.canvasSize.height}px`}}
                        onMouseMove={(e) => { this.updateCoords(e.nativeEvent) }}>
                    </canvas>

                    <div className='painter__coords painter__coords-rigth-side'
                        ref='coordsScreen' onMouseEnter={(e) => { this.toggleCoordsSide(e.target) }}>
                        X : {this.state.coords.x} Y : {this.state.coords.y} Tool : {this.props.currentTool}
                    </div>

                    <div className='painter__shadow'
                        style={{width: `${this.state.canvasSize.scale}px`,
                            height: `${this.state.canvasSize.scale}px`,
                            display: 'none'}}
                        ref='shadow'
                    ></div>
                </div>
            </div>
        )
    }
}

export default Painter;