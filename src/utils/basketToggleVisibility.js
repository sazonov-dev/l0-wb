import {getLocalStorageData} from "./localStorage";

const toggleVisibility = (element, button) => {
    const data = JSON.parse(getLocalStorageData('initBasket'));


    if (element.classList.contains('hidden')) {
        element.classList.remove('hidden');
        button.classList.remove('active')
        if (element.closest('#settings')) {
            const mainContainer = element.closest('.order__basket-content');
            const text = mainContainer.querySelector('.order__basket-selectAll');
            const checkbox = mainContainer.querySelector('.order__basket-checkbox');

            checkbox.style.display = 'block'
            text.innerText = `Выбрать все`
            text.style.fontWeight = '400';
            text.style.marginLeft = '11px';
            text.style.marginRight = 'auto'
        }
    } else {
        element.classList.add('hidden');
        button.classList.add('active')

        if (element.closest('#settings')) {
            const mainContainer = element.closest('.order__basket-content');
            const text = mainContainer.querySelector('.order__basket-selectAll');
            const checkbox = mainContainer.querySelector('.order__basket-checkbox');

            checkbox.style.display = 'none'
            text.innerText = `${data.totalCount} товаров · ${data.totalPrice.toLocaleString()} сом`
            text.style.fontWeight = '700';
            text.style.margin = '0'
        }
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
