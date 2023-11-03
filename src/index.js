import './scss/styles.scss';
import {adjustStart} from './utils/basketPriceOptimization';
import {checkboxChangesStart, uniqueCheckboxesStart} from "./utils/basketCheckbox";
import {visibilityHandler} from "./utils/basketToggleVisibility";
import {startPopup} from './utils/popup';
import {initLocalStorage, interactiveStorageData} from './utils/localStorage';
import {inputValidatorHandler, inputValidateStart} from './utils/inputValidator';
import {deleteItemsHandler} from "./utils/deleteItems";
import {mouseOverModalHandler} from "./utils/mouseOverModal";

const startApp = () => {
    initLocalStorage();
    interactiveStorageData();
    adjustStart();
    checkboxChangesStart();
    inputValidatorHandler();
    inputValidateStart();
    uniqueCheckboxesStart();
    deleteItemsHandler();
    mouseOverModalHandler();
    visibilityHandler();
    startPopup();
}

startApp()
