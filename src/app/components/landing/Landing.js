import React, { Component } from 'react'
import './landing.css'
import { Link } from 'react-router-dom';
import { getRandomRgbColor, getRandomCoords, getRandomScale } from '../../../utils/service'

import lama from '../../../assets/images/lama/lama.apng'
import megaman from '../../../assets/images/megaman/megaman.apng'
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

                    <div className='hints'>
                        <div className='hints__main-block grey lighten-2'>
                            <p>this is simple pixel editor</p>
                            <p>Pixel Art is light version of <a href='https://www.piskelapp.com/'>Piskel Clone</a></p>
                            <p>in Pixel you can create a simple image</p>
                            <p>You can download images</p>
                            <p>Available
                                <span className='teal-text'> png </span>and
                                <span className='teal-text'> apng </span>formats
                            </p>
                        </div>
                        <div className='hints__keyboard-block grey lighten-2'>
                            <p>keyboard shortcut:</p>
                            <p>key <span className='orange-text'>P</span> pen tool</p>
                            <p>key <span className='orange-text'>F</span> fill bucket tool</p>
                            <p>key <span className='orange-text'>D</span> dropper tool</p>
                            <p>key <span className='orange-text'>E</span> eraser tool</p>
                            <p>key <span className='orange-text'>S</span> swap colors</p>
                            <p>key <span className='orange-text'>1</span> pen size 1</p>
                            <p>key <span className='orange-text'>2</span> pen size 2</p>
                            <p>key <span className='orange-text'>3</span> pen size 3</p>
                            <p>key <span className='orange-text'>4</span> pen size 4</p>
                        </div>
                        <div className='hints__mouse-block grey lighten-2'>
                            <p><span className='orange-text'>Left mouse</span> key for use main color</p>
                            <p><span className='orange-text'>Right mouse</span> key for use auxiliary color</p>
                        </div>
                    </div>

                    <Link to='/new' className='btn btn-large'>Create New Image</Link>

                    <div className='exemples'>

                        <p>or try this exemples:</p>
                        <div className='exemples__wrapper'>
                            <div className='exemples__inner'>
                                <Link to='/lama'>
                                    <img src={lama} className='exemples__image' alt='lama'/>
                                </Link>
                            </div>
                            <div className='exemples__inner'>
                                <Link to='/megaman'>
                                    <img src={megaman} className='exemples__image' alt='megaman'/>
                                </Link>
                            </div>
                            <div className='exemples__inner'>
                                <Link to='/trooper'>
                                    <img src={trooper} className='exemples__image' alt='trooper'/>
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