//list components that will need for the page
const componentsToLoad = [
    {
        url: 'page-components/sales-information.html',
        placeholderId: 'sales-banner-placeholder'
    },
    {
        url: 'page-components/navigation-bar.html',
        placeholderId: 'navigation-bar-placeholder'
    },
    {
        url: 'page-components/footer.html',
        placeholderId: 'footer-placeholder'
    }
]


let productInventory = null;
let basketItems = [];
let product_list = [];
addEventListener('DOMContentLoaded', () => loadPage());

function loadPage()
{
    //load Page Elements
    loadInventory();
    //load components
    componentsToLoad.forEach(component => fetchPage(component.url, component.placeholderId));
    //load basket items
    getBasketItems();
    //load Basket visual
    loadBasketItem();
    updateOrderSummary();
}

//fetch the page and insert it into the placeholder
function fetchPage(url, placeholderId) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.getElementById(placeholderId).innerHTML = html;
        })
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
        basketItems.push([getInventoryProduct(key), quantity]);
    }
}

function loadInventory() {
    let inventoryItemString = localStorage.getItem('productInventory');
    //if not null get the data from the string or a list
    productInventory = inventoryItemString ? JSON.parse(inventoryItemString) : [];
}

/**
 * fetch the data from inventory database
 * @param productName
 * @returns {*|null}
 */
function getInventoryProduct(productName) {
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
function updateBasketItem() {
    localStorage.setItem('basketItems', JSON.stringify(packBasketItems()));
}


function removeItem(id) {
    //remove item from basket
    basketItems.splice(id, 1);
    updateBasketItem();
    //update visual
    loadBasketItem(basketItems);
}

function increaseQuantity(id) {
    basketItems[id][1]+=1;
    updateBasketItem();
    //update visual
    updateQuantity(id,basketItems[id][1]);
}


function decreaseQuantity(id) {
    basketItems[id][1]-=1;
    let remain = basketItems[id][1];
    if (remain === 0) {
        //remove item from basket
        removeItem(id);
    } else {
        updateBasketItem();
        //update visual
    }
    updateQuantity(id,basketItems[id][1]);
}

function updateQuantity(id, quantity)
{
    updateOrderSummary();
    product_list.children[id].querySelector(".product-quantity").innerText = quantity;
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

function updateOrderSummary() {
    let total = 0;
    for(let i = 0; i < basketItems.length; i++) {
        //quantity * price
        total += basketItems[i][1] * basketItems[i][0].price;
    }
    let shipping = 30;
    let gst = 0.1;
    document.getElementById("order-subtotal").innerText = `$${total.toFixed(2)}`;
    document.getElementById("order-shipping").innerText = `$${shipping.toFixed(2)}`;
    document.getElementById("order-gst").innerText = `$${(total * gst).toFixed(2)}`;
    document.getElementById("order-total").innerText = `$${(total + shipping + total * gst).toFixed(2)}`;
}


//load the website components
function loadBasketItem() {
    product_list = document.getElementsByClassName('basket-products')[0];
    //hard remove all elements
    product_list.innerHTML = "";
    //load items
    fetch('../page-components/templates/basket-item-display-template.html')
        .then(response => response.text())
        .then(template => {
            for (let i = 0; i < basketItems.length; i++) {
                let productDisplay = document.createElement('div');
                productDisplay.innerHTML = template;
                productDisplay.querySelector(".product-name-text").innerText = basketItems[i][0].name;
                productDisplay.querySelector(".product__price").innerText = basketItems[i][0].price;
                productDisplay.querySelector(".product-quantity").innerText = basketItems[i][1];
                productDisplay.querySelector(".basket-image").src = basketItems[i][0].imagePath;
                productDisplay.id = i;
                productDisplay.querySelector(".remove-button").addEventListener('click', () => removeItem(productDisplay.id));
                productDisplay.querySelector(".quantity-icon-plus").addEventListener('click', () => increaseQuantity(productDisplay.id));
                productDisplay.querySelector(".quantity-icon-minus").addEventListener('click', () => decreaseQuantity(productDisplay.id));
                product_list.appendChild(productDisplay);
            }
        });
}


function loadCheckoutPage()
{
    window.location.href = 'checkout-page.html';
}


