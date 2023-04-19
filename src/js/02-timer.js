import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
//Пошук по id
const inputTimerRef = document.querySelectorAll('#datetime-picker');
//Пошук по атрибутах
const buttonStartRef = document.querySelector('[data-start]');
const dataDaysRef = document.querySelector('[data-days]');
const dataHoursRef = document.querySelector('[data-hours]');
const dataMinutesRef = document.querySelector('[data-minutes]');
const dataSecondsRef = document.querySelector('[data-seconds]');
//Початкове значення кнопки
buttonStartRef.disabled = true;
// Вибрана дата, початкове значення
let endTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    buttonStartRef.disabled = false;

    if (selectedDates[0] < options.defaultDate) {
      Notiflix.Notify.warning('Please choose a date in the future');
      buttonStartRef.disabled = true;
      return;
    }
    endTime = selectedDates[0];
    console.log(convertMs(endTime));
  },
};
//Створення календаря у input
flatpickr(inputTimerRef, options);
//Добавлення слухача події на кнопку
buttonStartRef.addEventListener('click', onClick);

function onClick() {
  //Створюємо інтурвал
  const id = setInterval(() => {
    const current = endTime - Date.now();
    const { days, hours, minutes, seconds } = convertMs(current);

    dataDaysRef.textContent = addLeadingZero(days);
    dataHoursRef.textContent = addLeadingZero(hours);
    dataMinutesRef.textContent = addLeadingZero(minutes);
    dataSecondsRef.textContent = addLeadingZero(seconds);

    buttonStartRef.disabled = true;
    //Видаляємо інтервал
    if (current <= 0) {
      clearInterval(id);
      dataDaysRef.textContent = '00';
      dataHoursRef.textContent = '00';
      dataMinutesRef.textContent = '00';
      dataSecondsRef.textContent = '00';
    }
  }, 1000); //Затримка
}
//Функція конвертування часу
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

// Функція яка добавляє 0
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
