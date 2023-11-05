import {setLocalStorageData} from "./localStorage";

const buttons = document.querySelectorAll('.order__basket-item-btn');
const checkboxes = document.querySelectorAll('.order__basket-checkbox-input');

export const initBasket = {
    totalPrice: 0,
    totalCount: 0,
    totalDiscount: 0,
    currency: 'сом',
    items: {
        tShirt: {
            price: 250,
            discountPercent: 55,
            count: 0,
            maxCount: 2,
            status: false
        },
        cardHolder: {
            price: 10500,
            discountPercent: 55,
            count: 0,
            maxCount: 999,
            status: false
        },
        pencil: {
            price: 300,
            discountPercent: 55,
            count: 0,
            maxCount: 2,
            status: false
        },

    }
}

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
            setLocalStorageData(initBasket);
            return inputValueHandler(target, key);
        case "decrement":
            changeBasketHandler("DECREMENT_COUNT", {key, data: 1})
            changeBasketHandler("DECREMENT_TOTAL_COUNT", {key: 'totalCount', data: 1});
            orderInfoHandler();
            priceInfoHandler(target, key);
            setLocalStorageData(initBasket);
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

const orderInfoHandler = () => {
    const order = document.querySelector('.order__info');
    const totalPrice = order.querySelector('.order__info-total-price');
    const totalCount = order.querySelector('#totalProductCount');
    const totalPriceWithDiscount = order.querySelector('#totalProductPrice');
    const totalDiscount = order.querySelector('#totalProductDiscount');
    const basketCount = document.querySelectorAll('.basket__counter');
    const currency = initBasket.currency;

    const filteredItems = Object.keys(initBasket.items)
        .filter(item => initBasket.items[item].status)
        .reduce((filtered, item) => {
            filtered[item] = initBasket.items[item];
            return filtered;
        }, {});

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
    }

    setLocalStorageData(initBasket);
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
    buttons.forEach((button) => button.addEventListener('click', buttonHandler));
    checkboxes.forEach((checkbox) => checkbox.addEventListener('click', checkboxHandler));
}


