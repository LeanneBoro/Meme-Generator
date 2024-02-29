'use strict'

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines:
        [{ txt: 'your text here', size: 45, color: 'white', x : 225 ,y: 40}]
}

function getMeme() {
    return gMeme
}
function setLineTxt(str) {
    gMeme.lines[gMeme.selectedLineIdx].txt = str
}
function setImg(id) {
    gMeme.selectedImgId = id
}
function setColor(newColor) {
    gMeme.lines[gMeme.selectedLineIdx].color = newColor
}
function decreaseFont() {
    gMeme.lines[gMeme.selectedLineIdx].size--
}
function increaseFont() {
    gMeme.lines[gMeme.selectedLineIdx].size++
}
function addLine() {
    let newLine = { txt: 'enter text', size: 45, color: 'white',x : 225, y : 420 }
    gMeme.lines.push(newLine)
    return newLine
}

function switchLines() {
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx++
}

