const startButton = document.querySelector("#start");
const endButton = document.querySelector("#stop");
const overlay = document.querySelector("#overlay");
const closeButton = document.querySelector("#close");
const circles = document.querySelectorAll(".circle");
const scoreText = document.querySelector("#score");
const resultText = document.querySelector("#result");

let active = 0;
let score = 0;
let pace = 1000;
let rounds = 0;
let timer;
// //Adding sound

// let startSound = new sound (#);
// let endSound = new sound(#);

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
function getRndInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

circles.forEach((circle, i) => {
  circle.addEventListener("click", () => clickedCircle(i));
});

const clickedCircle = (i) => {
  if (i !== active) {
    endGame();
  } else {
    score++;
    rounds--;
    scoreText.textContent = score;
  }
};

const startGame = () => {
  startButton.style.display = "none";
  endButton.style.display = "inline";
  startSound.loop = true;
  startSound.play();

  for (let i = 0; i < circles.length; i++) {
    circles[i].style.pointerEvents = "auto";
  }

  let nextActive = pickNew(active);

  circles[nextActive].classList.toggle("active");
  circles[active].classList.remove("active");

  active = nextActive;
  timer = setTimeout(startGame, pace);
  pace = pace - 10;

  if (rounds >= 1) {
    endGame();
  }

  rounds++;

  function pickNew(active) {
    let nextActive = getRndInt(0, 3);

    if (nextActive != active) {
      return nextActive;
    } else {
      return pickNew(active);
    }
  }
};
function startSoundStop() {
  startSound.stop();
}
function endSoundPlay() {
  endSound.play();
}

const endGame = () => {
  clearTimeout(timer);
  overlay.style.visibility = "visible";

  if (score == 0) {
    resultText.textContent = `Your score is ${score}. Better luck next Easter!`;
  } else if (score > 1 && score < 15) {
    resultText.textContent = `Your score is ${score}. Not bad! Happy Easter to You!!`;
  } else if (score > 15) {
    resultText.textContent = `Your score is ${score}. Woo Hoo! Well played. Happy Happy Easter to You!!`;
  }
};
const reloadGame = () => {
  window.location.reload();
};

startButton.addEventListener("click", startGame);
endButton.addEventListener("click", endGame);
closeButton.addEventListener("click", reloadGame);
