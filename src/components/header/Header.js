import React, { Component } from 'react'
import './header.css'

class Header extends Component {
    render() {
        return (
            <div className='header indigo z-depth-2'>
                <h1 className='header__title'>
                    <span style={{color: '#f4ff81'}}>Piskel </span>
                    <span style={{color: '#ffc107'}}>Art</span>
                </h1>
            </div>
        )
    }
}

export default Header