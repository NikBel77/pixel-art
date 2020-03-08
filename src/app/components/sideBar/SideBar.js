import React, { Component } from 'react'
import './side.css'

class SideBar extends Component {
    render() {
        return (
            <div className='side-bar'>
                <button className='btn-small' onClick={() => this.props.showLanding()}>Back</button>
            </div>
        )
    }
}

export default SideBar