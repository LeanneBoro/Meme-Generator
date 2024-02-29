'use strict'

var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] },
{ id: 2, url: 'img/2.jpg', keywords: ['cute', 'dog'] },]


function renderImages() {
    const strHTMLs = gImgs.map(img => {
        return `
                <img src="${img.url}" />`
    })

    let elGallery = document.querySelector('.gallery')
    elGallery.innerHTML = strHTMLs.join('')

}