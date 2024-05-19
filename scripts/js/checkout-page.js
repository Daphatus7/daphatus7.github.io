import { getInventory, getBasketItems, getInventoryProduct, updateBasketItem, packBasketItems } from '../js/inventory-module.js';


//list components that will need for the page
const componentsToLoad = [
    {
        url: 'page-components/navigation-bar.html',
        placeholderId: 'navigation-bar-placeholder'
    },
    {
        url: 'page-components/progress-bar.html',
        placeholderId:'checkout-progress-bar-placeholder'
    },
    {
        url: 'page-components/checkout-order-summary.html',
        placeholderId: 'checkout-order-items-placeholder'
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

function loadPage() {

    //load Page Elements
    productInventory = getInventory();
    //load basket items
    basketItems = getBasketItems(productInventory);
    //load components
    //load Basket visual
    componentsToLoad.forEach(component => fetchPage(component.url, component.placeholderId));
    loadSummaryItem();
    updateOrderSummary();
}

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
 * load the components listed above
 */

/**
 * fetch the page and insert it into the placeholder
 * @param url
 * @param placeholderId
 */
function fetchPage(url, placeholderId) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.getElementById(placeholderId).innerHTML = html;
        })
}


