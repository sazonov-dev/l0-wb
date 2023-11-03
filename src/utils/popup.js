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
    modal.closest('.overlay').classList.add('active');
}

const closeModalByIcon = (modal) => {
    const closeButton = modal.querySelector('.popup__header-exit');
    const selectButton = modal.querySelector('.popup__button');
    closeButton.addEventListener('click', () => modal.closest('.overlay').classList.remove('active'));
    selectButton.addEventListener('click', () => modal.closest('.overlay').classList.remove('active'))
}

const closeModalByEsc = (modal) => {
    const overlay = modal.closest('.overlay');
    overlay.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('overlay')) {
            overlay.classList.remove('active')
        }
    });
    document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') {
            overlay.classList.remove('active')
        }
    })
}

export const startPopup = () => {
    deliveryButtons.forEach((button) => button.addEventListener('click', () => modalHandler(popupDelivery)));
    paymentButtons.forEach((button) => button.addEventListener('click', () => modalHandler(popupPayment)));
}
