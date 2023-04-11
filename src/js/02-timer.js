import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');


const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;

let interval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const today = new Date();
    interval = selectedDates[0] - today;

    if (interval < 0) {
      interval = 0;
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }

    viewTimer();
    startBtn.disabled = false;
  },
};

const fpr = flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', () => {
  const timer = setInterval(() => {
    interval -= 1000;

    if (interval <= 0) {
      clearInterval(timer);
      Notiflix.Notify.success('Timer is over');
      return;
    }

    viewTimer();
  }, 1000);
});

function viewTimer() {
  const timer = convertMs(interval);

  days.textContent = timer.days < 10 ? `0${timer.days}` : timer.days;
  hours.textContent = timer.hours < 10 ? `0${timer.hours}` : timer.hours;
  minutes.textContent = timer.minutes < 10 ? `0${timer.minutes}` : timer.minutes;
  seconds.textContent = timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
