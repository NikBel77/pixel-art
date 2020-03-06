export default class PencilDrawing {
    lastX = null;
    lastY = null;

    setLastCoords(x, y) {
        [this.lastX, this.lastY] = [x, y];
    }

    drawing(colorRgba, {x, y}, ctx) {
        ctx.fillStyle = colorRgba;

        let dx = Math.abs(x - this.lastX);
        let dy = Math.abs(y - this.lastY);
        let sx = (this.lastX < x) ? 1 : -1;
        let sy = (this.lastY < y) ? 1 : -1;
        let err = dx - dy;

        while(!((this.lastX === x) && (this.lastY === y))) {
            ctx.fillRect(this.lastX * 8, this.lastY * 8, 8, 8)
      
            let e2 = 2 * err;
            if (e2 > -dy) { err -= dy; this.lastX += sx; }
            if (e2 < dx) { err += dx; this.lastY += sy; }
         }
    }
}