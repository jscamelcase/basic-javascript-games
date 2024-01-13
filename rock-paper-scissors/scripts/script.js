import { gameData } from "../scripts/rps-data.js";

let selectionIndex = 0;

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

/* Delete at End */
renderGameConsole();

const startGame = function () {
  document.getElementById("start-section").style.display = "none";
  document.getElementById("game-section").style.display = "block";
  renderGameConsole();
};

const runCallbacks = function (event) {
  if (event.target.id === "start-button") {
    startGame();
  } else if (event.target.className === "button-left") {
    scrollLeft();
  } else if (event.target.className === "button-right") {
    scrollRight();
  }
};

document.addEventListener("click", runCallbacks);
