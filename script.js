const grid_product = document.querySelector(".grid_product");
var allData;
let loading = false;

async function getData() {
    loading = true;
    // Display loading spinner
    grid_product.innerHTML = '<div id="loader"></div>';
    
    const data = await fetch("https://dummyjson.com/products");
    const dataRef = await data.json();
    allData = dataRef.products;
    loading = false;
    showDisplay(allData); // Once data is fetched, display it
}

function showDisplay(data) {
    // Clear the grid_product before displaying new data
    grid_product.innerHTML = "";

    // Create a parent element to hold all the card elements
    const container = document.createElement('div');
    // Map through the data and create card elements
    data.forEach(value => {
        const { rating, brand, category, thumbnail, description } = value;
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML += `
            <img src="${thumbnail}" alt="">
            <h1>${brand}</h1>
            <h1>${category}</h1>
            <h2>${rating}</h2>
            <h2>${description}</h2>
        `;
        container.appendChild(card); // Append each card to the container
    });

    // Append the container to the grid_product
    grid_product.appendChild(container);
}

const inputvalue = document.getElementById("inputvalue");

// Add event listener to input element for onchange event
inputvalue.addEventListener('input', submitFun);

function submitFun() {
    const searchTerm = inputvalue.value.toLowerCase();
    const filteredData = allData.filter(value => {
        const { brand, category, description } = value;
        return brand.toLowerCase().includes(searchTerm) ||
            category.toLowerCase().includes(searchTerm) ||
            description.toLowerCase().includes(searchTerm);
    });
    showDisplay(filteredData);
}

// Call getData function only once
getData();
