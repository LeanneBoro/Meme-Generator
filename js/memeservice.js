'use strict'

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines:
        [{ txt: 'haha', size: 45, color: 'white' }]
}

function getMeme() {
    return gMeme
}

function setLineTxt(str) {
    gMeme.lines[gMeme.selectedLineIdx].txt = str
}