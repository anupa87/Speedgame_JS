// selectors
const startButton = document.querySelector("#start");
const endButton = document.querySelector("#stop");
const overlay = document.querySelector("#overlay");
const closeButton = document.querySelector("#closeBtn");
const squares = document.querySelectorAll(".square");
const scoreText = document.querySelector("#score");
const resultText = document.querySelector("#result");

//variables
let active = 0;
let score = 0;
let pace = 1000;
let rounds = 0;
let timer;
let startSound = new sound("./multimedia/start.wav");
let endSound = new sound("./multimedia/end.wav");

//getting random number
const getRndInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

squares.forEach((square, i) => {
  square.addEventListener("click", () => clickedSquare(i));
});

const clickedSquare = (i) => {
  if (i !== active) {
    endGame();
  } else {
    score++;
    rounds--;
    scoreText.textContent = score;
  }
};

//Adding sound

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
}
// starting game
const startGame = () => {
  startButton.style.display = "none";
  endButton.style.display = "inline";
  startSound.play();

  for (let i = 0; i < squares.length; i++) {
    squares[i].style.pointerEvents = "auto";
  }

  let nextActive = pickNew(active);

  squares[nextActive].classList.toggle("active");
  squares[active].classList.remove("active");

  active = nextActive;
  timer = setTimeout(startGame, pace);
  pace = pace - 10;

  if (rounds >= 4) {
    endGame();
  }

  rounds++;

  function pickNew(active) {
    let nextActive = getRndInt(0, 3);

    if (nextActive !== active) {
      return nextActive;
    } else {
      return pickNew(active);
    }
  }
};

/* ending game */
const endGame = () => {
  clearTimeout(timer);
  overlay.style.visibility = "visible";
  startSound.stop();
  endSound.play();

  if (score == 0) {
    resultText.textContent = `Your score is ${score}. 
    Better luck next time!`;
  } else if (score > 1 && score < 15) {
    resultText.textContent = `Your score is ${score}. 
    Not bad! Try again :)`;
  } else if (score > 15) {
    resultText.textContent = `Your score is ${score}. 
    Congratulation! Well played.`;
  }
};
/* reloading game */
const reloadGame = () => {
  window.location.reload();
};

/* adding event listener */
startButton.addEventListener("click", startGame);
startButton.addEventListener("click", startSound);
endButton.addEventListener("click", endGame);
endButton.addEventListener("click", endSound);
closeButton.addEventListener("click", reloadGame);
