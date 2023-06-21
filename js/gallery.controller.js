'use strict'
renderGallery()
function renderGallery() {
    const elGallery = document.querySelector('.gallery-container')
    const strHTMLS = `
    <img src="img/meme-imgs (square)/1.jpg" alt="meme-img" class="gallery-item" data-id="1" onclick="onImgClick(this)">
    <img src="img/meme-imgs (square)/2.jpg" alt="meme-img" class="gallery-item" data-id="2" onclick="onImgClick(this)">
    <img src="img/meme-imgs (square)/3.jpg" alt="meme-img" class="gallery-item" data-id="3" onclick="onImgClick(this)">
    <img src="img/meme-imgs (square)/4.jpg" alt="meme-img" class="gallery-item" data-id="4" onclick="onImgClick(this)">
    
    `




    elGallery.innerHTML = strHTMLS
}

