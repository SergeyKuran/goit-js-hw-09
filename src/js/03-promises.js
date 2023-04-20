import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}

function onSubmit(evt) {
  evt.preventDefault();

  const { amount, delay, step } = formRef.elements;

  const amountInput = parseInt(amount.value);
  let delayInput = Number(parseInt(delay.value));
  const stepInput = parseInt(step.value);

  for (let i = 0; i < amountInput; i += 1) {
    let position = Number(i + 1);

    createPromise(position, delayInput)
      .then(() => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delayInput}ms`
        );
      })
      .catch(() => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delayInput}ms`
        );
      });

    delayInput += stepInput;
  }
}

formRef.addEventListener('submit', onSubmit);
