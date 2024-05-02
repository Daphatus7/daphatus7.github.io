fetch('sales-information.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('sales-information-placeholder').innerHTML = html;
    })
fetch('navigation-bar.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('navigation-bar-placeholder').innerHTML = html;
    })
fetch('main-panel.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('main-panel-placeholder').innerHTML = html;
    })
fetch('feature-panel.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('feature-panel-placeholder').innerHTML = html;
    })
fetch('secondary-panel.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('secondary-panel-placeholder').innerHTML = html;
    })
fetch('category-panel.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('category-panel-placeholder').innerHTML = html;
    })
fetch('tertiary-panel.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('tertiary-panel-placeholder').innerHTML = html;
    })
fetch('news-panel.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('news-panel-placeholder').innerHTML = html;
    })
fetch('footer.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('footer-placeholder').innerHTML = html;
    })