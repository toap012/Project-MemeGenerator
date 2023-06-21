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
        drawText(getMeme().lines[0].txt, gElCanvas.width / 2, 100)
    }
}

function drawText(text, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'brown'
    gCtx.fillStyle = 'black'
    gCtx.font = '40px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.
}
function onSetTxt(value) {
    setLineTxt(value)
    renderMeme()
}
function onImgClick(elImg) {
    const imgId = +elImg.dataset.id
    setMemeImg(imgId)
    renderMeme()


}