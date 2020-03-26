import React, { Component } from 'react'
import './landing.css'
import { Link } from 'react-router-dom';
import { getRandomRgbColor, getRandomCoords, getRandomScale } from '../../../utils/service'

import lama from '../../../assets/images/lama/lama-1.png'
import megaman from '../../../assets/images/megaman/Megaman-1.png'
import trooper from '../../../assets/images/stormtrooper/helmet-1.png'

let timer = null;
const dalay = 1000;
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

                    <div className='hints grey lighten-2'>

                        <div className='hints__main-block'>
                            <p>this is simple pixel editor</p>
                            <p>Pixel Art is light version of <a href='https://www.piskelapp.com/'>Piskel Clone</a></p>
                            <p>in Pixel you can create a simple image</p>
                            <p>Also you can download images in .png or .apng format</p>
                        </div>

                    </div>

                    <Link to='/new' className='btn btn-large'>Create New Image</Link>

                    <div className='exemples'>

                        <p>or try this exemples:</p>
                        <div className='exemples__wrapper'>
                            <div className='exemples__inner'>
                                <Link to='/lama'>
                                    <img src={lama} className='exemples__image' />
                                </Link>
                            </div>
                            <div className='exemples__inner'>
                                <Link to='/megaman'>
                                    <img src={megaman} className='exemples__image' />
                                </Link>
                            </div>
                            <div className='exemples__inner'>
                                <Link to='/trooper'>
                                    <img src={trooper} className='exemples__image' />
                                </Link>
                            </div>
                        </div>

                    </div>

                    <div className='footer-info'>
                        <p>My <a href='https://github.com/NikBel77'>GitHub</a></p>
                    </div>
                </div>
                <canvas className='landing__canvas' ref='landingCanvas'></canvas>
            </div>
        )
    }
}

export default Landing