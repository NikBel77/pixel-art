async function importImagesByLink(link, settings) {
    const promiseArray = handleFiles(link.files);
    const files = await Promise.all(promiseArray);
    const buffer = files.map((img) => {
        return extractImageData(img, settings);
    });
    if (!buffer || !buffer.length) return false
    return buffer
}

async function importLocalImages(imageSrcArray, settings) {
    const promiseArray = imageSrcArray.map((src) => {
        const img = document.createElement('img');
        img.src = src;
        return new Promise(resolve => {
            img.onload = () => { resolve(img) };
        });
    });
    const imgArray = await Promise.all(promiseArray);
    const buffer = imgArray.map((img) => {
        return extractImageData(img, settings);
    });
    return buffer
}

function extractImageData(img, { width, height, scale }) {
    if (!img.src) return
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);
    const imageData = convertImgData(ctx.getImageData(0, 0, width, height), { width, height, scale });
    ctx.putImageData(imageData, 0, 0);
    const dataURL = canvas.toDataURL();
    return { imageData, dataURL };
}

function handleFiles(files) {
    const result = [];
    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        if (!file.type.startsWith('image/')) continue;

        let img = document.createElement('img');
        img.file = file;

        let reader = new FileReader();
        const promise = new Promise(resolve => {
            reader.onload = (e) => {
                img.src = e.target.result;
                resolve(img);
            }
        });
        reader.readAsDataURL(file);
        result.push(promise);
    }
    return result;
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

export { importImagesByLink, importLocalImages }