import React, { Component } from 'react'
import './landing.css'
import { Link } from 'react-router-dom';

class Landing extends Component{
  render() {
    return (
    <div className='landing grey lighten-2'>
      <h1 className='landing__header'>Pixel Art</h1>
      <Link to='/app'>
        <button className='btn-large'>Start</button>
      </Link>
    </div>
    )}
}

export default Landing