import { getItemAttributes } from "./utils";
import { priceBasketChanger } from "./basketChanger";

export const inputValidatorHandler = () => {
    const decrementBtn = document.querySelectorAll('#decrement');
    const incrementBtn = document.querySelectorAll('#increment');

    decrementBtn.forEach((button) => button.addEventListener('click', inputCounter));
    incrementBtn.forEach((button) => button.addEventListener('click', inputCounter));
}

const inputCounter = (event) => {
    const target = event.target;
    const id = target.id;
    const container = target.closest('.order__basket-total-counter');
    const input = container.querySelector('.order__basket-item-input-count');
    const inputValue = Number(input.value);
    const maxValue = input.dataset.maxvalue ? Number(input.dataset.maxvalue) : 99999;
    const {price, lastPrice, currency, discountSelector, priceSelector, key, mainContainer} = getItemAttributes(target);

    switch (id) {
        case "increment":
            if (inputValue + 1 <= maxValue) {
                priceBasketChanger("increment", price, lastPrice, currency, discountSelector, priceSelector, key, mainContainer)
                return input.value = String( inputValue + 1);
            }
            break;
        case "decrement":
            if (inputValue > 1) {
                priceBasketChanger("decrement", price, lastPrice, currency, discountSelector, priceSelector, key, mainContainer)
                return input.value = String( inputValue - 1);
            }
            break;
        default:
            console.log("Неизвестный id, inputCounter")
    }
}
