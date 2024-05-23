/**
 * this JS handles the product list page
* */

/**
 * holds the reference to the panel, to allow clickable buttons
 */
let productDisplays;
/**
 * product inventory
 * @type {[{colour: string[], numberOfStars: number, imagePath: string, price: string, numberOfReviews: number, name: string},{colour: string[], numberOfStars: number, imagePath: string, price: string, numberOfReviews: number, name: string},{colour: string[], numberOfStars: number, imagePath: string, price: string, numberOfReviews: number, name: string},{colour: string[], numberOfStars: number, imagePath: string, price: string, numberOfReviews: number, name: string},{colour: string[], numberOfStars: number, imagePath: string, price: string, numberOfReviews: number, name: string},null,null,null,null,null,null,null]}
 */
const productInventory = [
    {
        name: "Zola Flush Light",
        imagePath: "images/zola-flush-light.png",
        price: "429",
        numberOfStars: 3,
        numberOfReviews: 5,
        colour: ["Gold","Black","Silver"]
    },
    {
        name: "Cassie Table Lamp",
        imagePath: "images/cassie-table-lamp.png",
        price: "173",
        numberOfStars: 3,
        numberOfReviews: 5,
        colour: ["Brown","Grey"]
    },
    {
        name: "Aero Pendant Light",
        imagePath: "images/aero-pendant-light.png",
        price: "170",
        numberOfStars: 4,
        numberOfReviews: 5,
        colour: ["Gold", "Silver"]
    },
    {
        name: "Artemis Spotlight",
        imagePath: "images/artemis-spotlight.png",
        price: "429",
        numberOfStars: 2,
        numberOfReviews: 1,
        colour: ["Gold", "Silver"]
    },
    {
        name: "Bern Pendant Light",
        imagePath: "images/bern-pendant-light.png",
        price: "329",
        numberOfStars: 4,
        numberOfReviews: 5,
        colour: ["Gold", "Silver"]
    },
    {
        name: "Cassie Pendant Light",
        imagePath: "images/cassie-pendant-light.png",
        price: "450",
        numberOfStars: 5,
        numberOfReviews: 23,
        colour: ["Gold", "Silver"]
    },
    {
        name: "Cassie Batten Light",
        imagePath: "images/cassie-batten-light.png",
        price: "320",
        numberOfStars: 1,
        numberOfReviews: 5,
        colour: ["Gold", "Silver"]
    },
    {
        name: "Clovelly Pendant Light",
        imagePath: "images/clovelly-pendant-light.png",
        price: "375",
        numberOfStars: 4,
        numberOfReviews: 5,
        colour: ["Gold", "Silver"]
    },
    {
        name: "Garman Batten Light",
        imagePath: "images/garman-batten-light.png",
        price: "300",
        numberOfStars: 5,
        numberOfReviews: 63,
        colour: ["Gold", "Silver"]
    },
    {
        name: "Hutton Batten Light",
        imagePath: "images/hutton-batten-light.png",
        price: "329",
        numberOfStars: 4,
        numberOfReviews: 5,
        colour: ["Gold", "Silver"]
    },
    {
        name: "Jean Pendant Light",
        imagePath: "images/jean-pendant-light.png",
        price: "217",
        numberOfStars: 4,
        numberOfReviews: 5,
        colour: ["Gold", "Silver"]
    },
    {
        name: "Julia Pendant Light",
        imagePath: "images/julia-pendant-light.png",
        price: "300",
        numberOfStars: 4,
        numberOfReviews: 5,
        colour: ["Gold", "Silver"]
    },

];
const totalPossibleStars = 5;
let basketItems = {};
localStorage.setItem('basketItems', JSON.stringify(basketItems));
addEventListener('DOMContentLoaded', () => loadPage());


/**
 * load the page
 */
function loadPage(){

    //load website components
    loadWebsiteComponents();

    //temp solution: load items to inventory
    localStorage.setItem('productInventory', JSON.stringify(productInventory));
    
    //load website items
    displayProducts(productInventory);
}

/**
 * load components for the website
 */
function loadWebsiteComponents(){
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
}

//define a list of product information


/**
 * clicked on item by item id in the page - > which maps to the name of the item
 * add the selected product to load
 * @param id
 */
function clickedOn(id){
    //load a website based on item clicked on
    //put item pick into product pag
    let productPageItem = productInventory[id];
    localStorage.setItem('selectedProduct', JSON.stringify(productPageItem));
    window.location.href = 'product-page.html';
}

/**
 * clicked on like button
 * @param id
 */
function clickedOnLikeButton(id)
{
    likeButton(productDisplays.children[id]);
}

/**
 * implementation of feedback when clicking on like button
 * @param displayClicked
 */
function likeButton(displayClicked)
{
    let buttonIcon = displayClicked.querySelector(".like-button");
    console.log(buttonIcon.src)
    if (buttonIcon.id === "heart-icon-checked")
    {
        buttonIcon.id = "heart-icon-unchecked";
        buttonIcon.src = "images/heart-icon-unchecked.png";
    } else
    {
        buttonIcon.id = "heart-icon-checked";
        buttonIcon.src = "images/heart-icon-checked.png";
    }
}

/**
 * load the website components
 * @param products load products
 */
function displayProducts(products) {
    productDisplays = document.getElementsByClassName('product-list-items')[0];
    fetch('page-components/templates/product-item-display-template.html')
        .then(response => response.text())
        .then(template => {
            
            //load the product list from the given specs
            for (let i = 0; i < productInventory.length; i++) {
                //create a div
                let productDisplay = document.createElement('div');
                //assign this div with template
                productDisplay.innerHTML = template;
                
                // set name
                productDisplay.querySelector(".product-name-text")
                    .innerHTML = productInventory[i].name;
                // price
                productDisplay.querySelector(".price")
                    .innerHTML = productInventory[i].price;
                // image
                productDisplay.querySelector(".product-item-display-image")
                    .src = productInventory[i].imagePath;
                // set available colours
                for (let j = 0; j < productInventory[i].colour.length; j++)
                {
                    addProductColour(productDisplay.querySelector(".colour-selection"), getColour(productInventory[i].colour[j]));
                }
                productDisplay.id = i;

                // set num of reviews
                addStars(productDisplay.querySelector(".product-rating"), productInventory[i].numberOfStars);
                // add review count
                addNumberOfReviews(productDisplay.querySelector(".product-review-count"), productInventory[i].numberOfReviews);
                
                productDisplay.querySelector(".add-to-cart-button-cross").
                addEventListener('click', (event) => onAddToCardCrossClicked(productDisplay, productDisplay.id));
                productDisplays.appendChild(productDisplay);
                
                productDisplay.querySelector(".like-button").addEventListener('click', 
                    (event) => clickedOnLikeButton(productDisplay.id));
                productDisplay.querySelector(".product-item-display-image").addEventListener('click', (event) => clickedOn(productDisplay.id));
                productDisplays.appendChild(productDisplay);
            }
        }
        )
}

/**
 * convert colour to required format
 * @param colour the colour selected
 * @returns {string} return value
 */
function getColour(colour)
{
    switch (colour)
    {
        case "Gold":
            return "gold";
        case "Black":
            return "black";
        case "Silver":
            return "silver";
        case "Brown":
            return "brown";
        case "Grey":
            return "grey";
        default:
            return "white";
    }
}

/**
 * add colour element to the product display
 * @param ColourGrid web element
 * @param colour colour element
 */
function addProductColour(ColourGrid, colour)
{
    fetch('page-components/templates/colour-circle-template.html')
        .then(response => response.text()
            .then(template => {
                let colourDisplay = document.createElement('div');
                colourDisplay.innerHTML = template;
                colourDisplay.getElementsByClassName("colour-selection-circle")[0].classList.add(colour);
                ColourGrid.appendChild(colourDisplay);
            }
            ))
}

/**
 * add stars upto 5 to the element.
 * @param productRatingElement
 * @param numberOfStarts
 */
function addStars(productRatingElement, numberOfStarts)
{
    //filled stars
    for (let i = 0; i < numberOfStarts; i++)
    {                   
        productRatingElement.innerHTML += '&#9733;';
    }
    //hollow stars
    for (let i = numberOfStarts; i < totalPossibleStars; i++)
    {
        productRatingElement.innerHTML += '&#9734;';
    }
}

/**
 * add reviews
 * @param reviewElement element
 * @param numberOfReviews num
 */
function addNumberOfReviews(reviewElement, numberOfReviews)
{
    reviewElement.innerHTML = `(${numberOfReviews})`;
}


/**
 * add product to basket
 * @param productDisplay
 * @param id
 */
function onAddToCardCrossClicked(productDisplay,id)
{
    //animation
    const cross = productDisplay.querySelector(".add-icon");

    cross.style.opacity = 0;

    setTimeout(() => {
        cross.src = '../../images/checkmark.png';
        cross.style.width = '35px'
        // Bring opacity back to 1
        cross.style.opacity = 1;
    }, 300); // Matches the transition time


    //if the item is already in the basket, increase the quantity
    if(basketItems[productInventory[id].name]) {
        basketItems[productInventory[id].name] += 1;
    } else {
        //if the item is not in the basket, add as new item.
        basketItems[productInventory[id].name] = 1;
    }
    localStorage.setItem('basketItems', JSON.stringify(basketItems));

}