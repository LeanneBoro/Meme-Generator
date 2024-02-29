'use strict'

let gElCanvas
let gCtx

function onInit() {
    renderImages()
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
}

function renderMeme() {
    let meme = getMeme()
    let line = meme.lines
    var img = new Image()
    img.src = `img/${meme.selectedImgId}.jpg`
    img.onload = () => {
        gCtx.drawImage(img, 0, 0)
        drawText(line[meme.selectedLineIdx], 200, 30)
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


function onImgSelect({ id }) {
    setImg(id)
    showEditor()
    renderMeme()
}


function showEditor() {
    let elEditor = document.querySelector('.editor')
    let elGallery = document.querySelector('.gallery')

    elEditor.classList.remove('hidden')
    elGallery.classList.add('hidden')

}

function downloadImg(elLink) {
    elLink.download = 'my-img'
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
}

function onSetColor({ value }) {
    setColor(value)
    renderMeme()
}