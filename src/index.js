import './scss/styles.scss';
import { adjustStart } from './utils/basketPriceOptimization';
import { checkboxChangesStart, uniqueCheckboxesStart } from "./utils/basketCheckbox";
import { visibilityHandler } from "./utils/basketToggleVisibility";
import { startPopup } from './utils/popup';

const inputValidatorHandler = () => {
    const decrementBtn = document.querySelectorAll('#decrement');
    const incrementBtn = document.querySelectorAll('#increment');

    decrementBtn.forEach((button) => button.addEventListener('click', inputCounter));
    incrementBtn.forEach((button) => button.addEventListener('click', inputCounter));
}

const getItemAttributes = (container) => {
    const mainContainer = container.closest('.order__basket-card');
    const newPriceElement = mainContainer.querySelector('.order__basket-price-new');
    const discountPriceElement = mainContainer.querySelector('#priceDiscount');
    const lastPrice = Number(newPriceElement.dataset.lastprice);
    const price = Number(newPriceElement.dataset.price);
    const currency = newPriceElement.dataset.currency;
    const key = mainContainer.id;

    return {price, lastPrice, currency, discountSelector: discountPriceElement, priceSelector: newPriceElement, key, mainContainer};
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

const priceBasketChanger = (state, price, lastPrice, currency, discountSelector, priceSelector, key, mainContainer) => {
    const totalBasketCount = Number(localStorageGetValue('basketTotalCount'));

    switch (state) {
        case "increment":
            priceSelector.innerText = `${(lastPrice + price).toLocaleString()} ${currency}`;
            discountSelector.innerText = `${((lastPrice + price) * 2).toLocaleString()} ${currency}`;
            priceSelector.dataset.lastprice = lastPrice + price;
            localStorageHandler('basketTotalCount', totalBasketCount + 1);
            localStorageHandler('totalPrice', price); // необходимо будет сохранять значение lastprice
            let updatedItemCount = Number(mainContainer.querySelector('.order__basket-item-input-count').value) + 1;
            mainContainer.querySelector('.order__basket-item-input-count').value = String(updatedItemCount);
            localStorageHandler('itemOrders', { value: updatedItemCount, key: key });
            break;
        case "decrement":
            const newLastPrice = lastPrice - price;
            priceSelector.innerText = `${newLastPrice.toLocaleString()} ${currency}`;
            discountSelector.innerText = `${(newLastPrice * 2).toLocaleString()} ${currency}`;
            priceSelector.dataset.lastprice = newLastPrice;
            localStorageHandler('basketTotalCount', totalBasketCount - 1);
            localStorageHandler('totalPrice', priceSelector.dataset.lastprice);
            const updatedItemCountData = Number(mainContainer.querySelector('.order__basket-item-input-count').value) - 1;
            mainContainer.querySelector('.order__basket-item-input-count').value = String(updatedItemCountData);
            localStorageHandler('itemOrders', { value: updatedItemCountData, key: key });
            break;

        default:
            console.log('Неизвестный стейт, priceBasketChanger');
    }
}

const initLocalStorage = () => {
    if (!localStorage.getItem("totalPrice") && !localStorage.getItem("basketTotalCount") && !localStorage.getItem('totalDiscount') && !localStorage.getItem("itemOrders")) {
        localStorage.setItem("totalPrice", "11008");
        localStorage.setItem("basketTotalCount", "3");
        localStorage.setItem("totalDiscount", localStorage.getItem("totalPrice"));
        localStorage.setItem("itemOrders", JSON.stringify({tShirt: 1, cardHolder: 1, pencil: 1}));
        localStorage.setItem("itemPrices", JSON.stringify({tShirt: 261, cardHolder: 10500, pencil: 247}));
    }
    return null;
}

export const localStorageChanger = (key, value) => localStorage.setItem(key, value);
export const localStorageGetValue = (key) => localStorage.getItem(key);

export const localStorageHandler = (key, payload) => {
    switch (key) {
        case "totalPrice":
            const prevTotalPriceValue = localStorageGetValue(key);
            const newTotalPriceValue = Number(prevTotalPriceValue) + Number(payload);
            localStorageChanger("totalDiscount", (newTotalPriceValue / 2).toFixed(0));
            return localStorageChanger(key, newTotalPriceValue);
        case "itemOrders":
            const prevItemValue = JSON.parse(localStorageGetValue("itemOrders"));
            const newItemValue = {...prevItemValue, [payload.key]: payload.value}
            return localStorageChanger("itemOrders", JSON.stringify(newItemValue));
        case "basketTotalCount":
            localStorageChanger("basketTotalCount", payload);
    }
}

const interactiveHtmlHandler = (selector, value) => {
    selector.innerText = value;
}

const interactiveStorageData = () => {
    const totalStoragePrice = Number(localStorageGetValue('totalPrice'));
    const totalStorageDiscount = Number(localStorageGetValue('totalDiscount'));
    const inputs = document.querySelectorAll('.order__basket-item-input-count');
    const prices = document.querySelectorAll('.order__basket-price-new');
    // const basketCounter = document.querySelector('.basket__counter').innerText = localStorageGetValue('basketTotalCount');
    // const totalPrice = document.querySelector('.order__info-total-price').innerText = `${totalStoragePrice.toLocaleString()} сом`;
    // const totalProductCount = document.querySelector('#totalProductCount').innerText = `${localStorageGetValue('basketTotalCount')} товара`;
    // const totalProductPrice = document.querySelector('#totalProductPrice').innerText = `${(totalStoragePrice + totalStorageDiscount).toLocaleString()} сом`;
    // const totalProductDiscount = document.querySelector('#totalProductDiscount').innerText = `-${totalStorageDiscount.toLocaleString()} сом`;
    const storageValue = JSON.parse(localStorageGetValue("itemOrders"));

    inputs.forEach((input) => {
        input.setAttribute("value", storageValue[input.dataset.id]);
    })

    prices.forEach((element) => {
        const price = Number(element.dataset.price);
        const mainContainer = element.closest('.order__basket-price');
        const discountSelector = mainContainer.querySelector('#priceDiscount');
        element.dataset.lastprice = String(price * Number(storageValue[element.closest('.order__basket-card').id]));
        element.innerText = `${(price * Number(storageValue[element.closest('.order__basket-card').id])).toLocaleString()} сом`;
        discountSelector.innerText = `${(Number(element.dataset.lastprice) * 2).toLocaleString()} сом`;
    })
}

// const checkboxSelectAll = document.querySelector('#checkboxSelectAll');
//
// const checkboxHandler = (event) => {
//     const target = event.target;
// }
//
// checkboxSelectAll.addEventListener('click', checkboxHandler);

inputValidatorHandler()

const startApp = () => {
    initLocalStorage();
    interactiveStorageData();
    adjustStart();
    checkboxChangesStart();
    uniqueCheckboxesStart();
    visibilityHandler();
    startPopup();
}

startApp()
