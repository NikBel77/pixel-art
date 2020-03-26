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

function convertHEXToRGBA(colorHex) {

    if (colorHex[0] !== '#') return false;
    if (colorHex.length !== 7) return false;

    const r = parseInt(colorHex.slice(1, 3), 16);
    const g = parseInt(colorHex.slice(3, 5), 16);
    const b = parseInt(colorHex.slice(5, 7), 16);

    return `rgba(${r},${g},${b},255)`;
}

function checkBrowser() {
    // Opera 8.0+
    const isOpera = (!!window.opr && !!window.opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    // Firefox 1.0+
    const isFirefox = typeof InstallTrigger !== 'undefined';
    // Safari 3.0+ "[object HTMLElementConstructor]" 
    const isSafari = /constructor/i.test(window.HTMLElement)
        || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })
        (!window['safari'] || (typeof window.safari !== 'undefined' && window.safari.pushNotification));
    // Internet Explorer 6-11
    const isIE = /*@cc_on!@*/false || !!document.documentMode;
    // Edge 20+
    const isEdge = !isIE && !!window.StyleMedia;
    // Chrome 1 - 79
    const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    // Edge (based on chromium) detection
    const isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") !== -1);
    // Blink engine detection
    const isBlink = (isChrome || isOpera) && !!window.CSS;

    return new Map([
        ['opera', isOpera],
        ['firefox', isFirefox],
        ['safari', isSafari],
        ['ie', isIE],
        ['edge', isEdge],
        ['chrome', isChrome],
        ['chromium', isEdgeChromium],
        ['blink', isBlink]
    ]);
}


export {
    getRandomRgbColor,
    getRandomCoords,
    getRandomScale,
    RgbToRgba,
    convertHEXToRGBA,
    checkBrowser
};