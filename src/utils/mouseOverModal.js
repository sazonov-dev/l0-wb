const infoIcons = document.querySelectorAll('.order__basket-card-text-icon');
const freeDeliveryIcon = document.querySelectorAll('.green');
const priceDiscounts = document.querySelectorAll('#priceDiscount');

export const mouseOverModalHandler = () => {
    freeDeliveryIcon.forEach((icon) => {
        icon.addEventListener('mouseover', () => {
            const mainContainer = icon.closest('.order__details-delivery-text') ? icon.closest('.order__details-delivery-text') : icon.closest('.order__info-delivery-badge');
            const modal = mainContainer.querySelector('.order__basket-modal');
            if (mainContainer.classList.contains('order__details-delivery-text')) {
                modal.style.right = '-120px';
            }

            modal.classList.add('active')
        })

        icon.addEventListener('mouseout', () => {
            const mainContainer = icon.closest('.order__details-delivery-text') ? icon.closest('.order__details-delivery-text') : icon.closest('.order__info-delivery-badge');
            const modal = mainContainer.querySelector('.order__basket-modal');

            modal.classList.remove('active')
        })
    })

    infoIcons.forEach((icon) => {
        icon.addEventListener('mouseover', () => {
            const mainContainer = icon.closest('.order__basket-card-description');
            const modal = mainContainer.querySelector('.order__basket-modal');

            modal.classList.add('active')
        })

        icon.addEventListener('mouseout', () => {
            const mainContainer = icon.closest('.order__basket-card-description');
            const modal = mainContainer.querySelector('.order__basket-modal');

            modal.classList.remove('active')
        })
    })

    priceDiscounts.forEach((price) => {
        price.addEventListener('mouseover', () => {
            const mainContainer = price.closest('.order__basket-price');
            const modal = mainContainer.querySelector('.order__basket-modal-discount');

            modal.classList.add('active')
        })

        price.addEventListener('mouseout', () => {
            const mainContainer = price.closest('.order__basket-price');
            const modal = mainContainer.querySelector('.order__basket-modal-discount');

            modal.classList.remove('active')
        })
    })
}
