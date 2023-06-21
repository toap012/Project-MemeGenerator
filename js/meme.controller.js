'use strict'
let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    console.log('hi');
    resizeCanvas()
    renderCanvas()
    renderMeme()


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
            drawText(line, gElCanvas.width / 2)
        })
    }
}

function drawText(line, x) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = line.color
    gCtx.font = `${line.size}px Arial`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(line.txt, x, line.hight) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(line.txt, x, line.hight) // Draws (strokes) a given text at the given (x, y) position.
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
    addLine()
    renderMeme()
}
function _onEditorPage() {
    document.querySelector('.gallery').classList.add('hide')
    document.querySelector('.editor').classList.remove('hide')

}