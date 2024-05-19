/**
 * get basket items from local storage
 */
export function getBasketItems(productInventory) {
    // Get the JSON string from localStorage
    let basketItemString = localStorage.getItem('basketItems');
    // Convert the JSON string back to a tuple list (or an empty list if null)
    let localBasketItems = basketItemString ? JSON.parse(basketItemString) : {};
    let basketItems = [];
    let keys = Object.keys(localBasketItems);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let quantity = localBasketItems[key];
        basketItems.push([getInventoryProduct(productInventory, key), quantity]);
    }
    return basketItems;
}

export function getInventory() {
    let inventoryItemString = localStorage.getItem('productInventory');
    //if not null get the data from the string or a list
    return inventoryItemString ? JSON.parse(inventoryItemString) : [];
}

/**
 * fetch the data from inventory database
 * @param productInventory
 * @param productName
 * @returns {*|null}
 */
export function getInventoryProduct(productInventory ,productName) {
    for (let i = 0; i < productInventory.length; i++) {
        if (productInventory[i].name === productName) {
            return productInventory[i];
        }
    }
    return null;
}

/**
 * save changes in the basket
 */
export function updateBasketItem(basketItems) {
    localStorage.setItem('basketItems', JSON.stringify(packBasketItems(basketItems)));
}

export function packBasketItems(basketItems) {
    let packedBasketItems = {};
    for (let i = 0; i < basketItems.length; i++) {
        packedBasketItems[basketItems[i][0].name] = basketItems[i][1];
    }
    return packedBasketItems;
}