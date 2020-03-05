function extractArrayFromRgba(colorRgba) {
    return colorRgba.slice(5, -1).split(',').map(e => +e);
}

function isStartColor(imgData, pixelPos, color) {
    return imgData.data[pixelPos] === color[0]
      && imgData.data[pixelPos + 1] === color[1]
      && imgData.data[pixelPos + 2] === color[2];
}

function drawPixel(imgData, pixelPos, color) {
    [
        imgData.data[pixelPos], imgData.data[pixelPos + 1], imgData.data[pixelPos + 2], imgData.data[pixelPos + 3]
    ] = [
        color[0], color[1], color[2], 255
    ];
}


function paintAllPixel(imgData, colorRgba) {
    const color = extractArrayFromRgba(colorRgba);

    for (let i = 0; i < imgData.data.length; i += 4) {
        [
            imgData.data[i], imgData.data[i + 1], imgData.data[i + 2], imgData.data[i + 3],
        ] = [
            color[0], color[1], color[2], color[3],
        ]; 
    }
    return imgData
}

function fillSame(imgData, colorRgba, targetColor) {
    const color = extractArrayFromRgba(colorRgba);
    for (let i = 0; i < imgData.data.length; i += 4) {

        if(imgData.data[i] === targetColor[0] && imgData.data[i + 1] === targetColor[1]
            && imgData.data[i + 2] === targetColor[2] && imgData.data[i + 3] === targetColor[3]) {

                [
                    imgData.data[i], imgData.data[i + 1], imgData.data[i + 2], imgData.data[i + 3],
                ] = [
                    color[0], color[1], color[2], color[3],
                ]; 
            }
    }
    return imgData
}

function fillRegion(imgData, colorRgba, targetColor, initialCoords) {
    const color = extractArrayFromRgba(colorRgba);
    const coords = [{ x: initialCoords.x, y: initialCoords.y }];
    if(!targetColor.filter((num, i) => num !== color[i]).length) return imgData;

    while(coords.length) {
        let isLeftRich = false;
        let isRightRich = false;
        const newPos = coords.pop();
        let posInArray = (newPos.y * this.props.canvasSize.width + newPos.x) * 4;

        while(newPos.y >= 0 && isStartColor(imgData, posInArray, targetColor)) {

            posInArray -= this.props.canvasSize.width * 4;
            newPos.y -= 1;
        }

        posInArray += this.props.canvasSize.width * 4;
        newPos.y += 1;

        while(newPos.y < this.props.canvasSize.height && isStartColor(imgData, posInArray, targetColor)) {
            drawPixel(imgData, posInArray, color);

            if(newPos.x > 0) {
                if(isStartColor(imgData, posInArray - 4, targetColor)) {
                    if(!isLeftRich) {
                        coords.push({ x: newPos.x - 1, y: newPos.y });
                        isLeftRich = true;
                    }
                }
                else if(isLeftRich) isLeftRich = false;
            }

            if(newPos.x < this.props.canvasSize.width) {
                if(isStartColor(imgData, posInArray + 4, targetColor)) {
                    if(!isRightRich) {
                        coords.push({ x: newPos.x + 1, y: newPos.y });
                        isRightRich = true;
                    }
                }
                else if(isRightRich) isRightRich = false;
            }

            posInArray += this.props.canvasSize.width * 4;
            newPos.y += 1;
        }
    }
    return imgData;
}

export { paintAllPixel, fillSame, fillRegion } 