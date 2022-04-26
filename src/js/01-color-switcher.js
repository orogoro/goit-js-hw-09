const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

refs.startBtn.addEventListener('click', startActiveColors);
refs.stopBtn.addEventListener('click', stopActiveColors);

const PROMPT_TIME = 1000;
let hasColors = false;

function stopActiveColors() {
  hasColors = false;
  clearInterval(intervalId);
  refs.startBtn.disabled = false;
}

function startActiveColors() {
  if (hasColors) {
    return;
  }
  hasColors = true;
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
    refs.startBtn.disabled = true;
  }, PROMPT_TIME);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
