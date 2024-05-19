
let productInventory = null;
let product_list = [];
let basketItems = [];
function loadInventory() {
    let inventoryItemString = localStorage.getItem('productInventory');
    //if not null get the data from the stirng or a list
    productInventory = inventoryItemString ? JSON.parse(inventoryItemString) : [];
}


/**
 * get basket items from local storage
 */
function getBasketItems() {
    // Get the JSON string from localStorage
    let basketItemString = localStorage.getItem('basketItems');
    // Convert the JSON string back to a tuple list (or an empty list if null)
    let localBasketItems = basketItemString ? JSON.parse(basketItemString) : {};
    let keys = Object.keys(localBasketItems);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let quantity = localBasketItems[key];
        basketItems.push([getProductInventory(key), quantity]);
    }
    return basketItems;
}

/**
 * fetch the data from inventory database
 * @param productName
 * @returns {*|null}
 */
function getProductInventory(productName) {
    for (let i = 0; i < productInventory.length; i++) {
        if (productInventory[i].name === productName) {
            return productInventory[i];
        }
    }
    return null;
}

/**
 * add basket items into a tuple that can be used in local storage
 * (name, quantity)
 * @returns {{}}
 */
function packBasketItems() {
    let packedBasketItems = {};
    for (let i = 0; i < basketItems.length; i++) {
        packedBasketItems[basketItems[i][0].name] = basketItems[i][1];
    }
    return packedBasketItems;
}

/**
 * save changes in the basket
 */
function updateBasketItem() {
    localStorage.setItem('basketItems', JSON.stringify(packBasketItems()));
}