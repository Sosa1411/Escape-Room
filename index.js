const startButton = document.getElementById("start-button");
const startScreen = document.getElementById("start-screen");
const gameScreenOne = document.getElementById("game-screen-one");
const gameScreenTwo = document.getElementById("game-screen-two");
const gameScreenThree = document.getElementById("game-screen-Three");
const gameScreenFour = document.getElementById("game-screen-Four");
const gameScreenFive = document.getElementById("game-screen-Five");

startButton.addEventListener("click", () => {
  startScreen.style.display = "none";
  gameScreenOne.style.display = "flex";
  gameScreenOne.style.opacity = "1";
  gameScreenOne.style.pointerEvents = "auto";

  startGame();
});

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
    container.appendChild(div);
  });
}

function startGame() {
  fillWithEmojis(4000);
}
