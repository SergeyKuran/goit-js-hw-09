const buttonStartRef = document.querySelector('[data-start]');
const buttonStopRef = document.querySelector('[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

buttonStartRef.addEventListener('click', () => {
  const interval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
    buttonStartRef.disabled = true;
    buttonStopRef.disabled = false;
  }, 1000);

  buttonStopRef.addEventListener('click', () => {
    clearInterval(interval);
    buttonStartRef.disabled = false;
    buttonStopRef.disabled = true;
  });
});
