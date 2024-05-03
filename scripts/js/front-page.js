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
        url: 'page-components/main-panel.html',
        placeholderId: 'main-panel-placeholder'
    },
    {
        url: 'page-components/feature-panel.html',
        placeholderId: 'feature-panel-placeholder'
    },
    {
        url: 'page-components/secondary-panel.html',
        placeholderId: 'secondary-panel-placeholder'
    },
    {
        url: 'page-components/category-panel.html',
        placeholderId: 'category-panel-placeholder'
    },
    {
        url: 'page-components/tertiary-panel.html',
        placeholderId: 'tertiary-panel-placeholder'
    },
    {
        url: 'page-components/news-panel.html',
        placeholderId: 'news-panel-placeholder'
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