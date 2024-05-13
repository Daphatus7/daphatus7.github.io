


//load the website components
fetch('page-components/navigation-bar.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('navigation-bar-placeholder').innerHTML = html;
    })
fetch('page-components/product-list-intro.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('product-list-intro-placeholder').innerHTML = html;
    })
fetch('page-components/footer.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('footer-placeholder').innerHTML = html;
    })



//define a list of product information
const products = [
    {
        name: "Zola Flush Light",
        imagePath: "images/flush-image.png",
        price: "300",
    },
    {
        name: "Zola Flush Light",
        imagePath: "images/flush-image.png",
        price: "300",
    },
    {
        name: "Zola Flush Light",
        imagePath: "images/flush-image.png",
        price: "300",
        numberOfStars: 4
    },
    {
        name: "Zola Flush Light",
        imagePath: "images/flush-image.png",
        price: "300",
    },
    {
        name: "Zola Flush Light",
        imagePath: "images/flush-image.png",
        price: "300",
    },
    {
        name: "Zola Flush Light",
        imagePath: "images/flush-image.png",
        price: "300",
    },
    {
        name: "Zola Flush Light",
        imagePath: "images/flush-image.png",
        price: "300",
    },
    {
        name: "Zola Flush Light",
        imagePath: "images/flush-image.png",
        price: "300",
    },
    {
        name: "Zola Flush Light",
        imagePath: "images/flush-image.png",
        price: "300",
    },
    {
        name: "Zola Flush Light",
        imagePath: "images/flush-image.png",
        price: "300",
    },

];

//load the website components
function displayProducts(products) {
    let product_list = document.getElementsByClassName('product-list-items')[0];
    fetch('page-components/templates/product-item-display-template.html')
        .then(response => response.text())
        .then(template => {
            products.forEach(product => {
                let productDisplay = document.createElement('div');
                productDisplay.innerHTML = template;
                productDisplay.querySelector(".product-name-text")
                    .innerHTML = product.name;
                productDisplay.querySelector(".price")
                    .innerHTML = product.price;
                productDisplay.querySelector(".product-item-display-image")
                    .src = product.imagePath;
                product_list.appendChild(productDisplay);
            })
        })
}

//load the product list
addEventListener('DOMContentLoaded', () => displayProducts(products));