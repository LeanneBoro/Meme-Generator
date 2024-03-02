'use strict'


var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines:
        [{ txt: 'your text here', size: 45, color: 'white', x: 275, y: 40, isDrag: false, dir: 'center', font: 'Impact' }]
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
    let canvasWidth = getCanvasWidth()
    if (gMeme.lines.length === 1) {
        var newLine = { txt: 'enter text', size: 45, color: 'white', x: canvasWidth / 2, y: canvasWidth - 40, isDrag: false, dir: 'center', font: 'Impact' }
    }
    else {
        var newLine = { txt: 'enter text', size: 45, color: 'white', x: canvasWidth / 2, y: canvasWidth / 2, isDrag: false, dir: 'center', font: 'Impact' }
    }
    gMeme.lines.push(newLine)
}

function switchLines() {
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx++
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

function changeSelectedLine({ offsetY }) {
    const hoveredLineIdx = gMeme.lines.findIndex(line => {
        const { y } = line
        return (offsetY >= y - 30 && offsetY <= 60 + y)
    })
    if (hoveredLineIdx === -1) return
    else gMeme.selectedLineIdx = hoveredLineIdx
}

function isLineClicked({ y }) {
    const hoveredLineIdx = gMeme.lines.findIndex(line => {
        const { y } = line
        return (y >= y - 30 && y <= 60 + y)
    })
    if (hoveredLineIdx === -1) return false
    return true
}


function moveLine(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].x += dx
    gMeme.lines[gMeme.selectedLineIdx].y += dy
}


function setLineDragTrue() {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = true
}

function setLineDragFalse() {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = false
}

function getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function changeTextDir(dir) {
    gMeme.lines[gMeme.selectedLineIdx].dir = dir
}

function changeFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

function getRandomMeme() {
    return {
        selectedImgId: getRandomImg(),
        selectedLineIdx: 0,
        lines:
            [{ txt: makeRandomSentence(), size: 45, color: getRandomColor(), x: 275, y: 40, isDrag: false, dir: 'center', font: 'Impact' },
            { txt: makeRandomSentence(), size: 45, color: getRandomColor(), x: 550 / 2, y: 550 - 40, isDrag: false, dir: 'center', font: 'Impact' }]
    }
}
