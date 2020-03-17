import pencil from '../../../assets/icons/pencil.svg'
import bucket from '../../../assets/icons/bucket.svg'
import roller from '../../../assets/icons/roller.svg'
import dropper from '../../../assets/icons/dropper.svg'
import eraser from '../../../assets/icons/eraser.svg'
import brush from '../../../assets/icons/brush.svg'

const toolBtnList = [
    { name: 'pen', icon: pencil, hint: 'pen'},
    { name: 'fill', icon: bucket, hint: 'fill area'},
    { name: 'fillAll', icon: roller, hint: 'fill all pixels'},
    { name: 'fillAllSame', icon: brush, hint: 'fill all same color'},
    { name: 'eraser', icon: eraser, hint: 'eraser'},
    { name: 'dropper', icon: dropper, hint: 'dropper'},
]

const sizeBtnList = [
    { scale: '5px', data: 1 },
    { scale: '7px', data: 2},
    { scale: '9px', data: 3},
    { scale: '11px', data: 4},
]

export { toolBtnList, sizeBtnList }