console.log(localStorage.getItem('basketItems'));

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

addEventListener('DOMContentLoaded', () => loadPage());

function loadPage()
{
    //load Page Elements
    componentsToLoad.forEach(component => fetchPage(component.url, component.placeholderId));
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
    const basketItemString = localStorage.getItem('basketItems');
    // Convert the JSON string back to a tuple list (or an empty list if null)
    const localBasketItem = basketItemString ? JSON.parse(basketItemString) : [];
    console.log(localBasketItem);
}

//load the website components
function loadBasketItem(basketItems) {
    let product_list = document.getElementsByClassName('basket-products')[0];
    fetch('../page-components/templates/basket-item-display-template.html')
        .then(response => response.text())
        .then(template => {
            basketItems.forEach(basketItem => {
                let productDisplay = document.createElement('div');
                productDisplay.innerHTML = template
                productDisplay.querySelector(".product-name-text")
                    .innerHTML = basketItem.name;
                productDisplay.querySelector(".product__price")
                    .innerHTML = basketItem.price;
                productDisplay.querySelector(".basket-image")
                    .src = basketItem.imagePath;
                product_list.appendChild(productDisplay);
            })
        })
}