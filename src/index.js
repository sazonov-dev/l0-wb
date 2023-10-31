import './scss/styles.scss';
import { adjustStart } from './utils/basketPriceOptimization';
import { checkboxChangesStart } from "./utils/basketCheckbox";

const basketBox = document.querySelector('.order__basket-items');
const hiddenButton = document.querySelector('.order__basket-btn');

const toggleVisibility = () => {
    if (basketBox.classList.contains('hidden')) {
        basketBox.classList.remove('hidden');
        hiddenButton.classList.remove('active')
    } else {
        basketBox.classList.add('hidden');
        hiddenButton.classList.add('active')
    }
}

hiddenButton.addEventListener('click', toggleVisibility)


const startApp = () => {
    adjustStart();
    checkboxChangesStart();
}

startApp()
