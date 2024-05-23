/**
 * this handles all tasks in basket - page
 */



/**
 * import common methods from inventory-module to improve modularity and reusability of code
 */
import { getInventory, getBasketItems, getInventoryProduct, updateBasketItem, packBasketItems } from '../js/inventory-module.js';

/**
 * list components that will need for the page
 * Sales 
 */
const componentsToLoad = [
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

//local inventory
let productInventory = null;

//local basket
let basketItems = [];

//local basket items
let product_list = [];

//panel for you may also like lst
let youMayAlsoLikeList;

//panel for recently viewed list
let recentlyViewedList;
addEventListener('DOMContentLoaded', () => loadPage());

/**
 * Load the page
 */
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

    //load recommended items
    loadExtraItems(youMayAlsoLikeList, 'you-may-also-like-items');
    loadExtraItems(recentlyViewedList, 'recently-viewed-items');
}

/**
 * fetch the page and insert it into the placeholder
 * @param url the link to the page
 * @param placeholderId the placeholder name
 */
function fetchPage(url, placeholderId) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.getElementById(placeholderId).innerHTML = html;
        })
}


/**
 * remove item from basket when clicking on cross button
 * @param id
 */
function removeItem(id) {
    //remove item from basket
    basketItems.splice(id, 1);
    updateBasketItem(basketItems);
    //update visual
    loadBasketItem(basketItems);
}

/**
 * increase item qty when clicking on incr qty
 * @param id selected item id
 */
function increaseQuantity(id) {
    basketItems[id][1]+=1;
    updateBasketItem(basketItems);
    //update visual
    updateQuantity(id,basketItems[id][1]);
}


/**
 * decrease item qty when clicking on incr qty
 * @param id selected item id
 */
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

/**
 * update inventory qty
 * @param id item
 * @param quantity new qty
 */
function updateQuantity(id, quantity)
{
    //update price
    updateOrderSummary();
    //update qty
    product_list.children[id].querySelector(".product-quantity").innerText = quantity;
}

/**
 * update order summary price
 */
function updateOrderSummary() {
    //math
    let total = 0;
    for(let i = 0; i < basketItems.length; i++) {
        //quantity * price
        total += basketItems[i][1] * basketItems[i][0].price;
    }
    let shipping = 30;
    let gst = 0.1;
    
    //update UI
    document.getElementById("order-subtotal").innerText = `$${total.toFixed(2)}`;
    document.getElementById("order-shipping").innerText = `$${shipping.toFixed(2)}`;
    document.getElementById("order-gst").innerText = `$${(total * gst).toFixed(2)}`;
    document.getElementById("order-total").innerText = `$${(total + shipping + total * gst).toFixed(2)}`;
}

/**
 * load basket items
 */
function loadBasketItem() {
    //get page element
    product_list = document.getElementsByClassName('basket-products')[0];
    //hard remove all elements
    product_list.innerHTML = "";
    //get template for the element
    fetch('../page-components/templates/basket-item-display-template.html')
        .then(response => response.text())
        .then(template => {
            for (let i = 0; i < basketItems.length; i++) {
                let productDisplay = document.createElement('div');
                productDisplay.innerHTML = template;
                //name
                productDisplay.querySelector(".product-name-text").innerText = basketItems[i][0].name;
                //price
                productDisplay.querySelector(".product__price").innerText = basketItems[i][0].price;
                //qty
                productDisplay.querySelector(".product-quantity").innerText = basketItems[i][1];
                //img
                productDisplay.querySelector(".basket-image").src = basketItems[i][0].imagePath;
                //id for selecting
                productDisplay.id = i;
                //bind buttons
                productDisplay.querySelector(".remove-button").addEventListener('click', () => removeItem(productDisplay.id));
                productDisplay.querySelector(".quantity-icon-plus").addEventListener('click', () => increaseQuantity(productDisplay.id));
                productDisplay.querySelector(".quantity-icon-minus").addEventListener('click', () => decreaseQuantity(productDisplay.id));
                product_list.appendChild(productDisplay);
            }
        });
}

/**
 * used for load you may also like
 * @param panel the local panel element ref
 * @param name the name of element
 */
function loadExtraItems(panel, name) {
    panel = document.getElementById(name);
    fetch('page-components/templates/product-item-display-template.html')
        .then(response => response.text())
        .then(template => {
            for (let i = 0; i < Math.random() * 4; i++) {
                let randomNumber = Math.floor(Math.random() * productInventory.length);
                let localItem = productInventory[randomNumber];
                let productDisplay = document.createElement('div');
                //assign this div with template
                productDisplay.innerHTML = template;
                // set name
                productDisplay.querySelector(".product-name-text")
                    .innerHTML = localItem.name;
                // price
                productDisplay.querySelector(".price")
                    .innerHTML = localItem.price;
                // image
                productDisplay.querySelector(".product-item-display-image")
                    .src = localItem.imagePath;
                // set available colours
                panel.appendChild(productDisplay);
            }
        })
}

/**
 * on loading next page
 */
function loadCheckoutPage()
{
    window.location.href = 'checkout-page.html';
}

