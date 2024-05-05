document.addEventListener("DOMContentLoaded", function() {
    // Function to fetch product details from API
    const fetchProductDetails = async (productId) => {
        try {
            const response = await fetch(`https://dummyjson.com/products/${productId}`);
            const data = await response.json();
            // Convert price from USD to Ksh
            data.priceInKsh = data.price * 100;
            return data;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    // Function to display product details on the page
    const displayProductDetails = (product) => {
        const productDetailsContainer = document.getElementById("productDetails");
        productDetailsContainer.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <h2>${product.title}</h2>
                </div>
                <div class="card-body">
                    <p>Description: ${product.description}</p>
                    <p>Price: ${product.priceInKsh} Ksh</p>
                    <p>Discount Percentage: ${product.discountPercentage}</p>
                    <p>Rating: ${product.rating}</p>
                    <p>Stock: ${product.stock}</p>
                    <p>Brand: ${product.brand}</p>
                    <p>Category: ${product.category}</p>
                    <img src="${product.thumbnail}" alt="${product.title}" style="width: 200px;">
                </div>
            </div>
        `;
    };

    // Fetch product ID from URL and fetch product details
    const productId = getProductIdFromUrl();
    if (productId) {
        fetchProductDetails(productId)
            .then(product => {
                if (product) {
                    displayProductDetails(product);
                } else {
                    // Handle case where product is not found
                    console.error('Product not found');
                }
            })
            .catch(error => {
                console.error('There was a problem with fetching product details:', error);
            });
    } else {
        console.error('Product ID not found in URL');
    }
});
