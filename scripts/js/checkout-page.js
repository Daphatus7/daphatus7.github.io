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

//load the components listed above
componentsToLoad.forEach(component => fetchPage(component.url, component.placeholderId));

//fetch the page and insert it into the placeholder
function fetchPage(url, placeholderId) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.getElementById(placeholderId).innerHTML = html;
        })
}



function loadBasketItem(items) {
    product_list = document.getElementsByClassName('basket-products')[0];
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
                productDisplay.querySelector(".quantity-icon-plus").addEventListener('click', () => increaseQuantity(productDisplay.id));
                productDisplay.querySelector(".quantity-icon-minus").addEventListener('click', () => decreaseQuantity(productDisplay.id));

                product_list.appendChild(productDisplay);
            }
        });
}