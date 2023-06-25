'use strict'

//global variables//
const LOCAL_STORAGE_KEY = 'memeDB'
var gImgs = [
    { id: 1, url: 'img/meme-imgs (square)/1.jpg', keywords: ['trump', 'celebrity'] },
    { id: 2, url: 'img/meme-imgs (square)/2.jpg', keywords: ['dog', 'cute'] },
    { id: 3, url: 'img/meme-imgs (square)/3.jpg', keywords: ['dog', 'baby', 'cute'] },
    { id: 4, url: 'img/meme-imgs (square)/4.jpg', keywords: ['cat', 'cute'] },
    { id: 5, url: 'img/meme-imgs (square)/5.jpg', keywords: ['strong', 'baby'] },
    { id: 6, url: 'img/meme-imgs (square)/6.jpg', keywords: ['idea', 'history'] },
    { id: 7, url: 'img/meme-imgs (square)/7.jpg', keywords: ['funny', 'baby'] },
    { id: 8, url: 'img/meme-imgs (square)/8.jpg', keywords: ['chocolate', 'interesting'] },
    { id: 9, url: 'img/meme-imgs (square)/9.jpg', keywords: ['baby', 'chinese', 'funny'] },
    { id: 10, url: 'img/meme-imgs (square)/10.jpg', keywords: ['obama', 'celebrity', 'funny'] },
    { id: 11, url: 'img/meme-imgs (square)/11.jpg', keywords: ['gay', 'wrestling  ', 'love'] },
    { id: 12, url: 'img/meme-imgs (square)/12.jpg', keywords: ['idea', 'you', 'grandpa'] },
    { id: 13, url: 'img/meme-imgs (square)/13.jpg', keywords: ['cheers', 'celebrity'] },
    { id: 14, url: 'img/meme-imgs (square)/14.jpg', keywords: ['movie', 'shock', 'celebrity'] },
    { id: 15, url: 'img/meme-imgs (square)/15.jpg', keywords: ['movie', 'celebrity', 'you'] },
    { id: 16, url: 'img/meme-imgs (square)/16.jpg', keywords: ['movie', 'love', 'idea'] },
    { id: 17, url: 'img/meme-imgs (square)/17.jpg', keywords: ['potin', 'celebrity'] },
    { id: 18, url: 'img/meme-imgs (square)/18.jpg', keywords: ['toy', 'movie', 'idea'] },

]

var gMeme = {
    id: makeId(3),
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [_createLine()]
}
var gSavedMemes = []
var gFilterBy = {
    keywords: ''
}
var gLineCount = 0


//return functions//
function getSavedImgsToDisplay(memes) {
    const imgUrls = []
    // console.log(memes)
    memes.forEach(meme =>
        imgUrls.push(getImgById(meme.selectedImgId).url))
    return imgUrls
}
function getMeme() {
    const chosenImg = getImgById(gMeme.selectedImgId)
    const meme = { url: chosenImg.url, lines: gMeme.lines }
    return meme
}
function getImgsToDisplay() {
    var urls = []
    var imgs = []
    if (gFilterBy.keywords) {
        gImgs.forEach(img => {
            const isImgFiltered = img.keywords.some(keyword => gFilterBy.keywords.includes(keyword))
            if (isImgFiltered) {
                imgs.push(img)
            }
        })
    } else {
        imgs = gImgs
    }

    if (!imgs) return false
    imgs.forEach(img => {
        urls.push(img.url)
    })
    return urls
}
function getMemeLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}
function getMemeLines() {
    // console.log(gMeme)
    return gMeme.lines
}
function getImgById(id) {
    return gImgs.find(img => img.id === id)
}
function getLineById(lineId) {
    return gMeme.lines.find(line => line.id === lineId)
}


//dom update functions//
function saveMeme() {
    // console.log(gSavedMemes)
    const savedMemes = loadFromLocalStorage(LOCAL_STORAGE_KEY)
    console.log(savedMemes)
    if (!savedMemes) {
        gMeme.id = makeId(3)
        gSavedMemes.push(gMeme)
        saveToLocalStorage(LOCAL_STORAGE_KEY, gSavedMemes)
        console.log(gSavedMemes)
        return
    }
    const meme = savedMemes.find(savedMeme => savedMeme.id === gMeme.id)
    console.log(meme)
    if (!meme) {
        gMeme.id = makeId(3)
        gSavedMemes.push(gMeme)
        saveToLocalStorage(LOCAL_STORAGE_KEY, gSavedMemes)
        console.log(gSavedMemes)
        return
    }
    const memeIdx = savedMemes.findIndex(savedMeme => savedMeme.id === meme.id)
    savedMemes.splice(memeIdx, 1)
    savedMemes.push(meme)

    saveToLocalStorage(LOCAL_STORAGE_KEY, savedMemes)
}
function alignTxt(direction) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x = direction
}
function uploadMeme(idx) {
    const savedMemes = loadFromLocalStorage(LOCAL_STORAGE_KEY)
    gMeme = savedMemes[idx - 1]
}
function setLineTxt(value, width) {
    gMeme.lines[gMeme.selectedLineIdx].txt = value
    gMeme.lines[gMeme.selectedLineIdx].width = width
}
function setMemeImg(imgId) {
    gMeme.selectedImgId = imgId
    gMeme.lines = [_createLine()]
}
function setRandomImg() {
    gMeme.selectedImgId = getRandomInt(0, 19)
}
function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx = gMeme.lines.length - 1

}
function setFilterByKeyWords(value) {
    gFilterBy.keywords = value
}
function setTxtColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}
function increaseFontSize() {
    gMeme.lines[gMeme.selectedLineIdx].size += 10
}
function decreaseFontSize() {
    gMeme.lines[gMeme.selectedLineIdx].size -= 10
}
function addLine() {
    var y
    switch (gMeme.lines.length) {
        case 0:
            y = gElCanvas.height * 0.2
            break
        case 1:
            y = gElCanvas.height * 0.8
            break
        case 2:
            y = gElCanvas.height / 2
            break
    }
    if (gMeme.lines.length > 2) y = gElCanvas.height / 2 + getRandomInt(10, 100)
    var newLine = _createLine(y)
    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}
function setLineCoords(x, y) {
    gMeme.lines.forEach((line, idx) => {
        switch (idx) {
            case 0:
                line.pos.y = y * 0.1
                break
            case 1:
                line.pos.y = y * 0.9
                break
            case 2:
                line.pos.y = y * 0.55
                break
        }
        line.pos.x = x

    })
}
function switchLine() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx > gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
}


//validate functions//
function isLineClicked(clickedPos) {
    // console.log(clickedPos)
    var line = gMeme.lines.find(line =>
        // console.log(line.pos)
        clickedPos.x <= line.pos.x + line.width && clickedPos.x >= line.pos.x &&
        clickedPos.y <= line.pos.y && clickedPos.y >= line.pos.y - line.size
    );
    // console.log(line)
    if (line === undefined) return false
    console.log('clicked')
    const currLine = getLineById(line.id)
    gMeme.selectedLineIdx = gMeme.lines.findIndex(line => line.id === currLine.id)
    return true
}


function _createLine(y = 80) {
    var line = {
        txt: 'write somthing',
        size: 40,
        color: 'white',
        align: 'start',
        isSelected: false,
        id: makeId(2),
        pos: { x: 140, y: y },
        width: 386.80664062
    }
    return line
}
