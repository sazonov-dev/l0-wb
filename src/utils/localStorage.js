
const initBasket = {
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

const initForm = {
    name: '',
    surname: '',
    email: '',
    phone: '',
    inn: 0
}

export const interactiveStorageData = () => {
    const data = JSON.parse(getLocalStorageData('initBasket'));
    const formData = JSON.parse(getLocalStorageData('initForm'));
    const mainContainer = document.querySelector('#order-container');
    const orders = mainContainer.querySelectorAll('.order-grid');
    const inputs = document.querySelectorAll('.line-input');

    orders.forEach((order) => {
        const key = order.dataset.key;
        console.log(key)
        const input = order.querySelector('.order__basket-item-input-count');
        const orderPrice = order.querySelector('.order__basket-price-new');
        const priceWithDiscount = order.querySelector('#priceDiscount');
        const itemCount = data.items[key].count;
        const itemPrice = data.items[key].price * itemCount;

        input.setAttribute('value', itemCount)
        orderPrice.innerText = itemPrice.toLocaleString() + ' сом';
        priceWithDiscount.innerText = (((itemPrice / 100) * 55) + itemPrice).toLocaleString() + ' сом';
    })

    inputs.forEach((input) => {
        input.value = formData[input.id];
    })
}

export const setLocalStorageData = (key, data) => {
    switch (key) {
        case "initBasket":
            localStorage.setItem("initBasket", JSON.stringify(data));
            break;
        case "initForm":
            localStorage.setItem("initForm", JSON.stringify(data));
            break;
    }
}

export const getLocalStorageData = (key) => localStorage.getItem(key);

export const initLocalStorage = () => {
    if (!localStorage.getItem("initBasket") && !localStorage.getItem('initForm')) {
        localStorage.setItem("initBasket", JSON.stringify(initBasket));
        localStorage.setItem("initForm", JSON.stringify(initForm));
    }
    return null;
}
