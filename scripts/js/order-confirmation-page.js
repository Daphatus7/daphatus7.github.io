/**
 * this JS handles order confirmation page
 */

//Add components to the page

const componentsToLoad = [
    {
        url: 'page-components/navigation-bar.html',
        placeholderId: 'navigation-bar-placeholder'
    },
    {
        url:'page-components/progress-bar.html',
        placeholderId: "progress-bar-placeholder"
    },
    {
        url: 'page-components/order-confirmation-panel.html',
        placeholderId: 'order-confirmation-page-placeholder'
    },
    {
        url: 'page-components/checkout-order-summary.html',
        placeholderId: 'order-summary-placeholder'
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

/**
 * this loads the webpage
 */
function loadPage() {
    loadInventory();
    getBasketItems();
    componentsToLoad.forEach(component => fetchPage(component.url, component.placeholderId));
    loadSummaryItem();
    updateOrderSummary();
}

/**
 * function to load different components on the pag
 * @param url the component link
 * @param placeholderId the name for the element
 */
function fetchPage(url, placeholderId) 
{
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.getElementById(placeholderId).innerHTML = html;
        })
}

function loadIndexPage()
{
    window.location.href = 'index.html';
}

/**
 * update order when inc qty or dec
 */
function updateOrderSummary(){
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


/**
 * load basket items in checkout format
 * @param items
 */
function loadSummaryItem() {
    product_list = document.getElementsByClassName('checkout-items')[0];
    //hard remove all elements
    console.log(basketItems);
    //load items
    fetch('../../page-components/templates/summary-product-display-template.html')
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
                product_list.appendChild(productDisplay);
            }
        });
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