function getRandomRgbColor() {
    const r = Math.floor(Math.random()*256);
    const g = Math.floor(Math.random()*256);
    const b = Math.floor(Math.random()*256);
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
    if(!rgb || typeof rgb !== 'string') throw Error('wrong rgb format');
    if(rgb.includes('rgba')) return rgb;
    if(!rgb.includes('rgb')) throw Error('format dose not contains "rgb" symbols');
    const color = rgb.slice(4, -1).split(',').map((num) => +num);
    return `rgba(${color.join()},255)`
}

export { getRandomRgbColor, getRandomCoords, getRandomScale, RgbToRgba };