function getRandomRgbColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function getRandomCoords(width, height) {
    return [Math.floor(Math.random() * width), Math.floor(Math.random() * height)];
}

function getRandomScale() {
    const scale = Math.ceil(Math.random() * 4) * 4;
    return [scale, scale];
}

function RgbToRgba(rgb) {
    if (!rgb || typeof rgb !== 'string') throw Error('wrong rgb format');
    if (rgb.includes('rgba')) return rgb;
    if (!rgb.includes('rgb')) throw Error('format dose not contains "rgb" symbols');
    const color = rgb.slice(4, -1).split(',').map((num) => +num);
    return `rgba(${color.join()},255)`
}

function convertImgData(imgData, { scale, width, height }) {

    for (let i = 0; i < (width * height * 4); i += width * 4 * scale) {
        for (let j = 0; j < (width * 4); j += scale * 4) {

            const r = imgData.data[i + j];
            const g = imgData.data[i + j + 1];
            const b = imgData.data[i + j + 2];
            const a = imgData.data[i + j + 3];

            for (let k = 0; k < (width * 4 * scale); k += width * 4) {
                for (let n = 0; n < scale * 4; n += 4) {
                    imgData.data[i + j + k + n] = r;
                    imgData.data[i + j + k + n + 1] = g;
                    imgData.data[i + j + k + n + 2] = b;
                    imgData.data[i + j + k + n + 3] = a;
                }
            }
        }
    }
    return imgData
}

export { getRandomRgbColor, getRandomCoords, getRandomScale, RgbToRgba, convertImgData };