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

fetch('footer.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('footer-placeholder').innerHTML = html;
    })