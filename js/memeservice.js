'use strict'

var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] },
{ id: 2, url: 'img/2.jpg', keywords: ['cute', 'dog'] },]

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0, 
    lines:
    [ { txt: 'haha', size: 20, color: 'red' } ] 
}

function getMeme() {
    return gMeme
}