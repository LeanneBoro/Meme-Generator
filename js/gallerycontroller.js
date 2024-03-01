'use strict'

var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] },
{ id: 2, url: 'img/2.jpg', keywords: ['cute', 'dog'] },
{ id: 3, url: 'img/3.jpg', keywords: ['cute', 'dog'] },
{ id: 4, url: 'img/4.jpg', keywords: ['cute', 'dog'] },
{ id: 5, url: 'img/5.jpg', keywords: ['cute', 'dog'] },
{ id: 6, url: 'img/6.jpg', keywords: ['cute', 'dog'] },
{ id: 7, url: 'img/7.jpg', keywords: ['cute', 'dog'] },
{ id: 8, url: 'img/8.jpg', keywords: ['cute', 'dog'] },
{ id: 9, url: 'img/9.jpg', keywords: ['cute', 'dog'] },
]


function renderImages() {
    const strHTMLs = gImgs.map(img => {
        return `
                <img id="${img.id}" onclick="onImgSelect(this)" src="${img.url}" />`
    })

    let elGallery = document.querySelector('.img-container')
    elGallery.innerHTML = strHTMLs.join('')
}