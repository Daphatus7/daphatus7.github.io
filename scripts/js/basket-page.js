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