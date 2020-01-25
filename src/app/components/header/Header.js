import React, { Component } from 'react'
import './header.css'
import { Link } from 'react-router-dom';

function getRandomRgbColor() {
    const r = Math.floor(Math.random()*256);
    const g = Math.floor(Math.random()*256);
    const b = Math.floor(Math.random()*256);
    return `rgb(${r}, ${g}, ${b})`;
}

const color1 = getRandomRgbColor();
const color2 = getRandomRgbColor();

class Header extends Component {
    render() {

        return (
            <div className='header indigo z-depth-2'>
                <h1 className='header__title'>
                    <span style={{color: color1}}>Pixel </span>
                    <span style={{color: color2}}>Art</span>
                </h1>
                <Link to='/'>
                    <button className='btn-small'>Back</button>
                </Link>
            </div>
        )
    }
}

export default Header