export const getItemAttributes = (container) => {
    const mainContainer = container.closest('.order__basket-card');
    const newPriceElement = mainContainer.querySelector('.order__basket-price-new');
    const discountPriceElement = mainContainer.querySelector('#priceDiscount');
    const lastPrice = Number(newPriceElement.dataset.lastprice);
    const price = Number(newPriceElement.dataset.price);
    const currency = newPriceElement.dataset.currency;
    const key = mainContainer.id;

    return {price, lastPrice, currency, discountSelector: discountPriceElement, priceSelector: newPriceElement, key, mainContainer};
}


