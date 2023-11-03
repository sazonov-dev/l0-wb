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

export const interactiveStorageData = () => {
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

export const initLocalStorage = () => {
    if (!localStorage.getItem("totalPrice") && !localStorage.getItem("basketTotalCount") && !localStorage.getItem('totalDiscount') && !localStorage.getItem("itemOrders")) {
        localStorage.setItem("totalPrice", "11008");
        localStorage.setItem("basketTotalCount", "3");
        localStorage.setItem("totalDiscount", localStorage.getItem("totalPrice"));
        localStorage.setItem("itemOrders", JSON.stringify({tShirt: 1, cardHolder: 1, pencil: 1}));
        localStorage.setItem("itemPrices", JSON.stringify({tShirt: 261, cardHolder: 10500, pencil: 247}));
        localStorage.setItem("momentPrice", "0");
    }
    return null;
}
