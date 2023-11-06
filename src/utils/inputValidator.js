import {getLocalStorageData, setLocalStorageData} from "./localStorage";

const inputToValidate = document.querySelectorAll('.line-input');

const inputErrorStyle = (input, error) => {
    const mainContainer = input.closest('.order__basket-person-grid-line');
    const spanError = mainContainer.querySelector('.line-error');
    spanError.style.color = '#F55123';
    input.style.borderBottom = '1px solid #F55123';
    input.style.color = '#F55123';
    spanError.innerText = error;
}

const inputDefaultStyle = (input, value = null, span = null) => {
    const mainContainer = input.closest('.order__basket-person-grid-line');
    const spanError = mainContainer.querySelector('.line-error');
    spanError.style.color = '#000';
    input.style.borderBottom = '1px solid rgba(0,0,0,.2)';
    input.style.color = '#000';
    spanError.innerText = '';

    if (span !== null) {
        spanError.innerText = span;
    }

    if (value !== null) {
        input.value = value;
    }
}

const inputValidateHandler = (event) => {
    const target = event.target;
    const id = target.id;
    const value = target.value;
    const formData = JSON.parse(getLocalStorageData('initForm'));

    switch (id) {
        case "name":
            if (!inputNameValidate(value)) {
                return inputErrorStyle(target, "Имя введено не корректно")
            }
            formData.name = value;
            setLocalStorageData("initForm", formData);
            return inputDefaultStyle(target);
        case "surname":
            if (!inputNameValidate(value)) {
                return inputErrorStyle(target, "Имя введено не корректно")
            }
            formData.surname = value;
            setLocalStorageData("initForm", formData);
            return inputDefaultStyle(target);
        case "phone":
            const data = inputPhoneValidate(value);
            if (!data) {
                return inputErrorStyle(target, "Не верный номер")
            }
            if (typeof data === 'string') {
                formData.phone = data;
                setLocalStorageData("initForm", formData);
                return inputDefaultStyle(target, data);
            }
            return inputDefaultStyle(target);
        case "email":
            if (!inputEmailValidate(value)) {
                return inputErrorStyle(target, "Не верный формат почты")
            }
            formData.email = value;
            setLocalStorageData("initForm", formData);
            return inputDefaultStyle(target);
        case "inn":
            if (!inputInnValidate(value)) {
                return inputErrorStyle(target, "ИНН минимум 14 цифр")
            }
            formData.inn = value;
            setLocalStorageData("initForm", formData);
            return inputDefaultStyle(target, null, "Для томоженного оформления");
        default:
            console.log('Не известный ID, inputValidateHandler');
    }
}

const inputNameValidate = (value) => {
    const regex = /^[а-яё]+$/i;

    return regex.test(value) || value === '';
}

const inputPhoneValidate = (value) => {
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberPattern = /^(7|\+7)\d{10}$/;

    if (value === '') {
        return true;
    }

    if (phoneNumberPattern.test(phoneNumber) && phoneNumber.length === 11) {
        return '+7 ' + phoneNumber.slice(1, 4) + ' ' + phoneNumber.slice(4, 7) + '-' + phoneNumber.slice(7, 9) + '-' + phoneNumber.slice(9, 11);
    }

    return false;
}

const inputEmailValidate = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(value) || value === '';
}

const inputInnValidate = (value) => {
    const innPattern = /^\d{14}$/;

    return innPattern.test(value) || value === '';
}

export const inputValidateStart = () => {
    inputToValidate.forEach((input) => input.addEventListener('change', inputValidateHandler));
}
