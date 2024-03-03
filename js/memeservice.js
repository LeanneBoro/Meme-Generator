'use strict'

var gRandomMode = false

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines:
        [{ txt: 'your text here', size: 45, color: 'white', x: 275, y: 40, isDrag: false, font: 'Impact', width: 270.81298 }]
}

function getMeme() {
    if (gRandomMode) {
        return getRandomMeme()
    }
    return gMeme
}

function setRandomMode(isRandom) {
    gRandomMode = isRandom
    console.log(gRandomMode)
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
        var newLine = { txt: 'enter text', size: 45, color: 'white', x: canvasWidth / 2, y: canvasWidth - 40, isDrag: false, font: 'Impact', width: 270.81298 }
    }
    else {
        var newLine = { txt: 'enter text', size: 45, color: 'white', x: canvasWidth / 2, y: canvasWidth / 2, isDrag: false, font: 'Impact', width: 270.81298 }
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

function isLineClicked({ x, y }) {
    const hoveredLineIdx = gMeme.lines.findIndex(line => {
        const { y, x } = line
        return (y >= y && y <= 60 + y && x >= x)
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
    if (dir === 'left') gMeme.lines[gMeme.selectedLineIdx].x = 200
    else if (dir === 'right') gMeme.lines[gMeme.selectedLineIdx].x = 400
    else gMeme.lines[gMeme.selectedLineIdx].x = 275 
}

function changeFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

function getRandomMeme() {
    return {
        selectedImgId: getRandomImg(),
        selectedLineIdx: 0,
        lines:
            [{ txt: makeRandomSentence(), size: 45, color: 'white', x: 275, y: 40, isDrag: false, dir: 'center', font: 'Impact', width: 270.81298 },
            { txt: makeRandomSentence(), size: 45, color: 'white', x: 550 / 2, y: 550 - 40, isDrag: false, dir: 'center', font: 'Impact', width: 270.81298 }]
    }
}

function updateLineWidth(width) {
    gMeme.lines[gMeme.selectedLineIdx].width = width
}