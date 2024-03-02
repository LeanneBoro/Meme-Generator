'use strict'

let gElCanvas
let gCtx
let gRectangles
const gRectLength = 60
const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']
var gStartPos


function onInit() {
    renderImages()
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
    console.log(getMeme())
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

function onDown(ev) {

    gStartPos = getEvPos(ev) 
    if (!isLineClicked(gStartPos)) return
    document.body.style.cursor = 'grabbing'
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

function onMove(eve) {
    let lineIdx = isLineClicked(eve.offsetY)

    const pos = getEvPos(eve)
    // // Calc the delta, the diff we moved
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy,lineIdx)

    // // Save the last pos, we remember where we`ve been and move accordingly
    gStartPos = pos

    // // The canvas is rendered again after every move
    renderMeme()
}

function onUp() {
    setLineDrag(false)
    document.body.style.cursor = 'grab'
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')

    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}