'use strict'
let gElCanvas
let gCtx
let gId = 1
let gIsBorders = true
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    renderGallery()
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    console.log('hi');
    resizeCanvas()
    renderCanvas()
    renderMeme()
    _addMouseListeners()
    _addTouchListeners()


    window.addEventListener('resize', () => {
        resizeCanvas()
        renderCanvas()
        renderMeme()
    })
}
function renderCanvas() {
    //Set the backgournd color 
    gCtx.fillStyle = ' #fff'
    //Clear the canvas,  fill it with  background
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
}
function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    // console.log(elContainer.offsetWidth);
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}
function renderMeme() {
    const img = new Image()
    img.src = getMeme().url
    img.onload = () => {
        gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
        // width: 400px , height: 427/640 * 400 = 266px
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        const lines = getMemeLines()
        // console.log(lines)
        // if(!lines.length)drawText()
        lines.forEach(line => {
            // setPos(idx, getLinePos(line.txt))
            drawText(line)
        })
        const line = getMemeLine()
        if (!line) return
        document.querySelector('.type-input').value = line.txt
        // console.log(line)
        if (!gIsBorders) return
        drawBorder(line)
    }
}
function drawText(line = {
    txt: 'write somthing',
    size: 60,
    color: 'white',
    align: 'start',
    pos: { x: 80, y: 80 }
}) {
    // console.log(line.pos)
    gCtx.lineWidth = 2
    // gCtx.strokeStyle = 'white'
    gCtx.fillStyle = line.color
    gCtx.font = `${line.size}px Arial`
    gCtx.textAlign = line.align
    gCtx.fillText(line.txt, line.pos.x, line.pos.y) // Draws (fills) a given text at the given (x, y) position.
    // gCtx.strokeText(line.txt, line.pos.xE, line.pos.yE) // Draws (strokes) a given text at the given (x, y) position.

}
function drawBorder(line) {
    const lineWidth = getLineWidth(line.txt)
    gCtx.strokeStyle = 'rgba(255, 255, 255, 0.7)'
    gCtx.strokeRect(line.pos.x, line.pos.y - line.size, lineWidth, line.size)

}
function doUploadImg(imgDataUrl, onSuccess) {
    // Upload the image to a server, get back a URL 
    // call the function onSuccess when done


    // Pack the image for delivery
    const formData = new FormData()
    formData.append('img', imgDataUrl)

    // Send a post req with the image to the server
    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
        // If the request is not done, we have no business here yet, so return
        if (XHR.readyState !== XMLHttpRequest.DONE) return
        // if the response is not ok, show an error
        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR
        // Same as
        // const url = XHR.responseText

        // If the response is ok, call the onSuccess callback function, 
        // that will create the link to facebook using the url we got
        console.log('Got back live url:', url)
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}
function getLineWidth(txt) {
    let textMetrics = gCtx.measureText(txt)
    // let textMetrics1 = gCtx.measureText('write somthing')
    // console.log(textMetrics1.width)
    return textMetrics.width

}

//onClick functions//
function onSetTxt(value) {
    setLineTxt(value, getLineWidth(value))
    renderMeme()
}
function onSaveMeme() {
    saveMeme()
}
function onImgClick(elImg) {
    const imgId = +elImg.dataset.id
    setMemeImg(imgId)
    renderMeme()
    _onEditorPage()
    resizeCanvas()
}
function onHomePage() {
    document.querySelector('.main-gallery-content').classList.remove('hide')
    document.querySelector('.editor').classList.add('hide')
    document.querySelector('.main-saved-content').classList.add('hide')
}
function onDownloadMeme(elLink) {
    _renderMemeWithNoBorders()
    const memeContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = memeContent
}
function onSetTxtColor(value) {
    setTxtColor(value)
    renderMeme()
}
function onIncreaseFontSize() {
    increaseFontSize()
    renderMeme()
}
function onDecreaseFontSize() {
    decreaseFontSize()
    renderMeme()
}
function onSearch(value) {
    console.log('filtering')
    setFilterByKeyWords(value)
    renderGallery()
}
function onAddLine() {
    addLine()
    renderMeme()
}
function onSwitchLine() {
    switchLine()
    renderMeme()

}
function onFlexible() {
    setRandomImg()
    renderMeme()
    resizeCanvas()
}
function onLineDelete() {
    deleteLine(getMemeLine())
    renderMeme()
}
function onAlignTxt(elBtn) {
    const direction = elBtn.dataset.id
    console.log(direction)
    switch (direction) {
        case 'left':
            alignTxt('end')
            break
        case 'center':
            alignTxt('start')
            break
        case 'right':
            alignTxt('center')
            break
    }
    renderMeme()
}
function onSavedPage() {
    document.querySelector('.main-saved-content').classList.remove('hide')
    document.querySelector('.main-gallery-content').classList.add('hide')
    document.querySelector('.editor').classList.add('hide')
    renderSavedGallery()

}
function onSavedImgClick(elImg) {
    const imgId = +elImg.dataset.id
    uploadMeme(imgId)
    _onEditorPage()
    renderMeme()
    resizeCanvas()
}
function onShareImg() {
    // Gets the image from the canvas
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')

    function onSuccess(uploadedImgUrl) {
        // Handle some special characters
        const url = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
    }

    // Send the image to the server
    doUploadImg(imgDataUrl, onSuccess)
}

//mouse events//
function onClick(ev) {
    const pos = getEvPos(ev)
    if (!isLineClicked(pos)) return
    renderMeme()

}
function onDown(ev) {
    const pos = getEvPos(ev)

}
function getEvPos(ev) {
    // console.log(ev)

    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        // Prevent triggering the mouse ev
        ev.preventDefault()
        // Gets the first touch point
        ev = ev.changedTouches[0]
        // Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

//"solo" functions//
function _renderMemeWithNoBorders() {
    gIsBorders = false
    renderMeme()
    gIsBorders = true
}
function _onEditorPage() {
    document.querySelector('.main-gallery-content').classList.add('hide')
    document.querySelector('.main-saved-content').classList.add('hide')
    document.querySelector('.editor').classList.remove('hide')
    document.querySelector('.type-input').focus()

}

//listeners//
function _addMouseListeners() {
    gElCanvas.addEventListener('click', onClick)
    gElCanvas.addEventListener('mousedown', onDown)
    // gElCanvas.addEventListener('mousemove', onMove)
    // gElCanvas.addEventListener('mouseup', onUp)
}
function _addTouchListeners() {
    //     gElCanvas.addEventListener('touchstart', onDown)
    //     gElCanvas.addEventListener('touchmove', onMove)
    //     gElCanvas.addEventListener('touchend', onUp)
}