const startButton = document.getElementById("start-button");
const startScreen = document.getElementById("start-screen");
const gameScreenOne = document.getElementById("game-screen-one");
const gameScreenTwo = document.getElementById("game-screen-two");
const gameScreenThree = document.getElementById("game-screen-three");
const gameScreenFour = document.getElementById("game-screen-four");
const gameScreenFive = document.getElementById("game-screen-five");
let points = 0;
let lives = 4;
function updatedStats() {
  document.getElementById("points").textContent = `points: ${points}`;
  document.getElementById("lives").textContent = `lives: ${lives}`;
}
let usedPointsAlredy = false;

function loseLifeOrUsepoints() {
  if (lives <= 0 && usedPointsAlredy) return;
  lives--;
  updatedStats();
  if (lives === 0) {
    if (points >= 10 && !usedPointsAlredy) {
      const wantToUsePoint = confirm(
        "You failed 4 times. Use 10 Points to continue?"
      );
      if (wantToUsePoint) {
        points -= 10;
        lives = 4;
        usedPointsAlredy = true;
        updatedStats();
      } else {
        alert("Back to room 1...");
        location.reload();
      }
    } else if (usedPointsAlredy) {
      alert("You've used your retry. Game Over.");
      location.reload();
    }
  }
}

function fillWithEmojis(total = 40) {
  const container = document.getElementById("box-of-animals");

  const emojiAnimals = [
    "🦁",
    "🐯",
    "🦓",
    "🦒",
    "🦊",
    "🐻",
    "🐼",
    "🐷",
    "🐶",
    "🐸",
    "🐵",
    "🐮",
  ];
  const emojis = [];

  for (let i = 0; i < total - 1; i++) {
    const random =
      emojiAnimals[Math.floor(Math.random() * emojiAnimals.length)];
    emojis.push(random);
  }

  const elephantIndex = Math.floor(Math.random() * total);
  emojis.splice(elephantIndex, 0, "🐘");

  container.innerHTML = "";
  emojis.forEach((emoji) => {
    const div = document.createElement("div");
    div.className = "animal";
    div.textContent = emoji;
    if (emoji === "🐘") {
      div.addEventListener("click", () => {
        console.log("elephent");
        points += 10;
        updatedStats();
        goToPuzzelTwo();
      });
    }
    container.appendChild(div);
  });
}
document.addEventListener("DOMContentLoaded", () => {
  startButton.addEventListener("click", () => {
    startScreen.style.display = "none";
    gameScreenOne.style.display = "flex";
    gameScreenOne.style.opacity = "1";
    gameScreenOne.style.pointerEvents = "auto";
    fillWithEmojis(40);
    updatedStats();
  });
});

// now after user complated the page one now its time for page 2
// on the page two
// fisrt we need to get the id of input, submit btn and paragraph id
// then we need to hard code the right code
// we need add click even on the submit btn
// if user guss the correct code we need to add textcontact to the pragraph
// then we need to move on to the next page (page tree) by using set timout
// eles if the user add the wrong code we will add text contact to the feed back (wrong anser)
function goToPuzzelTwo() {
  gameScreenOne.style.display = "none";
  gameScreenTwo.style.display = "flex";
  const inputId = document.getElementById("code-input");
  const submitBtn = document.getElementById("submit-code");
  const feedBack = document.getElementById("code-feedback");
  const rightCode = "2123";
  submitBtn.addEventListener("click", () => {
    const userGuess = inputId.value;
    if (userGuess === rightCode) {
      feedBack.textContent = "✅ Correct!";
      feedBack.style.color = "green";
      points += 10;
      updatedStats();
      setTimeout(() => {
        gameScreenTwo.style.display = "none";
        gameScreenThree.style.display = "flex";
        goToPuzzelThree();
      }, 25);
    } else {
      feedBack.textContent = "❌ Wrong code, try again!";
      feedBack.style.color = "red";
      loseLifeOrUsepoints();
    }
  });
}

function goToPuzzelThree() {
  gameScreenOne.style.display = "none";
  gameScreenTwo.style.display = "none";
  const colors = ["red", "green", "blue", "yellow"];
  const btn = document.querySelectorAll(".color-btn");
  const sequence = [];
  let userSequence = [];
  for (let i = 0; i < 4; i++) {
    const rendColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(rendColor);
  }
  const display = document.getElementById("color-sequence");
  const feedBack = document.getElementById("sequence-feedback");
  btn.forEach((b) => (b.disabled = true));
  sequence.forEach((color, index) => {
    setTimeout(() => {
      let button = document.querySelector(`.color-btn[data-color ="${color}"]`);
      if (!button) {
        console.error("Button not found for color:", color);
      }
      console.log("flashing", color, button);
      button.classList.add("flash");
      console.log("flashing:", color, button);

      setTimeout(() => {
        button.classList.remove("flash");
      }, 200); // how long it stays visible
    }, index * 100); // how long to wait before next flash
  });
  setTimeout(() => {
    display.textContent = "Your turn! Repeat the sequence.";
    btn.forEach((b) => (b.disabled = false));
  }, sequence.length * 100);
  btn.forEach((button) => {
    button.addEventListener("click", () => {
      const clickedColor = button.dataset.color;
      userSequence.push(clickedColor);
      console.log("You clicked:", clickedColor);
      if (clickedColor !== sequence[userSequence.length - 1]) {
        feedBack.textContent = "❌ Wrong! Try again.";
        feedBack.style.color = "red";
        loseLifeOrUsepoints();
        userSequence = [];
        return;
      }
      if (userSequence.length === sequence.length) {
        feedBack.textContent = "✅ Well done!";
        feedBack.style.color = "green";
        points += 10;
        updatedStats();
        userSequence = [];

        setTimeout(() => {
          gameScreenThree.style.display = "none";
          gameScreenFour.style.display = "flex";
        }, 1500);
      }
    });
  });
  console.log("👀 Full color sequence to win:", sequence);
}



const riddles = [
  {
    question: "I can bring back the dead, make us cry, make us laugh, make us young. Born in an instant, yet last a lifetime. What am I?",
    answer: "a memory"
  },
  {
    question: "I can be cracked, made, told, and played. What am I?",
    answer: "a joke"
  },
  {
    question: "It makes you weak and strong... not seen, only felt — and often lost. What is it?",
    answer: "love"
  },
  {
    question: "The more you take, the more you leave behind. What am I?",
    answer: "footsteps"
  },
  {
    question: "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?",
    answer: "an echo"
  }
];

let currentRiddleIndex = 0;

function displayRiddle() {
  document.getElementById("riddle-question").textContent = riddles[currentRiddleIndex].question;
  document.getElementById("riddle-count").textContent = currentRiddleIndex + 1;
}

function checkAnswer() {
  const userAnswer = document.getElementById("riddle-answer").value.toLowerCase().trim();
  const feedback = document.getElementById("riddle-feedback");

  if (userAnswer === riddles[currentRiddleIndex].answer) {
    feedback.textContent = "✅ Well done! Move on!";
    feedback.style.color = "limegreen";
    currentRiddleIndex++;
    points += 2
    updatedStats()
    loseLifeOrUsepoints()
    if (currentRiddleIndex < riddles.length) {
      setTimeout(() => {
        document.getElementById("riddle-answer").value = "";
        feedback.textContent = "";
        displayRiddle();
      }, 1000);
    } else {
      feedback.textContent = "🎉 All riddles complete!";
      feedback.style.color = "gold";
    }

  } else {
    feedback.textContent = "❌ Try again!";
    feedback.style.color = "red";
    loseLifeOrUsepoints();
  }
}

document.getElementById("submit-riddle-answer").addEventListener("click", checkAnswer);
displayRiddle();
