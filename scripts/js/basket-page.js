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
        url: 'page-components/basket-order-summary.html',
        placeholderId: 'basket-summary-placeholder'
    },
    {
        url: 'page-components/footer.html',
        placeholderId: 'footer-placeholder'
    }
]


let productInventory = null;
let basketItems = [];
function loadPage()
{
    //load Page Elements
    setInventory();
    //load components
    componentsToLoad.forEach(component => fetchPage(component.url, component.placeholderId));
    //load basket items
    basketItems = getBasketItems();
    //load Basket visual
    loadBasketItem(basketItems);

}
//load the components listed above

//fetch the page and insert it into the placeholder
function fetchPage(url, placeholderId) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.getElementById(placeholderId).innerHTML = html;
        })
}

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

function setInventory() {
    let inventoryItemString = localStorage.getItem('productInventory');
    productInventory = inventoryItemString ? JSON.parse(inventoryItemString) : [];
}

function getProductInventory(productName) {
    for (let i = 0; i < productInventory.length; i++) {
        if (productInventory[i].name === productName) {
            return productInventory[i];
        }
    }
}

function removeItem(id) {
    //remove item from basket
    basketItems.splice(id, 1);
    localStorage.setItem('basketItems', JSON.stringify(packBasketItems()));
    //update visual
    loadBasketItem(basketItems);
}
function packBasketItems() {
    let packedBasketItems = {};
    for (let i = 0; i < basketItems.length; i++) {
        packedBasketItems[basketItems[i][0].name] = basketItems[i][1];
    }
    return packedBasketItems;

}


//load the website components
function loadBasketItem(items) {
    let product_list = document.getElementsByClassName('basket-products')[0];
    
    //hard remove all elements
    product_list.innerHTML = "";
    
    //load items
    fetch('../page-components/templates/basket-item-display-template.html')
        .then(response => response.text())
        .then(template => {
            for (let i = 0; i < items.length; i++) {
                let productDisplay = document.createElement('div');
                productDisplay.innerHTML = template;
                productDisplay.querySelector(".product-name-text").innerText = items[i][0].name;
                productDisplay.querySelector(".product__price").innerText = items[i][0].price;
                productDisplay.querySelector(".product-quantity").innerText = items[i][1];
                productDisplay.querySelector(".basket-image").src = items[i][0].imagePath;
                productDisplay.id = i;
                productDisplay.querySelector(".remove-button").addEventListener('click', () => removeItem(productDisplay.id));
                product_list.appendChild(productDisplay);
            }
        });
}

addEventListener('DOMContentLoaded', () => loadPage());
