const container = document.querySelectorAll('.order__basket-price');
const adjustFontSize = (element) => {
    const text = element.querySelector('.order__basket-price-new');
    const containerWidth = element.offsetWidth;

    let textWidth = text.offsetWidth;

    let fontSize = parseFloat(getComputedStyle(text).fontSize);

    if (textWidth >= containerWidth) {
        while (textWidth >= containerWidth && fontSize > 10) {
            fontSize -= 2;
            text.style.fontSize = fontSize + 'px';
            textWidth = text.offsetWidth;
        }
    }
}

export const adjustStart = () => {
    container.forEach((element) => {
        window.addEventListener('load', () => adjustFontSize(element));
    })
}
