import './scss/styles.scss';
import {visibilityHandler} from "./utils/basketToggleVisibility";
import {startPopup} from './utils/popup';
import {initLocalStorage, interactiveStorageData} from './utils/localStorage';
import {inputValidateStart} from './utils/inputValidator';
import {deleteItemsHandler} from "./utils/deleteItems";
import {mouseOverModalHandler} from "./utils/mouseOverModal";
import {startBasket} from "./utils/basket";

const startApp = () => {
    initLocalStorage();
    interactiveStorageData();
    inputValidateStart();
    deleteItemsHandler();
    mouseOverModalHandler();
    visibilityHandler();
    startPopup();
    startBasket();
}

startApp()
