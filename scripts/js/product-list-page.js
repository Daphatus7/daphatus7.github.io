


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

let productDisplays;

function clickedOn(id){
    // console.log(productDisplays.children[id].querySelector(".product-name-text").innerHTML + " was clicked");
}
function clickedOnLikeButton(id)
{
    likeButton(productDisplays.children[id]);
}

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
//load the website components
function displayProducts(products) {
    productDisplays = document.getElementsByClassName('product-list-items')[0];
    fetch('page-components/templates/product-item-display-template.html')
        .then(response => response.text())
        .then(template => {

            //load the product list from the given specs
            for (let i = 0; i < products.length; i++) {
                //create a div
                let productDisplay = document.createElement('div');
                //assign this div with template
                productDisplay.innerHTML = template;
                
                // set name
                productDisplay.querySelector(".product-name-text")
                    .innerHTML = products[i].name;
                // price
                productDisplay.querySelector(".price")
                    .innerHTML = products[i].price;
                // image
                productDisplay.querySelector(".product-item-display-image")
                    .src = products[i].imagePath;
                // set available colours
                for (let j = 0; j < products[i].colour.length; j++)
                {
                    addProductColour(productDisplay.querySelector(".colour-selection"), getColour(products[i].colour[j]));
                }
                // set num of reviews
                addStars(productDisplay.querySelector(".product-rating"), products[i].numberOfStars);
                // add review count
                addNumberOfReviews(productDisplay.querySelector(".product-review-count"), products[i].numberOfReviews);

                productDisplay.id = i;
                productDisplay.querySelector(".like-button").addEventListener('click', 
                    (event) => clickedOnLikeButton(productDisplay.id));
                productDisplay.addEventListener('click', (event) => clickedOn(productDisplay.id));
                productDisplays.appendChild(productDisplay);
            }
        }
        )
}

//convert colour to required format
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
// add colour element to the product display
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

const totalPossibleStars = 5;
function addStars(productRatingElement, numberOfStarts)
{
    for (let i = 0; i < numberOfStarts; i++)
    {                   
        productRatingElement.innerHTML += '&#9733;';
    }
    for (let i = numberOfStarts; i < totalPossibleStars; i++)
    {
        productRatingElement.innerHTML += '&#9734;';
    }
}
function addNumberOfReviews(reviewElement, numberOfReviews)
{
    reviewElement.innerHTML = `(${numberOfReviews})`;
}
//load the product list
addEventListener('DOMContentLoaded', () => displayProducts(products));