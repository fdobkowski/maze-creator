export const downloadSvg = (svg) => {
    const data = '<?xml version="1.0" standalone="no"?>\r\n' + new XMLSerializer().serializeToString(svg)
    const svgBlob = new Blob([data], {
        type: 'image/svg+xml;charset=utf-8',
    });
    const DOMURL = window.URL || window.webkitURL || window;
    const url = DOMURL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const domRect = svg.getBBox();
        canvas.width = domRect.width;
        canvas.height = domRect.height;
        ctx.drawImage(img, 0, 0, domRect.width, domRect.height);
        DOMURL.revokeObjectURL(url);

        const imgURI = canvas
            .toDataURL('image/png')
            .replace('image/png', 'image/octet-stream');

        download(imgURI);
    };

    img.src = url;
}

const download = (href) => {
    let download = document.createElement('a');
    download.href = href;
    download.download = 'maze.png';
    download.click();
    download.remove();
}