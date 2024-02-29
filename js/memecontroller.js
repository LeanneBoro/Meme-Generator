'use strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    renderMeme()

}

function renderMeme() {
    let meme = getMeme()
    let line = meme.lines
    let lineIdx = meme.selectedLineIdx
    var img = new Image()
    img.src = `img/${meme.selectedImgId}.jpg`
    img.onload = () => {
        gCtx.drawImage(img, 0, 0)
        drawText(line[lineIdx].txt,200, 30)
    }
}

function drawText(text, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'

    gCtx.fillStyle = 'white'

    gCtx.font = '45px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function onEnterText({ value }) {
    let meme = getMeme()
    let lineIdx = meme.selectedLineIdx
    meme.lines[lineIdx].txt = value
    renderMeme()
}