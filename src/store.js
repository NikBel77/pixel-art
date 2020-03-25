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
        case 'REWRITE_MAIN_COLOR': return Object.assign({}, state, { mainColor: action.color });
        case 'REWRITE_AUX_COLOR': return Object.assign({}, state, { auxColor: action.color });
        default: return state;
    }
}

//canvasSizeStore

const initialSizeStore = {
    width: 480, /* width and height must be devisible on scale for correct rendering */
    height: 480,
    scale: 8,
    penSize: 1, /* correct pen size must be numbers: 1, 2, 3 or 4 */
    previewCanvasSize: 184,
    previewFps: 10,
}

function sizeStore(state = initialSizeStore, action) {
    switch(action.type) {
        case 'CHANGE_PEN_SIZE': return Object.assign({}, state, { penSize: action.penSize });
        case 'CHANGE_FPS': return Object.assign({}, state, { previewFps: action.previewFps });
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

//curentFrameStore

const initialFrameData = 0;

function currentFrameStore(state = initialFrameData, action) {
    switch(action.type) {
        case 'CHANGE_CURRENT_FRAME': return action.number;
        default: return state;
    }
}

//ImageDataStore

const createFrame = () => {
    const [width, height] = [initialSizeStore.width, initialSizeStore.height];
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, width, height);
    const dataURL = canvas.toDataURL();

    return { imageData, dataURL }
}
const initFrame = createFrame();
const initialImageDataState = [initFrame];

function imageDataStore(state = initialImageDataState, action) {
    switch(action.type) {
        case 'ADD_FRAME': return [...state, createFrame()]
        case 'CHANGE_DATA_URL': return state.map((data, i) => {
            if(i === action.number) {
                return { imageData: data.imageData, dataURL: action.dataURL }
            }
            return data;
        });
        case 'CHANGE_IMAGE_DATA': return state.map((data, i) => {
            if(i === action.number) {
                return { imageData: action.imageData, dataURL: data.dataURL }
            }
            return data;
        });
        case 'SET_BUFFER_ARRAY': return action.buffer.map((data) => {
            return { imageData: data.imageData, dataURL: data.dataURL }
        });
        case 'DELETE_FRAME': {
            if(state.length === 1) return state
            state.splice(action.number, 1);
            return state;
        }
        case 'COPY_FRAME': {
            state.splice(action.number, 0, state[action.number]);
            return state;
        }
        default: return state;
    }
}

//keyStore

const initialKeyStore = {
    penKey: 'KeyP',
    fillKey: 'KeyF',
    eraserKey: 'KeyE',
    dropperKey: 'KeyD',
    switchColorKey: 'KeyS',
    penSize1: 'Digit1',
    penSize2: 'Digit2',
    penSize3: 'Digit3',
    penSize4: 'Digit4',
}

function keyEventStore(state = initialKeyStore, action) {
    switch(action.type) {
        case 'CHANGE_STATE': return Object.assign({}, state, action.keyNames);
        default: return state;
    }
}

//combine

const appStore = combineReducers({
    colorStore,
    toolStore,
    sizeStore,
    imageDataStore,
    currentFrameStore,
    keyEventStore
});
const store = createStore(appStore);

export { store }