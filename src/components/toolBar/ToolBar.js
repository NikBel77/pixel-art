import React, { Component } from 'react'
import pencil from './icons/pencil.svg'
import bucket from './icons/bucket.svg'
import roller from './icons/roller.svg'
import palette from './icons/palette.svg'
import dropper from './icons/dropper.svg'
import eraser from './icons/eraser.svg'
import brush from './icons/brush.svg'
import './toolbar.css'

const activeClassBtn = 'tool-bar__tool-btn-active';
const activeClassSizeBtn = 'tool-bar__size-btn-active';
const currentColor = '#f44336';
const prevColor = '#2196f3';

class ToolBar extends Component {
    render() {
        return (
            <div className='tool-bar'>
                <div className='tool-bar__size-switcher indigo z-depth-2'>
                    <div className='tool-bar__size-btn'>
                        <div className='tool-bar__size-mark' style={{width: '5px', height: '5px'}}></div>
                    </div>
                    <div className='tool-bar__size-btn'>
                        <div className='tool-bar__size-mark' style={{width: '7px', height: '7px'}}></div>
                    </div>
                    <div className='tool-bar__size-btn'>
                        <div className='tool-bar__size-mark' style={{width: '9px', height: '9px'}}></div>
                    </div>
                    <div className='tool-bar__size-btn'>
                        <div className='tool-bar__size-mark' style={{width: '11px', height: '11px'}}></div>
                    </div>
                </div>
                <div className='tool-bar__panel indigo z-depth-2'>
                    <div className='tool-bar__tool-btn' style={{backgroundImage: `url(${pencil})`}}></div>
                    <div className='tool-bar__tool-btn' style={{backgroundImage: `url(${bucket})`}}></div>
                    <div className='tool-bar__tool-btn' style={{backgroundImage: `url(${brush})`}}></div>
                    <div className='tool-bar__tool-btn' style={{backgroundImage: `url(${roller})`}}></div>
                    <div className='tool-bar__tool-btn' style={{backgroundImage: `url(${eraser})`}}></div>
                    <div className='tool-bar__tool-btn' style={{backgroundImage: `url(${dropper})`}}></div>
                    <div className='tool-bar__tool-btn' style={{backgroundImage: `url(${palette})`}}></div>
                </div>
                <div className='tool-bar__color-switcher indigo z-depth-2'>
                    <div className='tool-bar__color-holder'
                        style={{bottom: '2px', right: '6px', background: prevColor}}></div>
                    <div className='tool-bar__color-holder'
                        style={{top: '2px', left: '6px', background: currentColor}}></div>
                </div>
            </div>
        )
    }
}

export default ToolBar