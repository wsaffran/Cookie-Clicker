
landingPage()

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

// start.addEventListener('click', (e) => {
//   timer = setInterval(() => {
//     if (startTime !== 0) {
//       start.innerText = startTime
//       startTime--
//     } else {
//       start.innerText = 'Finished'
//       submitGame()
//     }
//   }, 1000)
// })

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
    ians += 1
    cookies.innerText = Math.floor(numCookies)
    ianSpan.innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${ians}`
    cpsSpan.innerHTML = `${Math.round( cps * 10 ) / 10} cookies per second`
    document.querySelector("#addIan").innerHTML += `
    <img src="../ian.jpg" width="70px" height="70px" alt="" class="circle responsive-img">
    `
  }
})

vicky.addEventListener('click', (e) => {
  if (e.target.id === 'vicky' && numCookies >= vickysCost) {
    numCookies -= vickysCost
    vickysCost *= 1.15
    document.querySelector('#vicky-cost').innerText = `${Math.round(vickysCost)}`
    cps += vickyscps
    vickys += 1
    cookies.innerText = Math.floor(numCookies)
    vickySpan.innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${vickys}`
    cpsSpan.innerHTML = `${Math.round( cps * 10 ) / 10} cookies per second`
    document.querySelector("#addVicky").innerHTML += `
    <img src="../vicky.jpg" width="70px" height="70px" alt="" class="circle responsive-img">
    `
  }
})

alex.addEventListener('click', (e) => {
  if (e.target.id === 'alex' && numCookies >= alexsCost) {
    numCookies -= alexsCost
    alexsCost *= 1.5
    document.querySelector('#alex-cost').innerText = `${Math.round(alexsCost)}`
    cps += alexscps
    alexs += 1
    cookies.innerText = Math.floor(numCookies)
    alexSpan.innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${alexs}`
    cpsSpan.innerHTML = `${Math.round( cps * 10 ) / 10} cookies per second`
    document.querySelector("#addAlex").innerHTML += `
    <img src="https://avatars1.githubusercontent.com/u/12286943?s=460&v=4" width="70px" height="70px" alt="" class="circle responsive-img">
    `
  }
})

dcvButton.addEventListener('click', (e) => {
  if (numCookies >= dcvsCost) {
    cpc *= 2
    numCookies -= dcvsCost
    dcvsCost *= 3
    dcvCost.innerText = `${Math.round(dcvsCost)}`
    dcvs += 1
    document.querySelector('#dcv-amount').innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${dcvs}`
  }
})

increaseIanButton.addEventListener('click', (e)=> {
  if (numCookies >= ianIncreaseCost){
    numCookies -= ianIncreaseCost
    ianIncreaseCost *= 1.5
    document.querySelector("#increase-ian-cost").innerText = `${Math.round(ianIncreaseCost)}`
    cps -= ianscps*ians
    ianscps *= 1.25
    cps += ianscps*ians
    ianIncrease += 1
    document.querySelector('#increase-ian-amount').innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${ianIncrease}`
    cpsSpan.innerHTML = `${Math.round( cps * 10 ) / 10} cookies per second`
  }
})


increaseVickyButton.addEventListener('click', (e) => {
  if (numCookies >= vickyIncreaseCost) {
    numCookies -= vickyIncreaseCost
    vickyIncreaseCost *= 1.5
    document.querySelector("#increase-vicky-cost").innerText = `${Math.round(vickyIncreaseCost)}`
    cps -= vickyscps*vickys
    vickyscps *= 1.25
    cps += vickyscps*vickys
    vickyIncrease += 1
    document.querySelector('#increase-vicky-amount').innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${vickyIncrease}`
    cpsSpan.innerHTML = `${Math.round( cps * 10 ) / 10} cookies per second`
  }
})


increaseAlexButton.addEventListener('click', (e) => {
  if (numCookies >= alexIncreaseCost) {
    numCookies -= alexIncreaseCost
    alexIncreaseCost *= 1.5
    document.querySelector("#increase-alex-cost").innerText = `${Math.round(alexIncreaseCost)}`
    cps -= alexscps*alexs
    alexscps *= 1.25
    cps += alexscps*alexs
    alexIncrease += 1
    document.querySelector('#increase-alex-amount').innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${alexIncrease}`
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

function startContainer() {
  return `
  <div id="start-container" class="valign-wrapper center-align" style="padding-top: 100px;padding-bottom: 400px;background-image:url('../milk.jpg');background-size: 100% 100%;background-repeat: no-repeat;">
    <div class="row">
      <h1 style="color:lightblue;font-size:150px;padding-bottom: 120px">Cookie Clicker</h1>
      <div class="col s12">
        <div class="" id="start-page">
          <div class="col s12">
            <button class="waves-effect waves-light btn-large blue darken-1 start-button" id="1-min-game" type="button" name="">1 Minute Game</button>
            <button class="waves-effect waves-light btn-large blue darken-1 start-button" id="classic-game" type="button" name="">Classic Game</button>
        </div>
      </div>
    </div>
  </div>

  `
}

function landingPage() {

  document.querySelector('.body-container').hidden = true
  document.querySelector('#header').hidden = true
  document.querySelector('body').innerHTML += startContainer()
  document.querySelector('#classic-game').addEventListener('click', () => {
    let a = document.querySelector('#start-container')
    a.parentNode.removeChild(a)
    document.querySelector('.body-container').hidden = false
    document.querySelector('#header').hidden = false
    // document.querySelector('#start-page').hidden = true
    // document.querySelector('#start-container').style.display = "none"
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

  if (parseInt(ianSpan.innerText) > 0) {
    if (numCookies >= ianIncreaseCost) {
      increaseIanButton.disabled = false
    }
    if (numCookies < ianIncreaseCost) {
      increaseIanButton.disabled = true
    }
  }

  if (parseInt(ianSpan.innerText) === 0) {
    increaseIanButton.disabled = true
  }

  if (parseInt(vickySpan.innerText) > 0) {
    if (numCookies >= vickyIncreaseCost) {
      increaseVickyButton.disabled = false
    }
    if (numCookies < vickyIncreaseCost) {
      increaseVickyButton.disabled = true
    }
  }

  if (parseInt(vickySpan.innerText) === 0) {
    increaseVickyButton.disabled = true
  }

  if (parseInt(alexSpan.innerText) > 0) {
    if (numCookies >= alexIncreaseCost) {
      increaseAlexButton.disabled = false
    }
    if (numCookies < alexIncreaseCost) {
      increaseAlexButton.disabled = true
    }
  }

  if (parseInt(alexSpan.innerText) === 0) {
    increaseAlexButton.disabled = true
  }

  numCookies += cps/100
  totalCookies += cps/100
  renderStats()
  cookies.innerText = Math.floor(numCookies)}, 10)
