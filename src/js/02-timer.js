import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  inputEl: document.querySelector('input#datetime-picker'),
  buttonEl: document.querySelector('button[type="button"]'),
  daysEl: document.querySelector('span[data-days]'),
  hoursEl: document.querySelector('span[data-hours]'),
  minutesEl: document.querySelector('span[data-minutes]'),
  secondsEl: document.querySelector('span[data-seconds]'),
};

refs.buttonEl.disabled = true;
const today = new Date();
const newDate = [];
let intervalId = null;
const PROMPT_TIME = 1000;

function updateTimerFace() {
  let futuretime = newDate[0];
  const startTime = new Date();
  const deltaTime = futuretime - startTime;
  const timeCode = convertMs(deltaTime);
  updateLockFace(timeCode);
  if (deltaTime <= 0) {
    clearInterval(intervalId);
  }
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  isActive: false,

  onClose(selectedDates) {
    if (selectedDates[0] > today) {
      refs.buttonEl.disabled = false;
      newDate.push(selectedDates[0]);
      return;
    }
    //   return window.alert('Please choose a date in the future');
    Notiflix.Notify.failure('Please choose a date in the future');
  },

  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;
    refs.buttonEl.disabled = true;

    updateTimerFace();

    intervalId = setInterval(() => {
      updateTimerFace();
    }, PROMPT_TIME);
  },
};

flatpickr(refs.inputEl, options);

refs.buttonEl.addEventListener('click', options.start);

function updateLockFace({ days, hours, minutes, seconds }) {
  refs.daysEl.textContent = `${days}`;
  refs.hoursEl.textContent = `${hours}`;
  refs.minutesEl.textContent = `${minutes}`;
  refs.secondsEl.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
