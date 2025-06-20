import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const elements = {
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
  dateInput: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('button[data-start]'),
};

elements.startButton.disabled = true;

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function onDatePickerOpen() {
  picker.setDate(new Date());
}

function onDatePickerClose(selectedDates) {
  const currentDate = Date.now();
  const selectedDate = selectedDates[0].getTime();

  if (selectedDate < currentDate) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
      closeOnEscape: true,
      position: 'topRight',
    });
    return;
  }

  elements.startButton.disabled = false;
  selectedFutureDate = selectedDate;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClockface() {
  let { days, hours, minutes, seconds } = convertMs(
    selectedFutureDate - Date.now()
  );

  elements.days.textContent = addLeadingZero(days);
  elements.hours.textContent = addLeadingZero(hours);
  elements.minutes.textContent = addLeadingZero(minutes);
  elements.seconds.textContent = addLeadingZero(seconds);

  if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
    selectedFutureDate = null;
    elements.dateInput.disabled = false;
    clearInterval(intervalId);

    iziToast.success({
      title: 'Success',
      message: 'Time is up!',
      closeOnEscape: true,
      position: 'topRight',
    });
  }
}

function onStartButtonClick() {
  elements.startButton.disabled = true;
  elements.dateInput.disabled = true;

  updateClockface();

  intervalId = setInterval(updateClockface, 1000);
}

let selectedFutureDate = null;
let intervalId = null;

const picker = flatpickr(elements.dateInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onOpen: onDatePickerOpen,
  onClose: onDatePickerClose,
});

elements.startButton.addEventListener('click', onStartButtonClick);
