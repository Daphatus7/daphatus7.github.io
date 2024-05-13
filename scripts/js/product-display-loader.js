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

function clickedOn(product, event){
    console.log(product);
}

let product_item;

//load the website components
function displayProducts(products) {
    let product_list = document.getElementsByClassName('product-list-items')[0];
    fetch('page-components/templates/product-item-display-template.html')
        .then(response => response.text())
        .then(template => 
        {
            for(let i = 0; i < products.length; i++)
            {
                let productItem = template.replace('{{product-name}}', products[i].name)
                    .replace('{{product-image}}', products[i].imagePath)
                    .replace('{{product-price}}', products[i].price)
                    .replace('{{product-id}}', i);
                product_list.innerHTML += productItem;
                product_item[i] = productItem;
            }
        })
}

//load the product list
addEventListener('DOMContentLoaded', () => displayProducts(products));
