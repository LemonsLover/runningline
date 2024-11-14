const root = document.querySelector("#root");
const form = document.querySelector("#form");

const notNumberTypes = ["filledColor", "emptyColor"];

form.addEventListener("input", (e) => {
  const input = e.target;
  if (notNumberTypes.includes(input.id)) settings[input.id] = input.value;
  else settings[input.id] = +input.value;
  updateField();
});

const settings = {
  filled: 2,
  empty: 2,
  speed: 300,
  amount: 100,
  filledColor: "#000000",
  emptyColor: "#808080",
  rectWidth: 50,
  rectHeight: 50,
  gapSize: 0,
};

const inputs = form.querySelectorAll("input");

let line = [];

let interval;

const updateField = () => {
  clearInterval(interval);
  populateArr(settings.amount, settings.filled, settings.empty);
  interval = setInterval(() => {
    moveArr();
    drawCells();
  }, settings.speed);
};

const populateArr = (amount, sequenceSize, gapSize) => {
  line = [];
  let placed = 0;
  let skipped = 0;
  for (let i = 0; i < amount; i++) {
    if (placed >= sequenceSize && skipped >= gapSize) {
      placed = 0;
      skipped = 0;
    }

    if (placed < sequenceSize) {
      line[i] = true;
      placed++;
      continue;
    }

    if (skipped < gapSize) {
      line[i] = false;
      skipped++;
    }
  }
};

const moveArr = () => {
  const pop = line.pop();
  line.unshift(pop);
};

const drawCells = () => {
  root.innerHTML = "";
  line.forEach((el) => {
    const div = document.createElement("div");
    if (el) {
      div.classList.add("cell");
      div.style.backgroundColor = settings.filledColor;
    } else {
      div.classList.add("cell");
      div.style.backgroundColor = settings.emptyColor;
    }
    div.style.width = settings.rectWidth + "px";
    div.style.height = settings.rectHeight + "px";
    root.style.gap = settings.gapSize + "px";
    root.appendChild(div);
  });
};

inputs.forEach((input) => {
  input.value = settings[input.id];
});

updateField();
