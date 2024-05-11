/*when open mobile menu*/ 
function showMenu() {
    // show mobile menu
    document.getElementById('mobile--menu-container').style.display = 'flex';
    //hide the navigation bar
    document.getElementById('navigation__bar_mobile').style.display = 'none';
    //hide the banner
    document.getElementById('sale-banner').style.display = 'none';
    document.body.style.overflow = 'hidden';

}

/*when close mobile menu*/
function hideMenu() {
    // hide mobile menu
    document.getElementById('mobile--menu-container').style.display = 'none';
    //show the navigation bar
    document.getElementById('navigation__bar_mobile').style.display = 'flex';
    //show the display banner
    document.getElementById('sale-banner').style.display = 'flex';
}

function loadProductPage()
{
    window.location.href = 'basket-page.html';
}

function loadHomePage()
{
    window.location.href = 'index.html';
}