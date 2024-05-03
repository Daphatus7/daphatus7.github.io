fetch('page-components/order-summary-items.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('checkout-order-items-placeholder').innerHTML = html;
    })
