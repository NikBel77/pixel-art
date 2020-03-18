import React, { Component } from 'react'
import './error.css'

export default class Error extends Component {
    render() {
        return (
            <div className='error brown darken-4'>
                <div className='error__massage'>
                    <h3>Sorry, Pixel Art can't run in your browser</h3>
                    <p>try Firefox or Chrome last version</p>
                </div>
            </div>
        )
    }
}