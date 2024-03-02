'use strict'


var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines:
        [{ txt: 'your text here', size: 45, color: 'white', x: 275, y: 40, isDrag : false}]
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
        var newLine = { txt: 'enter text', size: 45, color: 'white', x: canvasWidth / 2, y: canvasWidth - 40, isDrag : false }
    }
    else {
        var newLine = { txt: 'enter text', size: 45, color: 'white', x: canvasWidth / 2, y: canvasWidth / 2, isDrag : false }
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

function changeSelectedLine({ offsetX, offsetY }) {
    const hoveredLineIdx = gMeme.lines.findIndex(line => {
        const { y } = line
        return (offsetY >= y - 30 && offsetY <= 60 + y)
    })
    if (hoveredLineIdx === -1) return
    else gMeme.selectedLineIdx = hoveredLineIdx
}

function isLineClicked(offsetY) {
    const hoveredLineIdx = gMeme.lines.findIndex(line => {
        const { y } = line
        return (offsetY >= y - 30 && offsetY <= 60 + y)
    })
    if (hoveredLineIdx === -1) return false
    else {
        return hoveredLineIdx
    }
}


function moveLine(dx, dy,lineIdx) {
    gMeme.lines[lineIdx].x += dx
    gMeme.lines[lineIdx].y += dy
}


function setCircleDrag(isDrag) {
	gMeme.lines[lineIdx].isDrag = isDrag
}