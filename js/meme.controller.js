'use strict'
let gElCanvas
let gCtx
let gId = 1
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
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
        lines.forEach(line => {
            drawText(line)
        })
        const line = getMemeLine()
        console.log(line)
        drawBorder(line)
    }
}

function drawText(line) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = line.color
    gCtx.font = `${line.size}px Arial`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(line.txt, line.pos.x, line.pos.y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(line.txt, line.pos.x, line.pos.y) // Draws (strokes) a given text at the given (x, y) position.

    // console.log(gCtx)
    // setBorder(newBordersCords)
}
function drawBorder(line) {
    // console.log(size)
    // console.log(hight)
    const borderCords = { xS: 0, yS: 0, xE: 0, yE: 0, id: gId }
    borderCords.xS = line.pos.x / 2 - line.size * 3.5 + 60 * 3.5
    borderCords.yS = line.pos.y + 10 - line.size
    borderCords.xE = line.pos.x + line.size * 8 - 60 * 8
    borderCords.yE = line.size * 2 - 20
    gCtx.strokeStyle = 'rgba(255, 255, 255, 0.353)'
    gCtx.strokeRect(borderCords.xS, borderCords.yS, borderCords.xE, borderCords.yE)

    return borderCords
}
function onSetTxt(value) {
    setLineTxt(value)
    renderMeme()
}
function onImgClick(elImg) {
    const imgId = +elImg.dataset.id
    setMemeImg(imgId)
    renderMeme()
    _onEditorPage()
    resizeCanvas()
}

function onHomePage() {
    document.querySelector('.gallery').classList.remove('hide')
    document.querySelector('.editor').classList.add('hide')
}
function onDownloadMeme(elLink) {
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
function onAddLine() {
    gId++
    addLine()
    renderMeme()
}
function onSwitchLine() {
    switchLine()
    renderMeme()

}
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
function _onEditorPage() {
    document.querySelector('.gallery').classList.add('hide')
    document.querySelector('.editor').classList.remove('hide')

}
//listener//
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