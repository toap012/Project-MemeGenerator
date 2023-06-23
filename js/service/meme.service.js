'use strict'
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
    lines: [
        {
            txt: 'write somthing',
            size: 60,
            color: 'white',
            align: 'start',
            isSelected: false,
            id: makeId(2),
            pos: { x: 80, y: 80 },
            width: 386.806640625
        }
    ]
}
var gSavedMemes = []
var gFilterBy = {
    keywords: ''
}

function getSavedImgsToDisplay(memes) {
    const imgUrls = []
    console.log(memes)
    memes.forEach(meme =>
        imgUrls.push(getImgById(meme.selectedImgId).url))
    return imgUrls
}
function saveMeme() {
    console.log(gSavedMemes)
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
    gMeme.lines[gMeme.selectedLineIdx].align = direction
}
function uploadMeme(idx) {
    const savedMemes = loadFromLocalStorage(LOCAL_STORAGE_KEY)
    gMeme = savedMemes[idx - 1]
}
function getMeme() {
    const chosenImg = getImgById(gMeme.selectedImgId)
    const meme = { url: chosenImg.url, lines: gMeme.lines }
    return meme
}
function getMemeLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}
function getMemeLines() {
    return gMeme.lines
}
// function setPos(idx, pos) {
//     gMeme.lines[idx].pos = pos
// }
function getImgById(id) {
    return gImgs.find(img => img.id === id)
}
function setLineTxt(value, width) {
    gMeme.lines[gMeme.selectedLineIdx].txt = value
    gMeme.lines[gMeme.selectedLineIdx].width = width
}
function setMemeImg(imgId) {
    gMeme.selectedImgId = imgId
}
function setRandomImg() {
    gMeme.selectedImgId = getRandomInt(0, 19)
}
function deleteLine(line) {
    gMeme.lines.splice(line, 1)
}
function setFilterByKeyWords(value) {
    gFilterBy.keywords = value
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
    gMeme.lines.push({
        txt: 'write somthing',
        size: 60,
        color: 'white',
        align: 'start',
        isSelected: false,
        id: makeId(2),
        pos: { x: 80, y: 450 },
        width: 386.806640625
    })
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    console.log(gMeme.selectedLineIdx)
}
function switchLine() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx > gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
}

function getLineById(lineId) {
    return gMeme.lines.find(line => line.id === lineId)
}
function isLineClicked(clickedPos) {
    console.log(clickedPos)
    var line = gMeme.lines.find(line =>
        // console.log(line.pos)
        clickedPos.x <= line.pos.x + line.width && clickedPos.x >= line.pos.x &&
        clickedPos.y <= line.pos.y && clickedPos.y >= line.pos.y - line.size
    );
    console.log(line)
    if (line === undefined) return false
    console.log('clicked')
    const currLine = getLineById(line.id)
    gMeme.selectedLineIdx = gMeme.lines.findIndex(line => line.id === currLine.id)
    return true
}
