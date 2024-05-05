document.addEventListener("DOMContentLoaded", function() {
    const itemsPerPage = 10;
    let currentPage = 1;
    let products = [];

    const fetchData = async () => {
        try {
            const response = await fetch("https://dummyjson.com/products");
            const data = await response.json();
            // Convert price from USD to Ksh for each product
            products = data.products.map(product => {
                return {
                    ...product,
                    price: product.price * 100 // Convert USD to Ksh
                };
            });
            displayProducts();
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const displayProducts = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const displayedProducts = products.slice(startIndex, endIndex);
        
        let rows = '';
        displayedProducts.forEach(product => {
            const displayPrice = product.discountPercentage ? (product.price * (1 - product.discountPercentage / 100)) : product.price;
            const formattedPrice = displayPrice.toFixed(2);
            rows += `
                <tr>
                    <td>${product.id}</td>
                    <td><a href="product.html?id=${product.id}">${product.title}</a></td>
                    <td>${product.description}</td>
                    <td>${product.discountPercentage ? `${product.discountPercentage}% off` : 'No discount'}</td>
                    <td>${product.rating}</td>
                    <td>${product.stock}</td>
                    <td>${product.brand}</td>
                    <td>${formattedPrice} Ksh</td> <!-- Display price in Ksh -->
                    <td>${product.category}</td>
                    <td><img src="${product.thumbnail}" alt="${product.title}" style="width: 100px;"></td>
                </tr>
            `;
        });
        document.getElementById("tableRows").innerHTML = rows;
    };

    document.getElementById("nextBtn").addEventListener("click", () => {
        if (currentPage < Math.ceil(products.length / itemsPerPage)) {
            currentPage++;
            displayProducts();
        }
    });

    document.getElementById("previousBtn").addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            displayProducts();
        }
    });

    fetchData();
});
