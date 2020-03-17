import pencilCur from '../../../assets/cursors/pen.png'
import bucketCur from '../../../assets/cursors/paint-bucket.png'
import dropperCur from '../../../assets/cursors/dropper.png'
import eraserCur from '../../../assets/cursors/eraser.png'

const cursorsMap = new Map([
    ['pen', {url: pencilCur, x: 0, y: 14}],
    ['fill', {url: bucketCur, x: 14, y: 14}],
    ['fillAll', {url: bucketCur, x: 14, y: 14}],
    ['fillAllSame', {url: bucketCur, x: 14, y: 14}],
    ['eraser', {url: eraserCur, x: 0, y: 14}],
    ['dropper', {url: dropperCur, x: 0, y: 14}],
]);

export default cursorsMap;