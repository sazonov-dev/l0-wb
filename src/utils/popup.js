const body = document.querySelector('.body');
const overlay = body.querySelector('.overlay');
const popupDelivery = document.querySelector('#popup__delivery');
const popupPayment = document.querySelector('#popup__payment');
const deliveryButtons = document.querySelectorAll('#delivery-popup-btn');
const paymentButtons = document.querySelectorAll('#payment-popup-btn');

const modalHandler = (modal) => {
    openModal(modal);
    closeModalByIcon(modal);
    closeModalByEsc(modal);
}

const openModal = (modal) => {
    modal.classList.add('active');
    overlay.classList.add('active');
}

const closeModalByIcon = (modal) => {
    const closeButton = modal.querySelector('.popup__header-exit');
    const selectButton = modal.querySelector('.popup__button');
    closeButton.addEventListener('click', () => {
        modal.classList.remove('active')
        overlay.classList.remove('active');
    });
    selectButton.addEventListener('click', () => {
        modal.classList.remove('active')
        overlay.classList.remove('active');
    })
}

const closeModalByEsc = (modal) => {
    overlay.addEventListener('click', (evt) => {
        overlay.classList.remove('active');
        modal.classList.remove('active')
    });
    document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') {
            modal.classList.remove('active')
            overlay.classList.remove('active')
        }
    })
}

export const startPopup = () => {
    deliveryButtons.forEach((button) => button.addEventListener('click', () => modalHandler(popupDelivery)));
    paymentButtons.forEach((button) => button.addEventListener('click', () => modalHandler(popupPayment)));
}
