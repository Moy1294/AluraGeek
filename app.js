document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const productName = document.getElementById('product-name').value;
    const productPrice = document.getElementById('product-price').value;
    const productImage = document.getElementById('product-image').value;

    await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: productName,
            price: productPrice,
            image: productImage
        })
    });

    loadProducts();  // Refresh the list
    event.target.reset();  // Reset form fields
});

document.getElementById('clear-form').addEventListener('click', () => {
    document.querySelector('form').reset();
});

async function loadProducts() {
    const response = await fetch('http://localhost:3000/products');
    const products = await response.json();
    const container = document.querySelector('.products-container');
    container.innerHTML = '';  // Clear existing products
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `<h3>${product.name}</h3>
                          <p>$${product.price}</p>
                          <img src="${product.image}" alt="${product.name}" style="width:100%;">
                          <button onclick="deleteProduct(${product.id})">Eliminar</button>`;
        container.appendChild(card);
    });
}

async function deleteProduct(id) {
    await fetch(`http://localhost:3000/products/${id}`, {
        method: 'DELETE'
    });
    loadProducts();  // Refresh the list
}

// Load products on initial load
loadProducts();
