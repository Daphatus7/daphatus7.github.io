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
        url: 'page-components/order-confirmation-panel.html',
        placeholderId: 'order-confirmation-page-placeholder'
    },
    {
        url: 'page-components/checkout-order-summary.html',
        placeholderId: 'order-summary-placeholder'
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