
// the load the components of the website
//list components that will need for the webpage
const componentsToLoad = [
    {
        url: '../page-components/navigation-bar.html',
        placeholderId: 'navigation-bar-placeholder'
    },
    {
        url: '../page-components/main-panel.html',
        placeholderId: 'main-panel-placeholder'
    },
    {
        url: '../page-components/feature-panel.html',
        placeholderId: 'feature-panel-placeholder'
    },
    {
        url: '../page-components/secondary-panel.html',
        placeholderId: 'secondary-panel-placeholder'
    },
    {
        url: '../page-components/category-panel.html',
        placeholderId: 'category-panel-placeholder'
    },
    {
        url: '../page-components/tertiary-panel.html',
        placeholderId: 'tertiary-panel-placeholder'
    },
    {
        url: '../page-components/news-panel.html',
        placeholderId: 'news-panel-placeholder'
    },
    {
        url: '../page-components/footer.html',
        placeholderId: 'footer-placeholder'
    }
]

//load the components listed above
componentsToLoad.forEach(component => fetchPage(component.url, component.placeholderId));

//fetch the page and insert it into the placeholder
function fetchPage(url, placeholderId) 
{
    fetch(url)
        .then(response => response.text())
        .then(html => 
        {
            document.getElementById(placeholderId).innerHTML = html;
        })
}

function loadNewCollections()
{
    window.location.href = 'product-list-page.html';
}

