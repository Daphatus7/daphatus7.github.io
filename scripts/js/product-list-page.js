


//load the website components
fetch('page-components/sales-information.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('sales-banner-placeholder').innerHTML = html;
    })
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