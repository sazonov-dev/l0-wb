// import {localStorageGetValue, localStorageHandler} from "./localStorage";
//
// export const priceBasketChanger = (state, price, lastPrice, currency, discountSelector, priceSelector, key, mainContainer) => {
//     const totalBasketCount = Number(localStorageGetValue('basketTotalCount'));
//
//     switch (state) {
//         case "increment":
//             priceSelector.innerText = `${(lastPrice + price).toLocaleString()} ${currency}`;
//             discountSelector.innerText = `${((lastPrice + price) * 2).toLocaleString()} ${currency}`;
//             priceSelector.dataset.lastprice = lastPrice + price;
//             localStorageHandler('basketTotalCount', totalBasketCount + 1);
//             localStorageHandler('totalPrice', price); // необходимо будет сохранять значение lastprice
//             let updatedItemCount = Number(mainContainer.querySelector('.order__basket-item-input-count').value) + 1;
//             mainContainer.querySelector('.order__basket-item-input-count').value = String(updatedItemCount);
//             localStorageHandler('itemOrders', { value: updatedItemCount, key: key });
//             break;
//         case "decrement":
//             const newLastPrice = lastPrice - price;
//             priceSelector.innerText = `${newLastPrice.toLocaleString()} ${currency}`;
//             discountSelector.innerText = `${(newLastPrice * 2).toLocaleString()} ${currency}`;
//             priceSelector.dataset.lastprice = newLastPrice;
//             localStorageHandler('basketTotalCount', totalBasketCount - 1);
//             localStorageHandler('totalPrice', priceSelector.dataset.lastprice);
//             const updatedItemCountData = Number(mainContainer.querySelector('.order__basket-item-input-count').value) - 1;
//             mainContainer.querySelector('.order__basket-item-input-count').value = String(updatedItemCountData);
//             localStorageHandler('itemOrders', { value: updatedItemCountData, key: key });
//             break;
//
//         default:
//             console.log('Неизвестный стейт, priceBasketChanger');
//     }
// }
