import {getLocalStorageData} from "./localStorage";

const toggleVisibility = (element, button) => {
    const mainContainer = element.closest('.order__basket-content');
    const text = mainContainer.querySelector('.order__basket-selectAll');
    const data = JSON.parse(getLocalStorageData('initBasket'));
    console.log(mainContainer, text, data)

    if (element.classList.contains('hidden')) {
        element.classList.remove('hidden');
        button.classList.remove('active')
        text.innerText = `Выбрать все`
        text.style.fontWeight = '400';
    } else {
        element.classList.add('hidden');
        button.classList.add('active')
        text.innerText = `${data.totalCount} товаров · ${data.totalPrice.toLocaleString()} сом`
        text.style.fontWeight = '700';
    }
}

export const visibilityHandler = () => {
    const basketBoxes = document.querySelectorAll('.order__basket-content');

    basketBoxes.forEach((element) => {
        const button = element.querySelector('.order__basket-btn');
        const box = element.querySelector('.order-basket__container');
        button.addEventListener('click', () => toggleVisibility(box, button))
    })
}
