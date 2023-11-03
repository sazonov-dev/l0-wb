const deleteItems = (event) => {
    const target = event.target;
    let parent;
    let item;

    switch (target.id) {
        case "delete-item":
            parent = target.closest('.order__basket-items');
            item = target.closest('.order__basket-item');
            parent.removeChild(item);
            break;
        case "delete-item-popup":
            parent = target.closest('.popup__card');
            item = target.closest('.popup__card-item');
            parent.removeChild(item);
            break;
        default:
            console.log("Undefined ID, deleteItems");
    }
}

export const deleteItemsHandler = () => {
    const orderDeleteButtons = document.querySelectorAll('#delete-item');
    const popupDeleteButton = document.querySelectorAll('#delete-item-popup');

    orderDeleteButtons.forEach((button) => button.addEventListener('click', deleteItems));
    popupDeleteButton.forEach((button) => button.addEventListener('click', deleteItems));
}
