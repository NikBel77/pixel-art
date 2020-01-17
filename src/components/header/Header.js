import React, { Component } from 'react'
import './header.css'

class Header extends Component {
    getRandomRgbColor() {
        const r = Math.floor(Math.random()*256);
        const g = Math.floor(Math.random()*256);
        const b = Math.floor(Math.random()*256);
        return `rgb(${r}, ${g}, ${b})`;
    }
    render() {
        return (
            <div className='header indigo z-depth-2'>
                <h1 className='header__title'>
                    <span style={{color: this.getRandomRgbColor()}}>Pixel </span>
                    <span style={{color: this.getRandomRgbColor()}}>Art</span>
                </h1>
            </div>
        )
    }
}

export default Header