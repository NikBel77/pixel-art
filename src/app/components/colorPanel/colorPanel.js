import React, { Component } from 'react'
import './colors.css'
import { connect } from 'react-redux'
import ColorList from './colorList'
import { RgbToRgba } from '../../../service'

class ColorBtn extends Component {
    render() {
        return (
            <div onMouseDown={ (e) => {
                    if(e.nativeEvent.which === 1) {
                        this.props.setMainColor(RgbToRgba(e.target.style.backgroundColor));
                    }
                    else if (e.nativeEvent.which === 3) {
                        this.props.setAuxColor(RgbToRgba(e.target.style.backgroundColor));
                    }
                }}
                className='color-panel__btn'
                style={{ backgroundColor: this.props.color }}
            >
                <div className='color-panel__hint'>{ this.props.hint }</div>
            </div>
        )
    }
}

class ColorPanel extends Component {
    render() {
        return (
            <div className='color-panel__wrapper indigo z-depth-2'>
                {ColorList.map((btn, i) => {
                    return (
                        <ColorBtn key={i} color={btn.color}
                            hint={btn.description}
                            setMainColor={this.props.setMainColor}
                            setAuxColor={this.props.setAuxColor}/>
                    )
                })}
            </div>
        )
    }
}

export default connect(
    () => ({}),
    (dispatch) => ({
        setMainColor: (color) => {
            dispatch({ type: 'REWRITE_MAIN_COLOR', color });
        },
        setAuxColor: (color) => {
            dispatch({ type: 'REWRITE_AUX_COLOR', color });
        }
    })
)(ColorPanel);