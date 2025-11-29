import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const input = document.querySelector("#datetime-picker");
const startBtn = document.querySelector(".form-button");
startBtn.disabled = true;

// спани таймера
const dataDays = document.querySelector("[data-days]");
const dataHours = document.querySelector("[data-hours]");
const dataMinutes = document.querySelector("[data-minutes]");
const dataSeconds = document.querySelector("[data-seconds]");

let userSelectedDate = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const now = new Date();

    console.log("Обрано:", selectedDate);
    console.log("Зараз:", now);

    if (selectedDate <= now) {
      startBtn.disabled = true;
      alert("Please choose a date in the future");
      userSelectedDate = null;
    } else {
      userSelectedDate = selectedDate;
      startBtn.disabled = false;
    }
  },
};
flatpickr(input, options);

// старт таймера
startBtn.addEventListener("click", onStartClick);

function onStartClick() {
  if (!userSelectedDate) {
    return;
  }

  // блокуємо кнопку і інпут
  startBtn.disabled = true;
  input.disabled = true;

  // якщо раптом таймер уже був — очищаємо
  if (timerId) {
    clearInterval(timerId);
  }

  // запускаємо інтервал раз на секунду
  timerId = setInterval(() => {
    const now = new Date();
    const diff = userSelectedDate - now;

    // якщо час вийшов
    if (diff <= 0) {
      clearInterval(timerId);
      timerId = null;
      renderTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      input.disabled = false; // можна обрати нову дату
      console.log("⏱ Таймер закінчився");
      return;
    }

    const time = convertMs(diff);
    renderTime(time);
  }, 1000);
}

// малюємо значення в спанах
function renderTime({ days, hours, minutes, seconds }) {
  dataDays.textContent = addLeadingZero(days);
  dataHours.textContent = addLeadingZero(hours);
  dataMinutes.textContent = addLeadingZero(minutes);
  dataSeconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

// готова функція з умови
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
