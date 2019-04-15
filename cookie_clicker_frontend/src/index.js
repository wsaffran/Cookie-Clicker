// DOM elements & variables
const cookies = document.querySelector('#cookie-count')
const clickCookie = document.querySelector('#cookie-click')

const ianButton = document.querySelector('#ian')
const ianSpan = document.querySelector('#ian-amount')

const vickyButton = document.querySelector('#vicky')
const vickySpan = document.querySelector('#vicky-amount')

const alexButton = document.querySelector('#alex')
const alexSpan = document.querySelector('#alex-amount')

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
let iansCost = 20
let ianscps = .1

let vickys = 0
let vickysCost = 20
let vickyscps = .1

let alexs = 0
let alexsCost = 250
let alexscps = 1




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
  if (e.target.id === 'ian' && numCookies >= iansCost) {
    numCookies -= iansCost
    iansCost *= 1.15
    document.querySelector('#ian-cost').innerText = `${Math.round(iansCost)}`
    cps += ianscps
    ianscps *= 1.3
    ians += 1
    cookies.innerText = Math.floor(numCookies)
    ianSpan.innerText = ians
    cpsSpan.innerHTML = `${Math.round( cps * 10 ) / 10} cookies per second`
  }
})

vicky.addEventListener('click', (e) => {
  if (e.target.id === 'vicky' && numCookies >= vickysCost) {
    numCookies -= vickysCost
    vickysCost *= 1.15
    document.querySelector('#vicky-cost').innerText = `${Math.round(vickysCost)}`
    cps += vickyscps
    vickyscps *= 1.3
    vickys += 1
    cookies.innerText = Math.floor(numCookies)
    vickySpan.innerText = vickys
    cpsSpan.innerHTML = `${Math.round( cps * 10 ) / 10} cookies per second`
  }
})

alex.addEventListener('click', (e) => {
  if (e.target.id === 'alex' && numCookies >= alexsCost) {
    numCookies -= alexsCost
    alexsCost *= 1.5
    document.querySelector('#alex-cost').innerText = `${Math.round(alexsCost)}`
    cps += alexscps
    alexscps *= 1.75
    alexs += 1
    cookies.innerText = Math.floor(numCookies)
    alexSpan.innerText = alexs
    cpsSpan.innerHTML = `${Math.round( cps * 10 ) / 10} cookies per second`
  }
})

// convert to HTML
function highscoreToHTML(highscore) {
  return `<li>${highscore.name}: ${highscore.highscore} cookies</li>`
}

// add elements to DOM
function renderHighscores() {
  const ol = document.createElement('ol')
  ol.setAttribute('id', 'highscore-list')
  fetchHighscores()
  .then(json => {
    let sortedList = json.sort(function(a, b) {
      return a.highscore - b.highscore
    })
    sortedList.reverse().slice(1,11).forEach(highscore => {
      ol.innerHTML += highscoreToHTML(highscore)
    })
  })
  document.querySelector('#highscore-list').appendChild(ol)
}

// fetches
function fetchHighscores() {
  return fetch('http://localhost:3000/players')
  .then(res => res.json())
}

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

renderHighscores()

let cookieRate = setInterval(function() {
  if (numCookies < iansCost) {
    ian.disabled = true
  }
  if (numCookies >= iansCost) {
    ian.disabled = false
  }
  if (numCookies < vickysCost) {
    vicky.disabled = true
  }
  if (numCookies >= vickysCost) {
    vicky.disabled = false
  }
  if (numCookies < alexsCost) {
    alex.disabled = true
  }
  if (numCookies >= alexsCost) {
    alex.disabled = false
  }
  numCookies += cps
  cookies.innerText = Math.floor(numCookies)}, 1000)
