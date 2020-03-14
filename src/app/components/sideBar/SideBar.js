import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './side.css'

class SideBar extends Component {
    render() {
        return (
            <div className='side-bar'>
                <Link to='/' className='btn btn-small'>Back</Link>
            </div>
        )
    }
}

export default SideBar