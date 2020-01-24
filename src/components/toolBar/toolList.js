import pencil from './icons/pencil.svg'
import bucket from './icons/bucket.svg'
import roller from './icons/roller.svg'
import dropper from './icons/dropper.svg'
import eraser from './icons/eraser.svg'
import brush from './icons/brush.svg'
// import palette from './icons/palette.svg'

const toolBtnList = [
    { name: 'pen', icon: pencil },
    { name: 'fill', icon: bucket },
    { name: 'fillAll', icon: roller },
    { name: 'fillAllSame', icon: brush },
    { name: 'eraser', icon: eraser },
    { name: 'dropper', icon: dropper },
]

const sizeBtnList = [
    { scale: '5px', data: 1 },
    { scale: '7px', data: 2},
    { scale: '9px', data: 3},
    { scale: '11px', data: 4},
]

export { toolBtnList, sizeBtnList }