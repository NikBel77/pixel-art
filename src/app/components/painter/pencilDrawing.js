export default class PencilDrawing {
    lastX = null;
    lastY = null;
    scale = null;
    penSize = null;

    dispatchSettings({ x, y, scale, penSize }) {
        if (!penSize) penSize = 1;
        if (!scale) scale = 8;
        [this.lastX, this.lastY, this.scale, this.penSize] = [x, y, scale, penSize];
    }

    drawSinglePixel({ ctx, color, left, top }) {
        let imgData = ctx.getImageData(left, top, this.scale * this.penSize, this.scale * this.penSize);
        this.fillImageData(imgData, color);
        ctx.putImageData(imgData, left, top);
    }

    drawing(color, { x, y }, ctx) {
        let [left, top] = this.getTopAndLeft(this.lastX, this.lastY);
        this.drawSinglePixel({ ctx, color, left, top });

        let dx = Math.abs(x - this.lastX);
        let dy = Math.abs(y - this.lastY);
        let sx = (this.lastX < x) ? 1 : -1;
        let sy = (this.lastY < y) ? 1 : -1;
        let err = dx - dy;

        while (!((this.lastX === x) && (this.lastY === y))) {
            let [left, top] = this.getTopAndLeft(this.lastX, this.lastY);
            this.drawSinglePixel({ ctx, color, left, top });

            let e2 = 2 * err;
            if (e2 > -dy) { err -= dy; this.lastX += sx; }
            if (e2 < dx) { err += dx; this.lastY += sy; }
        }
    }

    fillImageData(imgData, colorRgba) {
        const color = this.extractArrayFromRgba(colorRgba);

        for (let i = 0; i < imgData.data.length; i += 4) {
            [
                imgData.data[i], imgData.data[i + 1], imgData.data[i + 2], imgData.data[i + 3],
            ] = [
                    color[0], color[1], color[2], color[3],
            ];
        }
        return imgData
    }

    extractArrayFromRgba(colorRgba) {
        return colorRgba.slice(5, -1).split(',').map(e => +e);
    }

    getTopAndLeft(x, y) {
        const top = ((y * this.scale) -
            (Math.floor(this.penSize / 2) * this.scale));
        const left = ((x * this.scale) -
            (Math.floor(this.penSize / 2) * this.scale));

        return [left, top];
    }
}