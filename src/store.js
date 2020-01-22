import { createStore } from 'redux'
import { combineReducers } from 'redux'

// colorStore

const initialColorsState = {
    mainColor: 'rgba(244, 67, 54, 255)', /* all colors must be in rgba format */
    auxColor: 'rgba(0, 17, 255, 255)',
    initialColor: 'rgba(0, 0, 0, 0)',
}

function colorStore(state = initialColorsState, action) {
    switch(action.type) {
        case 'REWRITE_MAIN_COLOR': return state;
        default: return state;
    }
}

//canvasSizeStore

const initialSizeStore = {
    width: 480, /* width and height must be devisible on scale for correct rendering */
    height: 480,
    scale: 8,
    penSize: 1, /* correct pen size must be numbers: 1, 2, 3 or 4 */
}

function sizeStore(state = initialSizeStore, action) {
    switch(action.type) {
        case 'CHANGE_PEN_SIZE': return Object.assign({}, state, { penSize: action.penSize });
        default: return state;
    }
}

//toolStore

const initialToolState = { activeTool: 'pen' }

function toolStore(state = initialToolState, action) {
    switch(action.type) {
        case 'CHANGE_ACTIVE_TOOL': return { activeTool: action.tool };
        default: return state;
    }
}

//combine

const appStore = combineReducers({ colorStore, toolStore, sizeStore });
const store = createStore(appStore);

export { store }