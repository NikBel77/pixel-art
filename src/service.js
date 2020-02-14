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

export { getRandomRgbColor, getRandomCoords, getRandomScale };