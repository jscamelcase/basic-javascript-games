const startGame = function () {
  console.log(document.querySelectorAll("#game-section > *"));
};

const runCallbacks = function (event) {
  if (event.target.id === "start-button") {
    startGame();
  }
};

document.addEventListener("click", runCallbacks);
