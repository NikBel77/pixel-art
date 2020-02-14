import React, { Component } from 'react'
import './landing.css'
import { Link } from 'react-router-dom';
import { getRandomRgbColor, getRandomCoords, getRandomScale } from '../service'

let timer = null;
const dalay = 1000;
const scale = 10;
const width = window.innerWidth;
const height = window.innerHeight;

class Landing extends Component {
    componentDidMount() {
        this.refs.landingCanvas.width = width;
        this.refs.landingCanvas.height = height;
        timer = setInterval(this.drawPixel.bind(this), dalay);
    }

    componentWillUnmount() {
        clearInterval(timer);
    }

    drawPixel() {
        const ctx = this.refs.landingCanvas.getContext('2d');
        ctx.fillStyle = getRandomRgbColor();
        ctx.fillRect(...getRandomCoords(width, height), ...getRandomScale());
    }

    render() {
        return (
            <div className='landing grey lighten-2'>
                <div className='landing__inner'>
                    <h1 className='landing__header'>Pixel Art</h1>
                    <Link to='/app'>
                        <button className='btn-large'>Start</button>
                    </Link>
                </div>
                <canvas className='landing__canvas' ref='landingCanvas'></canvas>
            </div>
        )
    }
}

export default Landing