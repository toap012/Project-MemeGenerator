'use strict'
var gImgs = [
    { id: 1, url: 'img/meme-imgs (square)/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'img/meme-imgs (square)/2.jpg', keywords: ['funny', 'cat'] },
    { id: 3, url: 'img/meme-imgs (square)/3.jpg', keywords: ['funny', 'cat'] },
    { id: 4, url: 'img/meme-imgs (square)/4.jpg', keywords: ['funny', 'cat'] },
    { id: 5, url: 'img/meme-imgs (square)/5.jpg', keywords: ['funny', 'cat'] },
    { id: 6, url: 'img/meme-imgs (square)/6.jpg', keywords: ['funny', 'cat'] },
    { id: 7, url: 'img/meme-imgs (square)/7.jpg', keywords: ['funny', 'cat'] },
    { id: 8, url: 'img/meme-imgs (square)/8.jpg', keywords: ['funny', 'cat'] },
    { id: 9, url: 'img/meme-imgs (square)/9.jpg', keywords: ['funny', 'cat'] },
    { id: 10, url: 'img/meme-imgs (square)/10.jpg', keywords: ['funny', 'cat'] },
    { id: 11, url: 'img/meme-imgs (square)/11.jpg', keywords: ['funny', 'cat'] },
    { id: 12, url: 'img/meme-imgs (square)/12.jpg', keywords: ['funny', 'cat'] },
    { id: 13, url: 'img/meme-imgs (square)/13.jpg', keywords: ['funny', 'cat'] },
    { id: 14, url: 'img/meme-imgs (square)/14.jpg', keywords: ['funny', 'cat'] },
    { id: 15, url: 'img/meme-imgs (square)/15.jpg', keywords: ['funny', 'cat'] },
    { id: 16, url: 'img/meme-imgs (square)/16.jpg', keywords: ['funny', 'cat'] },
    { id: 17, url: 'img/meme-imgs (square)/17.jpg', keywords: ['funny', 'cat'] },
    { id: 18, url: 'img/meme-imgs (square)/18.jpg', keywords: ['funny', 'cat'] },

]
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'write somthing',
            size: 60,
            color: 'black',
            isSelected: false,
            id: makeId(2),
            pos: { x: 80, y: 80 }
            // width: 0
        }
    ]
}
var gBorders = []


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
function setPos(idx, pos) {
    gMeme.lines[idx].pos = pos
}
function getImgById(id) {
    return gImgs.find(img => img.id === id)
}
function setLineTxt(value) {
    gMeme.lines[gMeme.selectedLineIdx].txt = value
}
function setMemeImg(imgId) {
    gMeme.selectedImgId = imgId
}
function getImgsToDisplay() {
    var urls = []
    gImgs.forEach(img => {
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
        color: 'black',
        isSelected: false,
        id: makeId(2)
    })
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    console.log(gMeme.selectedLineIdx)
}
function switchLine() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx > gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
}


// function setBorder(pos) {
//     if (gBorders.length === 0) {
//         gBorders.push(pos)
//         return
//     }
//     var currBorderIdx = gBorders.findIndex(border => border.id === pos.id)
//     if (!currBorderIdx && currBorderIdx !== 0) {
//         gBorders.push(pos)
//         return
//     } else {
//         gBorders[currBorderIdx] = pos
//     }

// }
function getLineById(lineId) {
    return lineId.find(line => line.id === lineId)
}
function isLineClicked(clickedPos) {
    console.log(clickedPos)
    var line = gMeme.lines.find(line => {
        // console.log(line.pos)
        clickedPos.x <= line.pos.xE + 367 && clickedPos.x >= line.pos.xS - 160 &&
            clickedPos.y <= line.pos.yE && clickedPos.y >= line.pos.yS - 20
    });
    console.log(line)
    if (line === undefined) return false
    console.log('clicked')
    const lineId = getLineById(line.id)
    gMeme.selectedLineIdx = gMeme.lines.findIndex(line => line.id === lineId)
    return true
}

// function isBorderClicked(clickedPos) {
//     console.log(clickedPos)
//     console.log(gBorders)
//     for (var i = 0; i < gBorders.length; i++) {
//         const currBorder = gBorders[i]
//         if (currBorder.xS <= clickedPos.x && currBorder.xE >= clickedPos.x &&
//             currBorder.yS <= clickedPos.y && currBorder.yE >= clickedPos.y) {
//             console.log('clicked');
//         }





//     }

// }