'use strict'
function renderSavedGallery() {
    const elSavedGalllery = document.querySelector('.saved-gallery-container')
    const savedMemes = loadFromLocalStorage(LOCAL_STORAGE_KEY)
    const imgUrls = getSavedImgsToDisplay(savedMemes)
    const strHTMLS = []
    var id = 1
    imgUrls.map(imgUrl => {
        strHTMLS.push(`<img src='${imgUrl}'class="saved-gallery-item" data-id="${id}" onclick="onSavedImgClick(this)">`)
        id++
    })
    elSavedGalllery.innerHTML = strHTMLS.join('')
}
