import React, { Component } from 'react'

class ToolButton extends Component {
    render() {
        return (
        <div className='tool-bar__tool-btn' style={{backgroundImage: `url(${this.props.icon})`}}
            data-tool={this.props.data} onClick={(e) => this.props.changeTool(e.target.dataset.tool)}>
        </div>
    )}
}

class SizeButton extends Component {
    render() {
        return (
        <div className='tool-bar__size-btn'>
            <div className='tool-bar__size-mark' style={{width: this.props.scale, height: this.props.scale}}></div>
        </div>
        )}
}

export { ToolButton, SizeButton }