// DOM elements & variables
let cookies = document.querySelector('#cookie-count')
const clicker = document.querySelector('#cookie-click')
const ianButton = document.querySelector('#ian')
const ianSpan = ianButton.querySelector('span')
const vickyButton = document.querySelector('#vicky')
const vickySpan = vickyButton.querySelector('span')
const alexButton = document.querySelector('#alex')
const alexSpan = alexButton.querySelector('span')


const cpsSpan = document.querySelector('#cps')

// Application State
cpsSpan.innerText = '0 cookies per second'
let numCookies = 0
let cps = 0
let ians = 0
let vickys = 0
let alexs = 0


// event listeners
  clicker.addEventListener('click', (e) => {
  if (e.target.id === 'cookie-click') {
    numCookies += 1
    cookies.innerText = Math.floor(numCookies)
    cpsSpan.innerHTML = `${Math.round( cps * 10 ) / 10} cookies per second`
  }
})

ian.addEventListener('click', (e) => {
  if (e.target.id === 'ian' && numCookies >= 20) {
    numCookies -= 20
    cps += .1
    ians += 1
    cookies.innerText = Math.floor(numCookies)
    ianSpan.innerText = ians
    cpsSpan.innerHTML = `${Math.round( cps * 10 ) / 10} cookies per second`

  }
})

vicky.addEventListener('click', (e) => {
  if (e.target.id === 'vicky' && numCookies >= 20) {
    numCookies -= 20
    cps += .1
    vickys += 1
    cookies.innerText = Math.floor(numCookies)
    vickySpan.innerText = vickys
    cpsSpan.innerHTML = `${Math.round( cps * 10 ) / 10} cookies per second`
  }
})

alex.addEventListener('click', (e) => {
  if (e.target.id === 'alex' && numCookies >= 250) {
    numCookies -= 250
    cps += 1
    alexs += 1
    cookies.innerText = Math.floor(numCookies)
    alexSpan.innerText = alexs
    cpsSpan.innerHTML = `${Math.round( cps * 10 ) / 10} cookies per second`
  }
})




// convert to HTML

// add elements to DOM

// fetches

// start app

setInterval(function() {
  numCookies += cps
  cookies.innerText = Math.floor(numCookies)
}, 1000)
