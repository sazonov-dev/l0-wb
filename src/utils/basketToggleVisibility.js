const toggleVisibility = (element, button) => {
    if (element.classList.contains('hidden')) {
        element.classList.remove('hidden');
        button.classList.remove('active')
    } else {
        element.classList.add('hidden');
        button.classList.add('active')
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
