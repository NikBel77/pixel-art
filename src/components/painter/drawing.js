function paintAllPixel(imgData, colorRgba) {
    const color = colorRgba.slice(5, -1).split(',').map(e => +e);

    for (let i = 0; i < imgData.data.length; i += 4) {
        [
            imgData.data[i], imgData.data[i + 1], imgData.data[i + 2], imgData.data[i + 3],
        ] = [
            color[0], color[1], color[2], color[3],
        ]; 
    }
    return imgData
}

function getPixelCoords(offsetX, offsetY, scale) {
    const x = Math.floor(offsetX / scale);
    const y = Math.floor(offsetY / scale);
    return [x >= 0 ? x * scale : 0, y >= 0 ? y * scale : 0];
}

export { paintAllPixel, getPixelCoords } 