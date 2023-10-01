"use strict";

//selecting elements

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");
const curr0 = document.getElementById("current--0");
const curr1 = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
let scores, currScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currScore = 0;
  activePlayer = 0;
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  curr0.textContent = 0;
  curr1.textContent = 0;

  diceEl.classList.remove("hidden");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  if (playing) {
    //generate a random dice roll

    const diceNum = Math.trunc(Math.random() * 6 + 1);
    console.log(diceNum);

    //display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${diceNum}.png`;

    //check for 1
    if (diceNum != 1) {
      currScore += diceNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currScore;
    } else {
      //score sets to 0 and switch player

      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currScore;
    console.log(scores);
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //if the score is 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceEl.classList.add("hidden");
    }
    //switch to next player
    else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
