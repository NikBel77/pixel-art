import { paintAllPixel, fillSame, fillRegion }  from './drawing'
import PencilDrawing from './pencilDrawing'

const penDrawing = new PencilDrawing();

export default {
    pen: {
        mousedown: function(e) {
            e.preventDefault();
            const ctx = e.target.getContext('2d');
            const color = e.which === 1 ? this.props.mainColor : this.props.auxColor;
            const [left, top] = [this.state.coords.left, this.state.coords.top];
            const scale = this.props.canvasSize.scale;
            const penSize = this.props.canvasSize.penSize;
            const [x, y] = [this.state.coords.x, this.state.coords.y];

            penDrawing.dispatchSettings({ x, y, scale, penSize });
            penDrawing.drawSinglePixel({ ctx, color, left, top });
        },
        mousemove: function(e) {
            if(e.which === 0) return;
            e.preventDefault();

            const ctx = e.target.getContext('2d');
            const color = e.which === 1 ? this.props.mainColor : this.props.auxColor;
            const [x, y] = [this.state.coords.x, this.state.coords.y];

            penDrawing.drawing(color, {x, y}, ctx);
        }
    }, 
    fill: {
        mousedown: function(e) {
            e.preventDefault();
            const ctx = e.target.getContext('2d');
            const color = e.which === 1 ? this.props.mainColor : this.props.auxColor;
            const targetColor = ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
            
            let imgData = ctx.getImageData(0, 0, this.props.canvasSize.width, this.props.canvasSize.height);
            imgData = fillRegion.call(this, imgData, color, targetColor, { x: e.offsetX, y: e.offsetY });
            ctx.putImageData(imgData, 0, 0);
        }
    },
    fillAll: {
        mousedown: function(e) {
            e.preventDefault();
            const ctx = e.target.getContext('2d');
            const color = e.which === 1 ? this.props.mainColor : this.props.auxColor;

            let imgData = ctx.getImageData(0, 0, this.props.canvasSize.width, this.props.canvasSize.height);
            imgData = paintAllPixel(imgData, color);
            ctx.putImageData(imgData, 0, 0);
        }
    },
    fillAllSame: {
        mousedown: function(e) {
            e.preventDefault();
            const ctx = e.target.getContext('2d');
            const color = e.which === 1 ? this.props.mainColor : this.props.auxColor;
            const targetColor = ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;

            let imgData = ctx.getImageData(0, 0, this.props.canvasSize.width, this.props.canvasSize.height);
            imgData = fillSame(imgData, color, targetColor);
            ctx.putImageData(imgData, 0, 0);
        }
    },
    eraser: {
        mousedown: function(e) {
            e.preventDefault();
            const ctx = e.target.getContext('2d');
            const color = this.props.initialColor;
            const [left, top] = [this.state.coords.left, this.state.coords.top];
            const scale = this.props.canvasSize.scale;
            const penSize = this.props.canvasSize.penSize;
            const [x, y] = [this.state.coords.x, this.state.coords.y];

            penDrawing.dispatchSettings({ x, y, scale, penSize });
            penDrawing.drawSinglePixel({ ctx, color, left, top });
        },
        mousemove: function(e) {
            if(e.which === 0) return;
            e.preventDefault();

            const ctx = e.target.getContext('2d');
            const color = this.props.initialColor;
            const [x, y] = [this.state.coords.x, this.state.coords.y];

            penDrawing.drawing(color, {x, y}, ctx);
        }
    },
    dropper: {
        mousedown: function(e) {
            e.preventDefault();
            if(e.which === 1) {
                let color = e.target.getContext('2d').getImageData(e.offsetX, e.offsetY, 1, 1).data;
                color = `rgba(${color.join(',')})`;
                this.props.setMainColor(color);
            }
            if(e.which === 3) {
                let color = e.target.getContext('2d').getImageData(e.offsetX, e.offsetY, 1, 1).data;
                color = `rgba(${color.join(',')})`;
                this.props.setAuxColor(color);
            }
        }
    },
}