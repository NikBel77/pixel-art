import React, { Component } from 'react'
import './painter.css'

class Painter extends Component {
    constructor() {
        super();

        this.state = {
            canvasSize: {
                width: 512,
                height: 512,
                scale: 4,
                penSize: 1,
            },
            coords: {
                x: 0,
                y: 0,
            }
        }
    }

    updateCoords(e) {
        const [x, y] = this.getCoordsFromOffset(e.offsetX, e.offsetY);

        if(this.state.coords.x === x && this.state.coords.y === y) return;

        this.setState(() => ({
            coords:{
                x: x,
                y: y,
            }
        }))

        this.refs.shadow.style.top = `${y * this.state.canvasSize.scale}px`;
        this.refs.shadow.style.left = `${x * this.state.canvasSize.scale}px`;
    }

    getCoordsFromOffset(offsetX, offsetY) {
        const x = Math.floor(offsetX / this.state.canvasSize.scale);
        const y = Math.floor(offsetY / this.state.canvasSize.scale);
        return [x >= 0 ? x : 0, y >= 0 ? y : 0];
    }

    render() {
        return (
            <div className='painter'>
                <div className='painter__inner z-depth-4'
                    style={{width: `${this.state.canvasSize.width}px`,
                        height: `${this.state.canvasSize.height}px`}}
                    onMouseEnter={() => { this.refs.shadow.style.display = 'Block' }}
                    onMouseLeave={() => { this.refs.shadow.style.display = 'none' }}>
                    <canvas className='canvas'
                        style={{width: `${this.state.canvasSize.width}px`,
                            height: `${this.state.canvasSize.height}px`}}
                        onMouseMove={(e) => { this.updateCoords(e.nativeEvent) }}>
                    </canvas>
                    <div className='painter__coords' ref='coordsScreen'>
                        X : {this.state.coords.x} Y : {this.state.coords.y}
                    </div>
                    <div className='painter__shadow'
                        style={{width: `${this.state.canvasSize.scale}px`,
                            height: `${this.state.canvasSize.scale}px`}}
                        ref='shadow'
                    ></div>
                </div>
            </div>
        )
    }
}

export default Painter