'use strict'

function renderGallery() {
    const elGallery = document.querySelector('.gallery-container')
    const imgUrls = getImgsToDisplay()
    if (!imgUrls) return
    const strHTMLS = []
    var id = 1
    imgUrls.map(imgUrl => {
        strHTMLS.push(`<img src='${imgUrl}'class="gallery-item" data-id="${id}" onclick="onImgClick(this)">`)
        id++

    })
    elGallery.innerHTML = strHTMLS.join('')
}

