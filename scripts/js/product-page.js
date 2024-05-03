const componentsToLoad = [
    {
        url: 'page-components/sales-information.html',
        placeholderId: 'sales-information-placeholder'
    },
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
        url: 'page-components/footer.html',
        placeholderId: 'footer-placeholder'
    }
]

componentsToLoad.forEach(component => fetchPage(component.url, component.placeholderId));

function fetchPage(url, placeholderId) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.getElementById(placeholderId).innerHTML = html;
        })
}