import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const myForm = document.querySelector('.form');
console.log(myForm);


myForm.addEventListener("submit", handleClick);

function handleClick(event) {
    event.preventDefault(); 

    const inputValue = Number(myForm.elements.delay.value);
    const inputState = myForm.elements.state.value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (inputState === "fulfilled") {
                resolve(inputValue);
            } else {
                reject(inputValue);
            }
        }, inputValue);

    });

    promise
        .then((delay) => {
        iziToast.success({message:`✅ Fulfilled promise in ${delay}ms`});
        })
        .catch((delay) => {
        iziToast.error({ message: `❌ Rejected promise in ${delay}ms` });
        })     
        .finally(() => {
        myForm.reset();
        });
}