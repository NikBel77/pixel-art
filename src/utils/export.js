import UPNG from 'upng-js'
import download from 'downloadjs'

function downloadAPNG(bufferArray, { fps, width, height }, fileName) {
    const buffer = bufferArray.map((frame) => frame.imageData.data.buffer);
    const delays = new Array(buffer.length).fill(1000 / fps);
    const cnum = 0;
    const apng = UPNG.encode(buffer, width, height, cnum, delays);

    download(apng, `${fileName}.apng`, 'apng');
}

function downloadPNG(bufferArray, currentFrame, fileName) {
    if (!bufferArray[currentFrame].dataURL) return
    const png = bufferArray[currentFrame].dataURL;
    download(png, `${fileName}.png`, 'png');
}

export { downloadAPNG, downloadPNG }