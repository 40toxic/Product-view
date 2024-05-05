document.addEventListener("DOMContentLoaded", function() {
    // Function to extract product ID from URL
    const getProductIdFromUrl = () => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    };

    // Function to fetch product details from API
    const fetchProductDetails = async (productId) => {
        try {
            const response = await fetch(`https://dummyjson.com/products/${productId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    // Function to display product details on the page
    const displayProductDetails = (product) => {
        // Convert price from USD to Ksh
        const priceInKsh = product.price * 100; // Assuming 1 USD = 100 Ksh

        // Check if a discount is applied
        const discountedPriceInKsh = product.discountPercentage ? priceInKsh * (1 - product.discountPercentage / 100) : priceInKsh;

        const productDetailsContainer = document.getElementById("productDetails");
        productDetailsContainer.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <h2>${product.title}</h2>
                </div>
                <div class="card-body">
                    <p>Description: ${product.description}</p>
                    <p>Discount Percentage: ${product.discountPercentage ? product.discountPercentage + '%' : 'No discount'}</p>
                    <p>Rating: ${product.rating}</p>
                    <p>Stock: ${product.stock}</p>
                    <p>Brand: ${product.brand}</p>
                    <p>Price: ${discountedPriceInKsh} Ksh</p> <!-- Display discounted or original price in Ksh -->
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
