import {initBasket} from "./basket";

export const interactiveStorageData = () => {

}

export const setLocalStorageData = (data) => {
    console.log(data)
    localStorage.setItem("initBasket", JSON.stringify(data));
}

export const initLocalStorage = () => {
    if (!localStorage.getItem("initBasket")) {
        localStorage.setItem("initBasket", JSON.stringify(initBasket));
    }
    return null;
}
