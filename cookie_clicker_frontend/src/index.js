// DOM elements & variables
const cookies = document.querySelector('#cookie-count')
const clickCookie = document.querySelector('#cookie-click')

const ianButton = document.querySelector('#ian')
const ianSpan = ianButton.querySelector('span')

const vickyButton = document.querySelector('#vicky')
const vickySpan = vickyButton.querySelector('span')

const alexButton = document.querySelector('#alex')
const alexSpan = alexButton.querySelector('span')

const restartButton = document.querySelector('#restart-button')

const cpsSpan = document.querySelector('#cps')

const start = document.querySelector('#start')

const form = document.querySelector('.form')

let timer

// DOM setup
form.style.display = 'none'
cpsSpan.innerText = '0 cookies per second'

// Timer
let startTime = 60

// Application State
let numCookies = 0
let cps = 0
let ians = 0
let vickys = 0
let alexs = 0


// event listeners
restartButton.addEventListener('click', restart)

form.addEventListener('submit', (e) => {
  e.preventDefault()
  let value = e.target.querySelector('.input-text')
  let name = value.value
  let highscore = parseInt(numCookies)
  body = {name, highscore}
  fetchSubmitForm(body)
  value.value = ''
})

start.addEventListener('click', (e) => {
  timer = setInterval(() => {
    if (startTime !== 0) {
      start.innerText = startTime
      startTime--
    } else {
      start.innerText = 'Finished'
      submitGame()
    }
  }, 1000)
})

clickCookie.addEventListener('click', (e) => {
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
function fetchSubmitForm(body) {
  return fetch('http://localhost:3000/players', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then(res => res.json())
}

// functions
function submitGame() {
  cookieRate = clearInterval(cookieRate);
  document.querySelectorAll('button').forEach(button => {
    if (button.id !== 'restart-button') {
      button.disabled = true
    }
  })
  form.style.display = ''
}

function restart() {
  form.style.display = 'none'
  cpsSpan.innerText = '0 cookies per second'

  // Timer
  startTimer = 1

  // Application State
  startTime = 60
  numCookies = 0
  cps = 0
  ians = 0
  vickys = 0
  alexs = 0
  cookies.innerText = numCookies
  timer = clearInterval(timer);
  start.innerText = "START"


  document.querySelectorAll('button').forEach(button => {
      button.disabled = false
  })

}

// start app
let cookieRate = setInterval(function() {
  numCookies += cps
  cookies.innerText = Math.floor(numCookies)}, 1000)
