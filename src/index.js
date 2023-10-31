import './scss/styles.scss';
import { adjustStart } from './utils/basketPriceOptimization';
import { checkboxChangesStart } from "./utils/basketCheckbox";
import {visibilityHandler} from "./utils/basketToggleVisibility";




const startApp = () => {
    adjustStart();
    checkboxChangesStart();
    visibilityHandler();
}

startApp()
