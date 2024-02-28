'use strict'

let gElCanvas
let gCtx

function onInit() {
    console.log('yas yas yas')
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    renderMeme()
    drawText('Hello', 232, 52)

}

function renderMeme() {
    let meme = getMeme()
    let line = meme.lines
    var img = new Image()
    img.src = `img/${meme.selectedImgId}.jpg`
    img.onload = () => {
        gCtx.drawImage(img, 0, 0)
        drawText(line[0].txt, 200, 60)
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

