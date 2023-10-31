const mainCheckbox = document.querySelector('#basketAllCheckbox');

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
            allCheckboxes.forEach((checkbox) => checkbox.checked = true);
            break;
        case false:
            allCheckboxes.forEach((checkbox) => checkbox.checked = false);
            break;
        default:
            console.log('Неизвестное состояние, checkboxCheckedHandler')
    }
}

export const checkboxChangesStart = () => mainCheckbox.addEventListener('change', isCheckboxChecked);
