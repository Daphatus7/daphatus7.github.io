const basketItems = [
    {
        name: "Zola Flush Light",
        imagePath: "images/flush-image.png",
        price: "300.00",
    },
    {
        name: "Zola Flush Light",
        imagePath: "images/flush-image.png",
        price: "300.00",
    },
];

function displayBasketItems(basketItems) {
    let product_list = document.getElementsByClassName('basket-products')[0];
    fetch('page-components/templates/basket-item-display-template.html')  
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
addEventListener('DOMContentLoaded', () => displayBasketItems(basketItems));