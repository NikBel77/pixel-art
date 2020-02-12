import React, { Component } from 'react'

const activeClassBtn = 'tool-bar__tool-btn-active';
const activeClassSizeBtn = 'tool-bar__size-btn-active';

class ToolButton extends Component {
    render() {
        return (
        <div className={`tool-bar__tool-btn${this.props.active ? ' ' + activeClassBtn : ''}`}
            style={{backgroundImage: `url(${this.props.icon})`}}
            data-tool={this.props.data} onClick={(e) => this.props.changeTool(e.target.dataset.tool)}>
        </div>
    )}
}

class SizeButton extends Component {
    render() {
        return (
        <div className={`tool-bar__size-btn${this.props.active ? ' ' + activeClassSizeBtn : ''}`}
            data-size={this.props.data}
            onClick={(e) => this.props.setPenSize(+e.currentTarget.dataset.size)}>
            <div className='tool-bar__size-mark'
                style={{width: this.props.scale, height: this.props.scale}}>
            </div>
        </div>
        )}
}

export { ToolButton, SizeButton }