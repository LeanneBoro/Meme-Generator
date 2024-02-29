'use strict'

let gElCanvas
let gCtx

function onInit() {
    renderImages()
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    // renderMeme()

}

function renderMeme() {
    let meme = getMeme()
    let line = meme.lines
    let lineIdx = meme.selectedLineIdx
    var img = new Image()
    img.src = `img/${meme.selectedImgId}.jpg`
    img.onload = () => {
        gCtx.drawImage(img, 0, 0)
        drawText(line[lineIdx],200, 30)
    }
}

function drawText(line, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = line.color
    gCtx.fillStyle = line.color
    gCtx.font = line.size + 'px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(line.txt, x, y)
    gCtx.strokeText(line.txt, x, y)
}

function onEnterText({ value }) {
    setLineTxt(value)
    renderMeme()
}