import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    startTimer(selectedDates[0]);
  },
};

const timer = flatpickr('#datetime-picker', options);

function startTimer(selectedDates) {
  const today = new Date();
  let interval = selectedDates - today;

  console.log(convertMs(interval));

  if (interval < 0) {
    Notiflix.Notify.failure('Please choose a date in the future');
    return;
  }

  startBtn.disabled = false;
}

startBtn.addEventListener('click', () => {
  setTimeout(() => {
    
  })
})

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
