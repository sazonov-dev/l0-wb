import {localStorageGetValue} from "./localStorage";

const mainCheckbox = document.querySelector('#basketAllCheckbox');
const uniqueCheckboxes = document.querySelectorAll('.custom-checkbox');

const isCheckboxChecked = () => {
    switch (mainCheckbox.checked) {
        case true:
            return checkboxCheckedHandler(true);
        case false:
            return checkboxCheckedHandler(false);
        default:
            console.log('Неизвестное состояние, addCheckedToCheckboxes')
    }
}

const checkboxCheckedHandler = (state) => {
    const allCheckboxes = document.querySelectorAll('.custom-checkbox');

    switch (state) {
        case true:
            allCheckboxes.forEach((checkbox) => {
                if (checkbox.id !== 'delivery-checkbox') {
                    checkbox.checked = true
                }
            });
            basketModalHandler(true);
            break;
        case false:
            allCheckboxes.forEach((checkbox) => {
                if (checkbox.id !== 'delivery-checkbox') {
                    checkbox.checked = false
                }
            });
            basketModalHandler(false);
            break;
        default:
            console.log('Неизвестное состояние, checkboxCheckedHandler')
    }
}

export const basketModalHandler = (state, data = null) => {
    const totalStoragePrice = Number(localStorageGetValue('totalPrice'));
    const totalStorageDiscount = Number(localStorageGetValue('totalDiscount'));
    const basketCounter = document.querySelector('.basket__counter');
    const totalPrice = document.querySelector('.order__info-total-price')
    const totalProductCount = document.querySelector('#totalProductCount')
    const totalProductPrice = document.querySelector('#totalProductPrice');
    const totalProductDiscount = document.querySelector('#totalProductDiscount')

    if (data === null) {
        switch (state) {
            case true:
                basketCounter.innerText = localStorageGetValue('basketTotalCount');
                totalPrice.innerText = `${totalStoragePrice.toLocaleString()} сом`;
                totalProductCount.innerText = `${localStorageGetValue('basketTotalCount')} товара`;
                totalProductPrice.innerText = `${(totalStoragePrice + totalStorageDiscount).toLocaleString()} сом`
                totalProductDiscount.innerText = `-${totalStorageDiscount.toLocaleString()} сом`;
                break;
            case false:
                basketCounter.innerText = '0';
                totalPrice.innerText = `0 сом`;
                totalProductCount.innerText = `0 товаров`;
                totalProductPrice.innerText = `0 сом`
                totalProductDiscount.innerText = `-0 сом`;
                break;
        }
    } else {
        switch (state) {
            case true:
                basketCounter.innerText = data.totalProductCount
                totalPrice.innerText = `${data.totalPrice} сом`;
                totalProductCount.innerText = `${data.totalProductCount} товара`;
                totalProductPrice.innerText = `${data.totalProductPrice.toLocaleString()} сом`
                totalProductDiscount.innerText = `-${data.totalProductDiscount.toLocaleString()} сом`;
                break;
        }
    }
}

export const uniqueCheckboxHandler = (event) => {
    const target = event.target;
    const id = target.id;
    const itemsCount =  JSON.parse(localStorageGetValue("itemOrders"));
    const itemPrices = JSON.parse(localStorageGetValue("itemPrices"));
    let itemPrice = 0;

    switch (id) {
        case "checkbox-1":
            itemPrice = Number(itemPrices["tShirt"]) * Number(itemsCount["tShirt"])
            console.log(itemPrice)
            if (target.checked) {
                return basketModalHandler(true, {totalPrice: itemPrice.toLocaleString(), totalProductCount: Number(itemsCount["tShirt"]), totalProductPrice: itemPrice + (itemPrice / 2), totalProductDiscount: (itemPrice * 2)})
            }

            return basketModalHandler(false);
        case "checkbox-2":
            itemPrice = Number(itemPrices["cardHolder"]) * Number(itemsCount["cardHolder"])
            if (target.checked) {
                return basketModalHandler(true, {totalPrice: itemPrice.toLocaleString(), totalProductCount: Number(itemsCount["cardHolder"]), totalProductPrice: itemPrice + (itemPrice / 2), totalProductDiscount: (itemPrice / 2)})
            }
            return basketModalHandler(false);
        case "checkbox-3":
            itemPrice = Number(itemPrices["pencil"]) * Number(itemsCount["pencil"])
            if (target.checked) {
                return basketModalHandler(true, {totalPrice: itemPrice.toLocaleString(), totalProductCount: Number(itemsCount["pencil"]), totalProductPrice: itemPrice + (itemPrice / 2), totalProductDiscount: (itemPrice * 2)})
            }
            return basketModalHandler(false);
        case "delivery-checkbox":
            if (target.checked && isAnyInputChecked()) {
                return basketDeliveryButtonHandler(true);
            }

            return basketDeliveryButtonHandler(false);
    }
}

const isAnyInputChecked = () => Array.from(uniqueCheckboxes).filter((checkbox) => checkbox.id !== 'delivery-checkbox').some((checkbox) => checkbox.checked);

const basketDeliveryButtonHandler = (state) => {
    const totalStoragePrice = Number(localStorageGetValue('totalPrice'));
    const button = document.querySelector('.order__info-delivery-btn');

    switch (state) {
        case true:
            button.innerText = `Оплатить ${totalStoragePrice.toLocaleString()} сом`;
            break;
        case false:
            button.innerText = `Заказать`;
            break;
        default:
            console.log("Не известный стейт, basketDeliveryButtonHandler")
    }
}

export const checkboxChangesStart = () => mainCheckbox.addEventListener('change', isCheckboxChecked);
export const uniqueCheckboxesStart = () => uniqueCheckboxes.forEach((checkbox) => checkbox.addEventListener('change', uniqueCheckboxHandler))
