import { getInventory, getBasketItems, getInventoryProduct, updateBasketItem, packBasketItems } from '../js/inventory-module.js';

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
        url: 'page-components/product-panel.html',
        placeholderId: 'product-panel-placeholder'
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
    componentsToLoad.forEach(component => fetchPage(component.url, component.placeholderId));
    
    //load Page Elements
    productInventory = getInventory();
    //load basket items
    basketItems = getBasketItems(productInventory);
    //load components 

    //load Basket visual
    loadBasketItem();
    updateOrderSummary();
    
    //bind keys
    document.querySelector("#checkout-button").addEventListener('click', () => loadCheckoutPage());
    loadYouMayAlsoLike();
    loadRecentlyViewed();
}

//fetch the page and insert it into the placeholder
function fetchPage(url, placeholderId) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.getElementById(placeholderId).innerHTML = html;
        })
}


function removeItem(id) {
    //remove item from basket
    basketItems.splice(id, 1);
    updateBasketItem(basketItems);
    //update visual
    loadBasketItem(basketItems);
}

function increaseQuantity(id) {
    basketItems[id][1]+=1;
    updateBasketItem(basketItems);
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
        updateBasketItem(basketItems);
        //update visual
    }
    updateQuantity(id,basketItems[id][1]);
}

function updateQuantity(id, quantity)
{
    updateOrderSummary();
    product_list.children[id].querySelector(".product-quantity").innerText = quantity;
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

function loadYouMayAlsoLike()
{

}

function loadRecentlyViewed()
{

}
function loadCheckoutPage()
{
    window.location.href = 'checkout-page.html';
}

