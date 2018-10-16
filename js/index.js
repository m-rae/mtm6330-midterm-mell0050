let deckHTML = ''

let deck = []

const game = document.getElementById('game')

const decks = {
  gamePlay: ['card1', 'card2', 'card3', 'card4']
}

function createDeck(difficulty = 'easy') {
  deckHTML = ''
  deck = []
  for (let i = 0; i < decks[difficulty].length; i++) {
    deck.push(decks[difficulty][i])
    deck.push(decks[difficulty][i])
  }
  shuffle(deck)
  for (const card of deck) {
    deckHTML += `<div class="card ${card} inactive"></div>`
  }
  game.innerHTML = deckHTML
}

// reference: Steve Griffith array shuffle function
const shuffle = function (array) {
  const length = array.length
  for (let i = 0; i < length; i++) {
    const temp = array[i]
    const pos = Math.floor(Math.random() * length)
    const other = array[pos]
    array[i] = other
    array[pos] = temp
  }
  return array
}

const $game = document.getElementById('gamePlay')
const $everyCard = document.getElementsByClassName('card')

function createGameDeck() {
  createDeck('game')
}

$game.addEventListener('click', createGameDeck)

let card1 = 0
let card2 = 0

game.addEventListener('click', function (e) {
  if (e.target.classList.contains('card')) {
    e.target.classList.add('active')
    e.target.classList.remove('inactive')
    if (!card1 && !card2) {
      card1 = e.target
    } else if (card1 && !card2) {
      card2 = e.target
    }
    if (card1 && card2 && card1.classList.value === card2.classList.value) {
      card1.classList.add('match')
      card2.classList.add('match')
      checkForWin()
      card1 = 0
      card2 = 0
    } else if (card1 && card2 && card1.classList.value !== card2.classList.value) {
      flipBack()
      card1 = 0
      card2 = 0
    }
  }
})

function flipBack() {
  for (const thisCard of $everyCard) {
    if (!thisCard.classList.contains('match')) {
      setTimeout(function () {
        thisCard.classList.remove('active')
        thisCard.classList.add('inactive')
      }, 2000)
    }
  }
}

function checkForWin() {
  let counter = 0
  for (const card of $everyCard) {
    if (card.classList.contains('match')) {
      counter++
    }
  }
  if (counter === $everyCard.length) {
    for (const card of $everyCard) {
      card.classList.add('win')
    }
  }
}