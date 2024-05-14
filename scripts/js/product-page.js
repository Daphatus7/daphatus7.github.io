// add the components that will need on be page
const componentsToLoad = [
    {
        url: 'page-components/navigation-bar.html',
        placeholderId: 'navigation-bar-placeholder'
    },
    {
        url: 'page-components/product-page-product-display.html',
        placeholderId: 'product-page-product-display-placeholder'
    },
    {
        url: 'page-components/product-page-product-information.html',
        placeholderId: 'product-page-product-information-placeholder'
    },
    {
        url: 'page-components/product-panel.html',
        placeholderId: 'product-panel-placeholder'
    },
    {
        url:'page-components/leave-a-review.html ',
        placeholderId: 'leave-a-review-placeholder'
    },
    {
        url: 'page-components/footer.html',
        placeholderId: 'footer-placeholder'
    }
]

// load the components listed above
componentsToLoad.forEach(component => fetchPage(component.url, component.placeholderId));

// fetch the page and insert it into the placeholder
function fetchPage(url, placeholderId) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.getElementById(placeholderId).innerHTML = html;
        })
}
let quantity = 1;

function increaseQuantity() {
    let quantityDisplay = document.getElementById('product-quantity');
    quantity += 1;
    quantityDisplay.innerHTML = quantity;
}

function decreaseQuantity() {
    let quantityDisplay = document.getElementById('product-quantity');
    if (quantity > 1){
        quantity -= 1;
        quantityDisplay.innerHTML = quantity;
    } 
    else
    {
        quantityDisplay.innerHTML = quantity;
    }
}
function changeToGold()
{
    changeColour("Gold", 'images/light-gold-image.jpg');

}
function changeToSilver()
{
    changeColour("Silver", 'images/light-black-image.jpg');

}
function changeToBlack()
{
    changeColour("Black", 'images/light-silver-image.jpg');
}

function changeColour(colour, imageUrl)
{
    let productImage = document.getElementById('product__image');
    productImage.src = imageUrl;
    let currColour = document.getElementById('current-colour-name');
    currColour.innerHTML = "Colour: "+ colour;
}

function addToBasket()
{
    
    document.getElementById('add-to-cart-effect').classList.add('visible');
    document.getElementById('add-to-cart-effect').classList.remove('hide');
    //hide the cart in 2s
    setTimeout(()=>hideAddToCartEffect(), 2000);
    //show the navigation bar
}
function hideAddToCartEffect()
{
    document.getElementById('add-to-cart-effect').classList.add('hide');
    
}