'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const init = function() {
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    playing = true;
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    document.querySelector(`.player--0`).classList.add('player--active');
    document.querySelector(`.player--1`).classList.remove('player--active');
    scores = [0, 0];
    currentScore = 0
}
const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;    
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active'); 
}
// Rolling dice functionality
btnRoll.addEventListener('click', function(){
    if(playing) {
        //1. Gererating a random dice roll
        const dice = Math.trunc(Math.random()*6)+1;
        console.log(dice);

        //2. Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        //3. Check for the rolled 1
        if(dice !== 1) {
            //Add dice to the current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            // current0El.textContent = currentScore;
        } else {
            // Switch to the next player
            switchPlayer();
        }
    }    
})

btnHold.addEventListener('click', function(){
    if(playing) {
        // 1. Add current score to active player's score
            scores[activePlayer] += currentScore;
            document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
            console.log(scores);
        // 2. check score >= 100 
        if(scores[activePlayer] >= 100) {
            playing = false;
            diceEl.classList.add('hidden');
            // Finish the game
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            // 3. Switch game to next player
            switchPlayer();
        } 
    }      
})

btnNew.addEventListener('click', function(){
    init();
})
