'use strict'

let gElCanvas
let gCtx
let gRectangles
const gRectLength = 60
const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']
var gStartPos


function onInit() {
    renderImages()
    renderSearchKeyWords()
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    addListeners()
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


function drawLine(line) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = line.color
    gCtx.font = line.size + `px ${line.font}`
    gCtx.textAlign = line.dir
    gCtx.textBaseline = 'middle'
    gCtx.fillText(line.txt, line.x, line.y)
    gCtx.strokeText(line.txt, line.x, line.y)
}

function drawText(lines) {
    lines.map(line => {
        drawLine(line)
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

function showGallery() {
    let elEditor = document.querySelector('.editor')
    let elGallery = document.querySelector('.gallery')

    elEditor.classList.add('hidden')
    elGallery.classList.remove('hidden')
}
function downloadImg(elLink) {
    console.log('im tryinf!!!')
    elLink.download = 'my-img'
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
}

function onSetTextColor({ value }) {
    document.getElementById('.create-color').classList.remove('hidden')
    console.log(value)
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
    addLine()
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

function addListeners() {
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}


function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVENTS.includes(ev.type)) {

        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function onDown(ev) {
    gStartPos = getEvPos(ev)
    if (!isLineClicked(gStartPos)) return
    setLineDragTrue()
    document.body.style.cursor = 'grabbing'
}

function onMove(eve) {
    const line = getSelectedLine()
    if (!line.isDrag) return
    const pos = getEvPos(eve)

    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy)
    gStartPos = pos
    renderMeme()
}

function onUp() {
    setLineDragFalse()
    document.body.style.cursor = 'default'
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')

    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function onChangeTextDir(dir) {
    changeTextDir(dir)
    renderMeme()
}

function onChangeFont(elInput) {
    changeFont(elInput.value)
    renderMeme()
}

function showModal() {
    let elModal = document.querySelector('.share')
    elModal.showModal()
}

function renderRandomMeme() {

    let meme = getRandomMeme()
    let line = meme.lines[meme.selectedLineIdx]

    var img = new Image()
    img.src = `img/${meme.selectedImgId}.jpg`
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(meme.lines)
        addRect(line)
    }
    showEditor()
}

function onSetFilterBy({ value }) {
    setFilterBy(value)
    console.log(value)
}

function setFilterByKeyword(value,size){
    setFilterBy(value)
}