import Notiflix from 'notiflix';

const refs = {
  delayEl: document.querySelector('input[name="delay"]'),
  stepEl: document.querySelector('input[name="step"]'),
  amountEl: document.querySelector('input[name="amount"]'),
  // buttonEl: document.querySelector('button[type="submit"]'),
  formEl: document.querySelector('.form'),
};

// refs.formEl.addEventListener('submit', formSubmit);
// refs.formEl.addEventListener('input', inputValue);

// function formSubmit() {
//   // e.preventDefault();
//   // e.currentTarget.reset();
//   inputValue();
// }
// const selectedForm = [];

// function inputValue(e) {
//   selectedForm[e.target.name] = e.target.value;
//   // let { delay, step, amount } = selectedForm;

//   // main(delay, step, amount);

//   Object.entries(selectedForm).forEach(([name, value]) => {
//     //   selectedForm[name] = value;
//     refs.formEl.elements[name].value = value;
//   });
// }

// // function inputValue() {
// //   main(refs.delayEl.value, refs.stepEl.value, refs.amountEl.value);
// // }

// let position = 0;

// function createPromise(position, delay) {
//   return new Promise((resolve, reject) => {
//     const shouldResolve = Math.random() > 0.3;
//     setTimeout(() => {
//       if (shouldResolve) {
//         resolve({ position, delay });
//       } else {
//         reject({ position, delay });
//       }
//     }, delay);
//   });
// }

// function main(firstDelay, step, amount) {
//   for (let i = 1; i <= amount; i += 1) {
//     const delay = firstDelay + step * (i - 1);
//     createPromise(i, delay)
//       .then(({ position, delay }) => {
//         console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//       })
//       .catch(({ position, delay }) => {
//         console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//       });
//   }
// }

refs.formEl.addEventListener('submit', main);
refs.formEl.addEventListener('input', inputValue);

let step = 0;
let amount = 0;
let firstDelay = 0;

function inputValue() {
  step = refs.stepEl.value;
  amount = refs.amountEl.value;
  firstDelay = refs.delayEl.value;
}

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

function main(e) {
  e.preventDefault();

  for (let i = 1; i <= amount; i++) {
    const delay = firstDelay - 0 + step * (i - 1);
    createPromise(i, delay)
      .then(({ position, delay }) => {
        // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
