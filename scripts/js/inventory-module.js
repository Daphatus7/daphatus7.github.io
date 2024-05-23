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

/**
 * load inventory from the system.
 * @returns {any|*[]}
 */
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

/**
 * pack basket items into a dictionary
 * @param basketItems current basket items
 * @returns {{}}
 */
export function packBasketItems(basketItems) {
    let packedBasketItems = {};
    for (let i = 0; i < basketItems.length; i++) {
        packedBasketItems[basketItems[i][0].name] = basketItems[i][1];
    }
    return packedBasketItems;
}

/**
 * add item into basket using name
 * @param productInventory cur inventory
 * @param basketItems cur basket item
 * @param basketItemName item name
 */
export function addBasketItem(productInventory, basketItems, basketItemName) {
    //try to find the item in the basket
    for(let i = 0 ; i < basketItems.length; i++) {
        let basketItem = basketItems[i];
        //get first element in the tuple
        if (basketItem[0].name === basketItemName) {
            basketItem[1] += 1;
            return;
        }
    }
    //if the item is not in the basket add a new item
    basketItems.push([getInventoryProduct(productInventory, basketItemName), 1]);
}