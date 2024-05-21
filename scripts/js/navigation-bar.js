/*when open mobile menu*/ 
function showMenu() {
    let navBar = document.getElementById("navigation__bar_mobile");
    let menu = document.getElementById(`mobile--menu-container`);
    let saleBanner = document.getElementById('sale-banner');

    menu.style.display = 'flex';
    menu.offsetHeight;
    menu.style.transform = 'translateX(0%)';

    navBar.style.display = 'none';
    saleBanner.style.display = 'none';
    document.body.style.overflow = 'hidden';

    // // show mobile menu
    // document.getElementById('mobile--menu-container').style.display = 'flex';
    // //hide the navigation bar
    // document.getElementById('navigation__bar_mobile').style.display = 'none';
    // //hide the banner
    // document.getElementById('sale-banner').style.display = 'none';
    // document.body.style.overflow = 'hidden';

}

/*when close mobile menu*/
function hideMenu() {
    let menu =document.getElementById('mobile--menu-container')
    let navBar = document.getElementById('navigation__bar_mobile')
    let saleBanner = document.getElementById('sale-banner');

    // animation
    menu.style.transform = 'translateX(-100%)';

    //only hid after animation finished
    menu.addEventListener('transitionend', function() {
        // Hide the menu after it slides out
        menu.style.display = 'none';

        // Show the navigation bar and banner
        navBar.style.display = 'flex';
        saleBanner.style.display = 'flex';

        // Allow body scrolling again
        document.body.style.overflow = 'visible';
    }, { once: true });
}
function loadSearch(){
    let searchBar = document.getElementById('navigation__bar__overlay')
    searchBar.style.display = 'block'
    requestAnimationFrame(() => {
        searchBar.style.transform = 'translateY(-20%)'; // Then move it into view
    });
}
function closeSearch(){
    let searchBar = document.getElementById('navigation__bar__overlay')
    searchBar.style.transform = 'translateY(-150%)';
    searchBar.addEventListener('transitionend', function() {
        searchBar.style.display = 'none';
    }, { once: true });

}

function loadBasketPage()
{
    window.location.href = 'basket-page.html';
}

function loadHomePage()
{
    window.location.href = 'index.html';
}


function openDropmenu(){
    let dropdownBackgrounds = document.getElementById('drop-background');
    dropdownBackgrounds.style.display = 'block';
}

function closeDropmenu(){
    let dropdownBackgrounds = document.getElementById('drop-background');
    dropdownBackgrounds.style.display = 'none';
}

function loadSearchPage(){
    window.location.href = 'search-result-page.html';
}

function loadNewCollections()
{
    window.location.href = 'product-list-page.html';
}

// document.querySelectorAll('.nav-category').forEach(item => {
//     item.addEventListener('mouseenter', () => {
//         document.getElementById('dropdown-background').style.display = 'block';
//     });
//     item.addEventListener('mouseleave', () => {
//         document.getElementById('dropdown-background').style.display = 'none';
//     });
// });