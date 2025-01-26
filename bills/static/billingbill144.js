let billNumber = 1; // Initial bill number
let rowIndex = 1; // To keep track of serial numbers in the table


// Function to load the next bill number from localStorage
function loadBillNumber() {
    let billNumber = localStorage.getItem("billNumber");
    if (!billNumber) {
        // If no bill number exists, start from 1
        billNumber = 1;
        localStorage.setItem("billNumber", billNumber);
    }
    document.getElementById("bill-number").value = billNumber;
}

// Function to increment the bill number and save to localStorage
function incrementBillNumber() {
    let billNumber = parseInt(localStorage.getItem("billNumber")) || 1;
    billNumber++;
    localStorage.setItem("billNumber", billNumber);
}

// Function to auto-update bill number and date
window.onload = function() {
    loadBillNumber();
    document.getElementById("bill-date").value = new Date().toISOString().split("T")[0];
};


// Add row functionality with autocomplete
function addRow() {
    const table = document.getElementById("items-table").getElementsByTagName('tbody')[0];
    const row = table.insertRow();
    row.innerHTML = `
    <td>${rowIndex++}</td>
    <td><input type="text" name="product_name" placeholder="Product Name"></td>
    <td><input type="number" name="quantity" placeholder="Quantity" min="1" value="1" oninput="updateAmount(this)"></td>
    <td><input type="text" name="unit" placeholder="Unit" readonly></td>
    <td><input type="number" name="rate" placeholder="Rate" oninput="updateAmount(this)"></td>
    <td><input type="number" name="discount" placeholder="Discount %" min="0" max="100" oninput="updateAmount(this)"></td>
    <td><input type="number" name="discount_additional" placeholder="Additional Discount %" min="0" max="100"  oninput="updateAmount(this)"></td>
    <td><input type="number" name="amount" placeholder="Amount" readonly></td>
`;

    // Enable autocomplete for the new product name field
    const productNameField = row.querySelector('input[name="product_name"]');
    enableProductAutocomplete(productNameField);
}

// Enable autocomplete for existing rows (if any)
document.querySelectorAll('input[name="product_name"]').forEach(enableProductAutocomplete);



// Function to update the amount dynamically
function updateAmount(input) {
    const row = input.parentElement.parentElement;
    const quantity = parseFloat(row.querySelector('input[name="quantity"]').value) || 0;
    const rate = parseFloat(row.querySelector('input[name="rate"]').value) || 0;
    const discountPercent = parseFloat(row.querySelector('input[name="discount"]').value) || 0;
    const discountAdditional = parseFloat(row.querySelector('input[name="discount_additional"]').value) || 0;
    const unit = row.querySelector('input[name="unit"]').value.trim().toLowerCase();
    // Calculate amount before discount
    let amount = quantity * rate;

    // If the unit is "dezon", multiply the amount by 12
    if (unit == "dozen") {
        amount *= 12;
    }
    // Apply discounts
    const discount = discountPercent + discountAdditional;
    amount -= (amount * discount) / 100;

    // Update the amount field
    row.querySelector('input[name="amount"]').value = amount.toFixed(2);

    // Update total amount
    updateTotalAmount();
}

// Function to update the total amount
function updateTotalAmount() {
    const amounts = document.querySelectorAll('input[name="amount"]');
    let total = 0;
    amounts.forEach(amount => {
        total += parseFloat(amount.value) || 0;
    });
    document.getElementById("total-amount").value = total.toFixed(2);
}

function printBill() {
    // Validate input fields
    const name = document.querySelector('input[placeholder="Enter Name"]').value.trim();
    const email = document.querySelector('input[placeholder="Enter Email"]').value.trim();
    const phone = document.querySelector('input[placeholder="Enter Mobile"]').value.trim();
    const address = document.querySelector('input[placeholder="Enter Address"]').value.trim();
    const total_amount = parseFloat(document.getElementById("total-amount").value) || 0;
    if (total_amount <= 0) {
        return;
    }
    if (name || email || phone || address) {
        incrementBillNumber();
        saveBill();
        setTimeout(() => window.print(), 1000); // Allow time for save before printing
    }

}


function saveBill() {
    const billData = {
        bill_number: document.getElementById("bill-number").value,
        date: document.getElementById("bill-date").value,
        name: document.querySelector('input[placeholder="Enter Name"]').value,
        address: document.querySelector('input[placeholder="Enter Address"]').value,
        email: document.querySelector('input[placeholder="Enter Email"]').value,
        mobile: document.querySelector('input[placeholder="Enter Mobile"]').value,
        total_amount: document.getElementById("total-amount").value
    };

    // Send to backend
    fetch('/bills/save_bill/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(billData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

const usernames = Array.from(document.querySelectorAll(".username")).map(cell => cell.textContent.trim());
const address = Array.from(document.querySelectorAll(".username")).map(cell =>
    cell.parentElement.querySelector("td:nth-child(3)").textContent.trim());
const phoneNumbers = Array.from(document.querySelectorAll(".username")).map(cell =>
    cell.parentElement.querySelector("td:nth-child(4)").textContent.trim());
const email = Array.from(document.querySelectorAll(".username")).map(cell =>
    cell.parentElement.querySelector("td:nth-child(5)").textContent.trim());

const nameInput = document.getElementById('nameInput');
const mobileInput = document.getElementById('mobileInput'); // Mobile field input
const addressInput = document.getElementById('addressInput');
const emailInput = document.getElementById('emailInput');

// Autocomplete dropdown
const suggestionList = document.createElement('ul');
suggestionList.classList.add('suggestions');
nameInput.parentNode.appendChild(suggestionList);

// Show suggestions
nameInput.addEventListener('input', () => {
    const query = nameInput.value.toLowerCase();
    suggestionList.innerHTML = '';

    if (query) {
        const filteredNames = usernames.filter(name => name.toLowerCase().startsWith(query));
        filteredNames.forEach((name, index) => {
            const suggestionItem = document.createElement('li');
            suggestionItem.textContent = name;

            // Event listener for selecting a suggestion
            suggestionItem.addEventListener('click', () => {
                nameInput.value = name;
                const Index = usernames.indexOf(name);
                if (Index !== -1) {
                    mobileInput.value = phoneNumbers[Index];
                    addressInput.value = address[Index];
                    emailInput.value = email[Index];
                }
                suggestionList.innerHTML = '';
            });

            suggestionList.appendChild(suggestionItem);
        });
    }
});

// Close suggestions when clicking outside
document.addEventListener('click', (event) => {
    if (!nameInput.contains(event.target)) {
        suggestionList.innerHTML = '';
    }
});



// Extract product details from the database table
const productNames = Array.from(document.querySelectorAll("table.d tbody tr")).map(row => ({
    name: row.cells[1].textContent.trim(),
    price: row.cells[2].textContent.trim(),
    discount: row.cells[3].textContent.trim(),
    unit: row.cells[4].textContent.trim(),
}));

// Function to add suggestions for product names and populate related fields
function enableProductAutocomplete(inputField) {
    // Autocomplete dropdown for product names
    const productSuggestionList = document.createElement('ul');
    productSuggestionList.classList.add('suggestions');
    inputField.parentNode.appendChild(productSuggestionList);

    // Show suggestions when typing
    inputField.addEventListener('input', () => {
        const query = inputField.value.toLowerCase();
        productSuggestionList.innerHTML = '';

        if (query) {
            const filteredProducts = productNames.filter(product => product.name.toLowerCase().startsWith(query));
            filteredProducts.forEach(product => {
                const suggestionItem = document.createElement('li');
                suggestionItem.textContent = product.name;

                // Event listener for selecting a suggestion
                suggestionItem.addEventListener('click', () => {
                    inputField.value = product.name;
                    const row = inputField.parentElement.parentElement;

                    // Populate the rate, discount, and unit fields
                    row.querySelector('input[name="rate"]').value = product.price;
                    row.querySelector('input[name="discount"]').value = product.discount;
                    row.querySelector('input[name="unit"]').value = product.unit;

                    // Update the amount
                    updateAmount(row.querySelector('input[name="rate"]'));

                    // Clear suggestions
                    productSuggestionList.innerHTML = '';
                });

                productSuggestionList.appendChild(suggestionItem);
            });
        }
    });

    // Close suggestions when clicking outside
    document.addEventListener('click', (event) => {
        if (!inputField.contains(event.target)) {
            productSuggestionList.innerHTML = '';
        }
    });
}