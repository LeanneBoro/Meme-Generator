'use strict'

let gElCanvas
let gCtx

function onInit() {
    console.log('yas yas yas')
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    window.addEventListener('resize', () => resizeCanvas())
    renderMeme()
}

function renderMeme() {
    const elImg = new Image()
    const str = 'enter text'
    elImg.src = 'img/15.jpg'
    elImg.onload = () =>
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function show(eve) {
    console.log(eve.offsetX)
    console.log(eve.offsetY)
}

function drawText(text, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'white'

    gCtx.fillStyle = 'lightsteelblue'

    gCtx.font = '45px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}
