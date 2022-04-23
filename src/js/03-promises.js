const refs = {
  delayEl: document.querySelector('input[name="delay"]'),
  stepEl: document.querySelector('input[name="step"]'),
  amountEl: document.querySelector('input[name="amount"]'),
  buttonEl: document.querySelector('button[type="submit"]'),
};
refs.buttonEl.addEventListener('click', inputValue);

function inputValue() {
  main(refs.delayEl.value, refs.stepEl.value, refs.amountEl.value);
  console.log(refs.delayEl.value);
}

// let step = 500;
// const amount = 5;
// const firstDelay = 1000;

let position = 0;

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function main(firstDelay, step, amount) {
  for (let i = 1; i <= amount; i += 1) {
    const delay = firstDelay + step * (i - 1);
    createPromise(i, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
