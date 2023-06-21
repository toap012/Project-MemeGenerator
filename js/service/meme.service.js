'use strict'
var gImgs = [
    { id: 1, url: 'img/meme-imgs (square)/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'img/meme-imgs (square)/2.jpg', keywords: ['funny', 'cat'] },
    { id: 3, url: 'img/meme-imgs (square)/3.jpg', keywords: ['funny', 'cat'] },
    { id: 4, url: 'img/meme-imgs (square)/4.jpg', keywords: ['funny', 'cat'] },

]
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'write somthing',
            size: 20,
            color: 'red'
        }
    ]
}


function getMeme() {
    const chosenImg = getImgById(gMeme.selectedImgId)
    const meme = { url: chosenImg.url, lines: gMeme.lines }
    return meme
}
function getImgById(id) {
    return gImgs.find(img => img.id === id)
}
function setLineTxt(value) {
    gMeme.lines[0].txt = value
}
function setMemeImg(imgId) {
    gMeme.selectedImgId = imgId
}