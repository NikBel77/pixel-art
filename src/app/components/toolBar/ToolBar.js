import React, { Component } from 'react'
import './toolbar.css'
import { ToolButton, SizeButton } from './buttons'
import { toolBtnList, sizeBtnList } from './toolList'
import { connect } from 'react-redux'
import { convertHEXToRGBA } from '../../../service'
import keySwitcher from './keySwitch'

class ToolBar extends Component {
    constructor(props) {
        super(props)

        this.switcher = keySwitcher.bind(this);
    }

    componentDidMount() {
        this.setKeyboardHandler();
    }

    setKeyboardHandler() {        
        window.addEventListener('keypress', this.switcher);
    }

    render() {
        return (
            <div className='tool-bar'>

                <div className='tool-bar__size-switcher indigo z-depth-2'>
                    {sizeBtnList.map((btn, i) => {
                        return <SizeButton key={i} scale={btn.scale} data={btn.data}
                            setPenSize={this.props.setPenSize}
                            active={this.props.penSize === btn.data} />
                    })}
                </div>

                <div className='tool-bar__panel indigo z-depth-2'>
                    {toolBtnList.map((btn, i) => {
                        return <ToolButton key={i} icon={btn.icon} data={btn.name}
                            active={btn.name === this.props.activeTool}
                            changeTool={this.props.setCurrentTool}
                            hint={btn.hint} />
                    })}
                </div>

                <div className='tool-bar__swaper indigo z-depth-2'
                    onClick={() => {
                        const [mainColor, auxColor] = [this.props.mainColor, this.props.auxColor];
                        this.props.setMainColor(auxColor);
                        this.props.setAuxColor(mainColor);
                    }}>
                    <i className="material-icons">cached</i>
                    <div className='tool-bar__hint'>swap colors</div>
                </div>

                <div className='tool-bar__color-switcher indigo z-depth-2'>
                    <label className='tool-bar__color-holder' htmlFor='aux-palette'
                        style={{ bottom: '2px', right: '6px', background: this.props.auxColor }}>
                    </label>
                    <label className='tool-bar__color-holder' htmlFor='main-palette'
                        style={{ top: '2px', left: '6px', background: this.props.mainColor }}>

                    </label>
                    <input style={{ display: 'none' }}
                        defaultValue={this.props.auxColor}
                        type='color'
                        id='main-palette'
                        onInput={(e) => {
                            const color = convertHEXToRGBA(e.target.value);
                            if(color) this.props.setMainColor(color);
                        }} 
                    />
                    <input style={{ display: 'none' }}
                        defaultValue='red'
                        type='color'
                        id='aux-palette'
                        onInput={(e) => {
                            const color = convertHEXToRGBA(e.target.value);
                            if(color) this.props.setAuxColor(color);
                        }} 
                    />
                </div>

            </div>
        )
    }
}

export default connect(
    (state) => ({
        mainColor: state.colorStore.mainColor,
        auxColor: state.colorStore.auxColor,
        penSize: state.sizeStore.penSize,
        activeTool: state.toolStore.activeTool,
    }),
    (dispatch) => ({
        setCurrentTool: (tool) => {
            dispatch({ type: 'CHANGE_ACTIVE_TOOL', tool });
        },
        setPenSize: (penSize) => {
            dispatch({ type: 'CHANGE_PEN_SIZE', penSize });
        },
        setMainColor: (color) => {
            dispatch({ type: 'REWRITE_MAIN_COLOR', color });
        },
        setAuxColor: (color) => {
            dispatch({ type: 'REWRITE_AUX_COLOR', color });
        }
    })
)(ToolBar);