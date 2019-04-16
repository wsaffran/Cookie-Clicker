// DOM elements & variables
const cookies = document.querySelector('#cookie-count')
const clickCookie = document.querySelector('#cookie-click')

const ianButton = document.querySelector('#ian')
const ianSpan = document.querySelector('#ian-amount')

const vickyButton = document.querySelector('#vicky')
const vickySpan = document.querySelector('#vicky-amount')

const alexButton = document.querySelector('#alex')
const alexSpan = document.querySelector('#alex-amount')

const dcvButton = document.querySelector('#double-click-value')
const dcvCost = document.querySelector('#dcv-cost')

const increaseIanButton = document.querySelector("#increase-ian-value")
const increaseIanCost = document.querySelector("#increase-ian-cost")

const increaseVickyButton = document.querySelector("#increase-vicky-value")
const increaseVickyCost = document.querySelector("#increase-vicky-cost")

const increaseAlexButton = document.querySelector("#increase-alex-value")
const increaseAlexCost = document.querySelector("#increase-alex-cost")

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
let totalClicks = 0
let totalCookies = 0
let numCookies = 0
let cps = 0
let cpc = 1

let ians = 0
let iansCost = 20
let ianscps = .1

let vickys = 0
let vickysCost = 20
let vickyscps = .1

let alexs = 0
let alexsCost = 250
let alexscps = 1

let dcvs = 0
let dcvsCost = 200

let ianIncrease = 0 
let ianIncreaseCost = 100

let vickyIncrease = 0
let vickyIncreaseCost = 100

let alexIncrease = 0
let alexIncreaseCost = 200



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
    numCookies += cpc
    totalCookies += cpc
    totalClicks += 1
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

dcvButton.addEventListener('click', (e) => {
  if (numCookies >= dcvsCost) {
    cpc *= 2
    numCookies -= dcvsCost
    dcvsCost *= 2
    dcvCost.innerText = `${Math.round(dcvsCost)}`
    dcvs += 1
    document.querySelector('#dcv-amount').innerText = dcvs
  }
})

increaseIanButton.addEventListener('click', (e)=> {
  if (numCookies >= ianIncreaseCost){
    numCookies -= ianIncreaseCost
    ianIncreaseCost *= 1.5
    ianIncreaseCost.innerText = `${Math.round(ianIncreaseCost)}`
    cps += ianscps
    ianscps *= 1.3
    ianIncrease += 1
    document.querySelector('#increase-ian-amount').innerText = ianIncrease
  }
})


increaseVickyButton.addEventListener('click', (e) => {
  if (numCookies >= vickyIncreaseCost) {
    numCookies -= vickyIncreaseCost
    vickyIncreaseCost *= 1.5
    vickyIncreaseCost.innerText = `${Math.round(vickyIncreaseCost)}`
    cps += vickyscps
    vickyscps *= 1.3
    vickyIncrease += 1
    document.querySelector('#increase-vicky-amount').innerText = vickyIncrease
  }
})


increaseAlexButton.addEventListener('click', (e) => {
  if (numCookies >= alexIncreaseCost) {
    numCookies -= alexIncreaseCost
    alexIncreaseCost *= 1.5
    alexIncreaseCost.innerText = `${Math.round(alexIncreaseCost)}`
    cps += alexscps
    alexscps *= 1.75
    alexIncrease += 1
    document.querySelector('#increase-alex-amount').innerText = alexIncrease
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
  document.querySelector('.col.s12.blue.darken-1.high-score-list').appendChild(ol)
}

function renderStats() {
  let helperNumber = 0
  helperNumber += parseInt(document.querySelector('#ian-amount').innerText)
  helperNumber += parseInt(document.querySelector('#vicky-amount').innerText)
  helperNumber += parseInt(document.querySelector('#alex-amount').innerText)

  document.querySelector('#stats-num-cookies').innerText = Math.floor(numCookies)
  document.querySelector('#stats-total-cookies').innerText = Math.round(totalCookies)
  document.querySelector('#stats-helper-number').innerText = helperNumber
  document.querySelector('#c-p-s').innerText = Math.round(cps * 10) / 10
  document.querySelector('#c-p-c').innerText = cpc
  document.querySelector('#t-c').innerText = totalClicks

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
  if (numCookies < dcvsCost) {
    dcvButton.disabled = true
  }
  if (numCookies >= dcvsCost) {
    dcvButton.disabled = false
  }

  if ((parseInt(ianSpan.innerText) === 0) && numCookies < ianIncreaseCost) {
    increaseIanButton.disabled = true
  }

  if ((parseInt(ianSpan.innerText) !== 0) && numCookies >= ianIncreaseCost) {
    increaseIanButton.disabled = false
  }


  if ((parseInt(vickySpan.innerText) === 0) && numCookies < vickyIncreaseCost) {
    increaseVickyButton.disabled = true
  }

  if ((parseInt(vickySpan.innerText) !== 0) && numCookies >= vickyIncreaseCost) {
    increaseVickyButton.disabled = false
  }


  if ((parseInt(alexSpan.innerText) === 0) && numCookies < alexIncreaseCost) {
    increaseAlexButton.disabled = true
  }

  if ((parseInt(alexSpan.innerText) !== 0) && numCookies >= alexIncreaseCost) {
    increaseAlexButton.disabled = false
  }

  numCookies += cps
  totalCookies += cps
  renderStats()
  cookies.innerText = Math.floor(numCookies)}, 1000)
