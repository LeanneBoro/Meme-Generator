'use strict'

var gFilterBy = ''

var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] },
{ id: 2, url: 'img/2.jpg', keywords: ['cute', 'dog', 'man'] },
{ id: 3, url: 'img/3.jpg', keywords: ['dog', 'baby'] },
{ id: 4, url: 'img/4.jpg', keywords: ['cute', 'cat'] },
{ id: 5, url: 'img/5.jpg', keywords: ['cute', 'baby'] },
{ id: 6, url: 'img/6.jpg', keywords: ['funny', 'man'] },
{ id: 7, url: 'img/7.jpg', keywords: ['funny', 'baby'] },
{ id: 8, url: 'img/8.jpg', keywords: ['smile', 'man'] },
{ id: 9, url: 'img/9.jpg', keywords: ['smile', 'baby'] },
]

var gSearchKeywords = [
    { funny: 5 },
    { cat: 15 },
    { dog: 2 },
    { baby: 7 },
    { man: 3 },
    { smile: 2 },
    { cute: 10 },]

function renderSearchKeyWords() {
    let strHTMLs

    for (const keyword in gSearchKeywords) {
        console.log(keyword)
        console.log(gSearchKeywords[keyword])
        strHTMLs += `<li style = "font-size: ${keyword};" onclick="onSearchByKeyWord('${gSearchKeywords[keyword]}')">${keyword}</li>`
    }
    let elKeywords = document.querySelector('.keywords')
    // elKeywords.innerHTML = strHTMLs

}

function renderFilterOptions() {
    const strHTMLs = gSearchKeywords.map(keyword => {
        return `<option value="${keyword.word}"></option>`
    })
    let elOptions = document.querySelector('.options')
    elOptions.innerHTML = strHTMLs.join('')
}

function renderImages() {
    let imgs = getImages()
    const strHTMLs = imgs.map(img => {
        return `
                <img id="${img.id}" onclick="onImgSelect(this)" src="${img.url}" />`
    })

    let elGallery = document.querySelector('.img-container')
    elGallery.innerHTML = strHTMLs.join('')
}

function getRandomImg() {
    return getRandomInt(1, gImgs.length)
}

function setFilterBy(filter) {
    gFilterBy = filter
    renderImages()
}

function getImages() {
    if (!gFilterBy) return gImgs

    let imgs = gImgs.filter(img => {
        for (let keyword of img.keywords) {
            if (keyword.includes(gFilterBy)) {
                return true
            }
        }
        return false
    })
    return imgs
}

function clearFilter() {
    gFilterBy = null
    document.querySelector('.filter').value = ''
}
