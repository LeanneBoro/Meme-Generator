'use strict'

let gElCanvas
let gCtx
let gRectangles
const gRectLength = 60


function onInit() {
    renderImages()
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
}

function renderMeme() {
    let meme = getMeme()
    let line = meme.lines[meme.selectedLineIdx]

    var img = new Image()
    img.src = `img/${meme.selectedImgId}.jpg`
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(meme.lines)
        addRect(line)
    }
}


function drawLine(line, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = line.color
    gCtx.font = line.size + 'px Impact'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(line.txt, x, y)
    gCtx.strokeText(line.txt, x, y)
}

function drawText(lines) {
    lines.map(line => {
        drawLine(line, line.x, line.y)
    })
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
function onDecreaseFont() {
    decreaseFont()
    renderMeme()
}
function onIncreaseFont() {
    increaseFont()
    renderMeme()
}
function onAddLine() {
    let newLine = addLine()
    renderMeme()
}
function onSwitchLine() {
    switchLines()
    renderMeme()
}
function addRect({ y }) {
    gCtx.beginPath()
    gCtx.rect(5, y - 30, gElCanvas.width - 10, gRectLength)
    gCtx.stroke()
}

function onMouseClick(ev) {
    changeSelectedLine(ev)
    renderMeme()
}

function onDeleteLine() {
    deleteLine()
    renderMeme()
}

function getCanvasWidth() {
    return gElCanvas.width
}