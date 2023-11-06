import {getLocalStorageData, setLocalStorageData} from "./localStorage";
import {inputErrorStyle, inputValidate, inputValidateHandler} from "./inputValidator";

const buttons = document.querySelectorAll('.order__basket-item-btn');
const checkboxes = document.querySelectorAll('.order__basket-checkbox-input');
const button = document.querySelector('.order__info-delivery-btn');

let initBasket = null;

const changeBasketState = (key, value, payload) => {
    switch (payload.type) {
        case "ITEM_COUNT":
            initBasket.items[key].count = value
            break;
        case "ITEM_STATUS":
            initBasket.items[key].status = value;
            break;
        case "TOTAL_COUNT":
            initBasket[key] = value
            break;
        default:
            initBasket.key = value;
            break;
    }
};

const getBasketKeyValue = (key) => initBasket[key];

const changeBasketHandler = (action, payload) => {
    let prevValue = null;
    let newValue = null;
    let maxCount = null;

    switch (action) {
        case "INCREMENT_TOTAL_PRICE":
            prevValue = getBasketKeyValue(payload.key);
            newValue = prevValue + payload.data;
            return changeBasketState(payload.key, newValue);
        case "DECREMENT_TOTAL_PRICE":
            prevValue = getBasketKeyValue(payload.key);
            newValue = prevValue - payload.data;
            return changeBasketState(payload.key, newValue);
        case "INCREMENT_COUNT":
            maxCount = initBasket.items[payload.key].maxCount;
            prevValue = initBasket.items[payload.key].count;
            newValue = prevValue + payload.data;
            if (newValue <= maxCount) {
                return changeBasketState(payload.key, newValue, {type: "ITEM_COUNT"});
            }
            break;
        case "DECREMENT_COUNT":
            prevValue = initBasket.items[payload.key].count;
            newValue = prevValue - payload.data;
            if (newValue >= 0) {
                return changeBasketState(payload.key, newValue, {type: "ITEM_COUNT"});
            }
            break;
        case "INCREMENT_TOTAL_COUNT":
            maxCount = initBasket.items[payload.itemKey].maxCount;
            prevValue = getBasketKeyValue(payload.itemKey);
            newValue = prevValue + payload.data;
            if (newValue <= maxCount) {
                return changeBasketState(payload.key, newValue, {type: "TOTAL_COUNT"});
            }
            break;
        case "DECREMENT_TOTAL_COUNT":
            prevValue = getBasketKeyValue(payload.key);
            newValue = prevValue - payload.data;
            if (newValue >= 0) {
                return changeBasketState(payload.key, newValue, {type: "TOTAL_COUNT"});
            }
            break;
        case "CHANGE_ITEM_STATUS":
            return changeBasketState(payload.key, payload.data, {type: "ITEM_STATUS"});
    }
}

const inputValueHandler = (element, key) => {
    const mainContainer = element.closest('.order__basket-total-counter');
    const input = mainContainer.querySelector('.order__basket-item-input-count');
    const value = initBasket.items[key].count;

    input.setAttribute('value', value);
}

const buttonHandler = (event) => {
    const target = event.target;
    const id = target.id;
    const key = target.closest('.order-grid').dataset.key;

    switch (id) {
        case "increment":
            changeBasketHandler("INCREMENT_COUNT", {key, data: 1})
            changeBasketHandler("INCREMENT_TOTAL_COUNT", {key: 'totalCount', data: 1, itemKey: key});
            orderInfoHandler();
            priceInfoHandler(target, key);
            setLocalStorageData("initBasket", initBasket);
            return inputValueHandler(target, key);
        case "decrement":
            changeBasketHandler("DECREMENT_COUNT", {key, data: 1})
            changeBasketHandler("DECREMENT_TOTAL_COUNT", {key: 'totalCount', data: 1});
            orderInfoHandler();
            priceInfoHandler(target, key);
            setLocalStorageData("initBasket", initBasket);
            return inputValueHandler(target, key);
    }
}

const isEmptyObject = (obj) => {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}

const priceInfoHandler = (target, key) => {
    const item = target.closest('.order-grid__price');
    const price = item.querySelector('.order__basket-price-new');
    const priceWithoutDiscount = item.querySelector('#priceDiscount');

    const itemPrice = initBasket.items[key].price;
    const itemCount = initBasket.items[key].count;

    price.innerText = `${(itemPrice * itemCount).toLocaleString()} ${initBasket.currency}`
    priceWithoutDiscount.innerText = `${(((itemPrice * itemCount) / 100 * 55) + (itemPrice * itemCount)).toLocaleString()} ${initBasket.currency}`

}

const filteredItemsFunc = (items) => {
    return Object.keys(items)
        .filter(item => items[item].status)
        .reduce((filtered, item) => {
            filtered[item] = items[item];
            return filtered;
        }, {});
}

const orderInfoHandler = () => {
    const order = document.querySelector('.order__info');
    const totalPrice = order.querySelector('.order__info-total-price');
    const totalCount = order.querySelector('#totalProductCount');
    const totalPriceWithDiscount = order.querySelector('#totalProductPrice');
    const totalDiscount = order.querySelector('#totalProductDiscount');
    const basketCount = document.querySelectorAll('.basket__counter');
    const currency = initBasket.currency;

    const filteredItems = filteredItemsFunc(initBasket.items);

    const totalInfo = Object.keys(filteredItems).reduce((filtered, item) => {
        if (!filtered.totalPrice) {
            filtered.totalPrice = filteredItems[item].price * filteredItems[item].count;
        } else {
            filtered.totalPrice = (filteredItems[item].price * filteredItems[item].count) + filtered.totalPrice;
        }

        if (!filtered.totalCount) {
            filtered.totalCount = filteredItems[item].count;
        } else {
            filtered.totalCount = filteredItems[item].count + filtered.totalCount;
        }

        return filtered;
    }, {})

    if (isEmptyObject(filteredItems)) {
        totalPrice.innerText = `0 ${currency}`;
        totalCount.innerText = '0 товаров';
        totalPriceWithDiscount.innerText = `0 ${currency}`;
        totalDiscount.innerText = `−0 ${currency}`;
        basketCount.forEach((basket) => basket.innerText = '0')
    } else {
        totalPrice.innerText = `${totalInfo.totalPrice.toLocaleString()} ${currency}`;
        totalCount.innerText = `${totalInfo.totalCount} товаров`;
        totalPriceWithDiscount.innerText = `${((totalInfo.totalPrice / 100 * 55) + totalInfo.totalPrice).toLocaleString()} ${currency}`
        totalDiscount.innerText = `−${(totalInfo.totalPrice / 100 * 55).toLocaleString()} ${currency}`
        basketCount.forEach((basket) => basket.innerText = `${totalInfo.totalCount}`)
        initBasket.totalCount = totalInfo.totalCount;
        initBasket.totalPrice = totalInfo.totalPrice;
        initBasket.totalDiscount = (totalInfo.totalPrice / 100 * 55);
    }

    setLocalStorageData("initBasket", initBasket);
}

const checkEmptyInputs = () => {
    const inputs = Array.from(document.querySelectorAll('.line-input'));

    const emptyInputs = inputs.map((input) => {
        if (input.value.length === 0) {
            return input
        }
    }).filter((item) => item !== undefined);


    if (emptyInputs.length !== 0) {
        emptyInputs.forEach((input) => {
            inputErrorStyle(input, 'Пустое поле')
        })

        return true;
    }

    return false;
}

const paymentNowButtonHandler = () => {
    const checkedItems = filteredItemsFunc(initBasket.items);
    let totalPrice = 0;

    if (isEmptyObject(checkedItems)) {
        button.innerText = 'Заказать'
        return null;
    } else {
        for (let key in checkedItems) {
            totalPrice = (checkedItems[key].count * checkedItems[key].price) + totalPrice;
        }

        button.innerText = `Оплатить ${totalPrice.toLocaleString()} сом`
    }
}

const checkboxHandler = (event) => {
    const target = event.target;
    const keys = ['tShirt', 'cardHolder', 'pencil'];

    if (target.id === 'basketAllCheckbox' && target.checked) {
        keys.forEach((key) => {
            changeBasketHandler("CHANGE_ITEM_STATUS", {key, data: true})
        })
        checkboxesSetState(true);
        return orderInfoHandler();
    }

    if (target.id === 'basketAllCheckbox' && !target.checked) {
        keys.forEach((key) => {
            changeBasketHandler("CHANGE_ITEM_STATUS", {key, data: false})
        })
        checkboxesSetState(false);
        return orderInfoHandler();
    }

    if (target.id === 'delivery-checkbox' && target.checked) {
        paymentNowButtonHandler()
        return null
    }

    if (target.id === 'delivery-checkbox' && !target.checked) {
        paymentNowButtonHandler()
        return null
    }

    const key = target.closest('.order-grid').dataset.key;

    if (target.checked) {
        changeBasketHandler("CHANGE_ITEM_STATUS", {key, data: true})
        return orderInfoHandler();
    } else {
        changeBasketHandler("CHANGE_ITEM_STATUS", {key, data: false})
        return orderInfoHandler();
    }
}

const checkboxesSetState = (state) => {
    const allCheckboxes = document.querySelectorAll('.custom-checkbox');

    switch (state) {
        case true:
            allCheckboxes.forEach((checkbox) => {
                if (checkbox.id !== 'delivery-checkbox') {
                    checkbox.checked = true
                }
            });
            break;
        case false:
            allCheckboxes.forEach((checkbox) => {
                if (checkbox.id !== 'delivery-checkbox') {
                    checkbox.checked = false
                }
            });
            break;
        default:
            console.log('Неизвестное состояние, checkboxesSetState')
    }
}

export const startBasket = () => {
    initBasket = JSON.parse(getLocalStorageData('initBasket'));
    buttons.forEach((button) => button.addEventListener('click', buttonHandler));
    checkboxes.forEach((checkbox) => checkbox.addEventListener('click', checkboxHandler));
    button.addEventListener('click', checkEmptyInputs)
}


