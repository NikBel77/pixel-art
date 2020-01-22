import React, { Component } from 'react'
import './toolbar.css'
import { ToolButton, SizeButton } from './buttons'
import toolList from './toolList'
import { connect } from 'react-redux'

// const activeClassBtn = 'tool-bar__tool-btn-active';
// const activeClassSizeBtn = 'tool-bar__size-btn-active';

class ToolBar extends Component {
    render() {
        return (
            <div className='tool-bar'>
                <div className='tool-bar__size-switcher indigo z-depth-2'>
                    <SizeButton scale='5px'/>
                    <SizeButton scale='7px'/>
                    <SizeButton scale='9px'/>
                    <SizeButton scale='11px'/>
                </div>
                <div className='tool-bar__panel indigo z-depth-2'>
                    {toolList.map((btn, i) => {
                        return <ToolButton key={i} icon={btn.icon} data={btn.name} changeTool={this.props.setCurrentTool} />
                    })}
                </div>
                <div className='tool-bar__color-switcher indigo z-depth-2'>
                    <div className='tool-bar__color-holder'
                        style={{bottom: '2px', right: '6px', background: this.props.auxColor}}></div>
                    <div className='tool-bar__color-holder'
                        style={{top: '2px', left: '6px', background: this.props.mainColor}}></div>
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        mainColor: state.colorStore.mainColor,
        auxColor: state.colorStore.auxColor,
    }),
    (dispatch) => ({
        setCurrentTool: (tool) => {
          dispatch({ type: 'CHANGE_ACTIVE_TOOL', tool });
        }
    })
)(ToolBar);