import { paintAllPixel, getPixelCoords }  from './drawing'

export default {
    pen: {
        mousedown: (e) => {
            e.preventDefault();
            const ctx = e.target.getContext('2d');
            const scale = e.target.dataset.scale;
            const color = e.which === 1 ? e.target.dataset.color1 : e.target.dataset.color2;
            const [x, y] = getPixelCoords(e.offsetX, e.offsetY, scale);

            let imgData = ctx.getImageData(x, y, scale, scale);
            imgData = paintAllPixel(imgData, color);
            ctx.putImageData(imgData, x, y);
        },
        mousemove: (e) => {
            if(e.which === 0) return;
            console.log(e.which)
        }
    }, 
    fill: {
        mousedown: (e) => {
            e.preventDefault();
        }
    },
    fillAll: {
        mousedown: (e) => {
            e.preventDefault();
        }
    },
    fillAllSame: {
        mousedown: (e) => {
            e.preventDefault();
        }
    },
    eraser: {
        mousedown: (e) => {
            e.preventDefault();
        }
    },
    dropper: {
        mousedown: (e) => {
            e.preventDefault();
        }
    },
}