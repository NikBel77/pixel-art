import { paintAllPixel, getPixelCoords }  from './drawing'

export default {
    pen: {
        mousedown: function(e) {
            e.preventDefault();
            const ctx = e.target.getContext('2d');
            const scale = this.state.canvasSize.scale;
            const color = e.which === 1 ? this.props.currentColor : this.props.prevColor;
            const [x, y] = getPixelCoords(e.offsetX, e.offsetY, scale);
            let imgData = ctx.getImageData(x, y, scale, scale);
            imgData = paintAllPixel(imgData, color);
            ctx.putImageData(imgData, x, y);
        },
        mousemove: function(e) {
            if(e.which === 0) return;
            e.preventDefault();
            const ctx = e.target.getContext('2d');
            const scale = this.state.canvasSize.scale;
            const color = e.which === 1 ? this.props.currentColor : this.props.prevColor;
            const [x, y] = getPixelCoords(e.offsetX, e.offsetY, scale);
            if (x === this.state.coords.x * scale && y / scale === this.state.coords.y * scale) return;

            let imgData = ctx.getImageData(x, y, scale, scale);
            imgData = paintAllPixel(imgData, color);
            ctx.putImageData(imgData, x, y);
        }
    }, 
    fill: {
        mousedown: function(e) {
            e.preventDefault();
        }
    },
    fillAll: {
        mousedown: function(e) {
            e.preventDefault();
            const ctx = e.target.getContext('2d');
            const color = e.which === 1 ? this.props.currentColor : this.props.prevColor;

            let imgData = ctx.getImageData(0, 0, this.state.canvasSize.width, this.state.canvasSize.height);
            imgData = paintAllPixel(imgData, color);
            ctx.putImageData(imgData, 0, 0);
        }
    },
    fillAllSame: {
        mousedown: function(e) {
            e.preventDefault();
        }
    },
    eraser: {
        mousedown: function(e) {
            e.preventDefault();
            const ctx = e.target.getContext('2d');
            const scale = this.state.canvasSize.scale;
            const color = this.props.initialColor;
            const [x, y] = getPixelCoords(e.offsetX, e.offsetY, scale);
            let imgData = ctx.getImageData(x, y, scale, scale);
            imgData = paintAllPixel(imgData, color);
            ctx.putImageData(imgData, x, y);
        },
        mousemove: function(e) {
            if(e.which === 0) return;
            e.preventDefault();
            const ctx = e.target.getContext('2d');
            const scale = this.state.canvasSize.scale;
            const color = this.props.initialColor;
            const [x, y] = getPixelCoords(e.offsetX, e.offsetY, scale);
            if (x === this.state.coords.x * scale && y / scale === this.state.coords.y * scale) return;

            let imgData = ctx.getImageData(x, y, scale, scale);
            imgData = paintAllPixel(imgData, color);
            ctx.putImageData(imgData, x, y);
        }
    },
    dropper: {
        mousedown: function(e) {
            e.preventDefault();
        }
    },
}