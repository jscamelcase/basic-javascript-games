// Importing data file with rock, paper, and scissors
import { gameData } from "../scripts/rps-data.js";

// Self-Evoking Function to create local storage for players high score

(function () {
  if (localStorage.getItem("player-high")) {
    document.getElementById("your-high").textContent =
      localStorage.getItem("player-high");
  } else {
    localStorage.setItem("player-high", "0");
    document.getElementById("your-high").textContent = 0;
  }
})();

let selectionIndex = 0;
let score = document.getElementById("score").textContent || 0;
let playerHigh = document.getElementById("your-high");

const renderGameConsole = function () {
  const leftButton = document.createElement("div");
  const rightButton = document.createElement("div");
  const playerItem = document.createElement("img");
  playerItem.id = "item-image";
  const playerItemDesc = document.createElement("p");
  playerItemDesc.id = "item-description";
  const playerItemContainer = document.createElement("div");
  playerItemDesc.textContent = `${gameData[0].name}`;
  playerItemContainer.className = "player-item-container";
  playerItemContainer.append(playerItem, playerItemDesc);
  leftButton.classList.add("button-left");
  leftButton.style.visibility = "hidden";
  rightButton.classList.add("button-right");
  playerItem.src = gameData[0].image;
  document
    .querySelector(".game-console-container")
    .append(leftButton, playerItemContainer, rightButton);
};

const setButtonColorToggle = function () {
  if (selectionIndex === gameData.length - 1) {
    document.querySelector(".button-right").style.visibility = "hidden";
    document.querySelector(".button-left").style.visability = "visible";
  } else if (selectionIndex === 0) {
    document.querySelector(".button-right").style.visibility = "visible";
    document.querySelector(".button-left").style.visibility = "hidden";
  } else {
    document.querySelector(".button-right").style.visibility = "visible";
    document.querySelector(".button-left").style.visibility = "visible";
  }
};

const setGamerSelection = function () {
  document.getElementById("item-image").src = gameData[selectionIndex].image;
  document.getElementById("item-description").textContent =
    gameData[selectionIndex].name;
};

const scrollLeft = function () {
  if (selectionIndex <= gameData.length - 1 && selectionIndex > 0) {
    selectionIndex--;
    setGamerSelection();
  }
  setButtonColorToggle();
};

const scrollRight = function () {
  if (selectionIndex < gameData.length - 1) {
    selectionIndex++;
    setGamerSelection();
  }
  setButtonColorToggle();
};

const pickCpuItem = function (resolved) {
  const cpuPickIndex = Math.floor(Math.random() * gameData.length);
  document.getElementById("cpu-image").src = gameData[cpuPickIndex].image;
  document.getElementById("cpu-name").textContent = gameData[cpuPickIndex].name;
};

const repeatImage = function (imageElement, nameElement) {
  return new Promise(function (resolve, reject) {
    let cpuIndex = 0;
    const interval = setInterval(
      function () {
        if (cpuIndex < gameData.length) {
          imageElement.src = gameData[cpuIndex].image;
          nameElement.textContent = gameData[cpuIndex].name;
          cpuIndex++;
        } else {
          cpuIndex = 0;
          imageElement.src = gameData[cpuIndex].image;
          nameElement.textContent = gameData[cpuIndex].name;
          cpuIndex++;
        }
      },
      100,
      imageElement,
      nameElement
    );
    setTimeout(function () {
      clearInterval(interval);
      resolve();
    }, 2000);
  });
};

const createCPUDisplay = function () {
  document.getElementById("cpu-result").innerHTML = "";
  const cpuItemContainer = document.createElement("div");
  const cpuItemImage = document.createElement("img");
  const cpuItemName = document.createElement("p");
  cpuItemContainer.id = "cpu-container";
  cpuItemImage.id = "cpu-image";
  cpuItemName.id = "cpu-name";
  cpuItemContainer.append(cpuItemImage, cpuItemName);
  document.getElementById("cpu-result").append(cpuItemContainer);
  document.querySelector(".cpu-container").style.display = "flex";
};

const declareWinner = function () {
  const playerItem = document.getElementById("item-description").textContent;
  const cpuItem = document.getElementById("cpu-name").textContent;
  if (playerItem === cpuItem) {
    return "tie";
  } else if (
    (playerItem === "Rock" && cpuItem === "Scissors") ||
    (playerItem === "Paper" && cpuItem === "rock") ||
    (playerItem === "Scissors" && cpuItem === "Paper")
  ) {
    return "player";
  } else {
    return "cpu";
  }
};

const updateOutcome = function (imgSource, text, points, plural = "s") {
  document.getElementById("result-image").src = imgSource;
  document.getElementById("result-message").textContent = text;
  document.getElementById("status").textContent = points;
  document.getElementById("plural").textContent = plural;
};

const scoreBoardUpdate = function () {
  const currentScore = document.getElementById("score");
  const yourHighScore = document.getElementById("your-high");
  const highScore = document.getElementById("high");
  if (+currentScore.textContent > +yourHighScore.textContent) {
    yourHighScore.textContent = currentScore.textContent;
    localStorage.setItem("player-high", yourHighScore.textContent);
  }
};

const displayOutcome = function (outcome) {
  switch (outcome) {
    case "tie":
      updateOutcome("./images/equal-sign-svgrepo-com.svg", "You Tied!", 0);
      break;
    case "player":
      updateOutcome("./images/trophy-svgrepo-com.svg", "You Won!", 1, "");
      document.getElementById("score").textContent =
        +document.getElementById("score").textContent + 1;
      break;
    case "cpu":
      updateOutcome("./images/sad-circle-svgrepo-com.svg", "You Lost!", 0);
  }
  // scoreBoardUpdate();
  document.querySelector(".results-container").style.display = "flex";
};

/* Delete at End */
// renderGameConsole();

const startGame = function () {
  document.getElementById("start-section").style.display = "none";
  document.getElementById("game-section").style.display = "flex";
  renderGameConsole();
};

// Could make last bit of code more dry.
const runCallbacks = function (event) {
  if (event.target.id === "start-button") {
    startGame();
  } else if (event.target.className === "button-left") {
    scrollLeft();
  } else if (event.target.className === "button-right") {
    scrollRight();
  } else if (event.target.id === "play") {
    createCPUDisplay();
    const cpuItemImage = document.getElementById("cpu-image");
    const cpuItemName = document.getElementById("cpu-name");
    repeatImage(cpuItemImage, cpuItemName)
      .then(pickCpuItem)
      .then(declareWinner)
      .then(displayOutcome);
  } else if (event.target.id === "play-again") {
    document.querySelector(".results-container").style.display = "none";
    document.querySelector(".cpu-container").style.display = "none";
  } else if (event.target.id === "quit") {
    // document.querySelector(".results-container").style.display = "none";
    document.getElementById("your-score").textContent = 0;
    // document.querySelector(".cpu-container").style.display = "none";
    // document.getElementById("game-section").style.display = "none";
    // document.getElementById("start-section").style.display = "flex";
    // document.querySelector(".game-console-container").innerHTML = "";
    location.reload();
  }
};

document.addEventListener("click", runCallbacks);
