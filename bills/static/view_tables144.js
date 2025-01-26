function filterTable() {
    const input = document.getElementById("nameSearch"); // Get the input field
    const filter = input.value.toLowerCase(); // Convert the input to lowercase for case-insensitive matching
    const table = document.getElementById("customers"); // Get the table
    const rows = table.getElementsByTagName("tr"); // Get all rows in the table

    // Loop through the rows (skip the first row, which is the header)
    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName("td"); // Get all cells in the current row
        if (cells.length > 0) {
            const name = cells[0].textContent || cells[0].innerText; // Get the name in the first column

            // If the name matches the input, show the row, otherwise hide it
            if (name.toLowerCase().indexOf(filter) > -1) {
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";
            }
        }
    }
}

function filterProductTable() {
    const input = document.getElementById("productNameSearch"); // Get the input field
    const filter = input.value.toLowerCase(); // Convert the input to lowercase for case-insensitive matching
    const table = document.getElementById("products"); // Get the table
    const rows = table.getElementsByTagName("tr"); // Get all rows in the table

    // Loop through the rows (skip the first row, which is the header)
    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName("td"); // Get all cells in the current row
        if (cells.length > 0) {
            const name = cells[0].textContent || cells[0].innerText; // Get the name in the first column

            // If the name matches the input, show the row, otherwise hide it
            if (name.toLowerCase().indexOf(filter) > -1) {
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";
            }
        }
    }
}

function showcustomerdatabase() {
    if (document.getElementById("showproductdatabase").style.display == "none") {
        document.getElementById("bregisterproduct").style.display = "none";
        document.getElementById("bdeleteproduct").style.display = "none";
        document.getElementById("pdatabaseheading").style.display = "none";
        document.getElementById("showproductdatabase").style.display = "block";
        document.getElementById("bcreatecustomer").style.marginLeft = "20%";
        document.getElementById("bcreatecustomer").style.marginRight = "10%";
        document.getElementById("bdeletecustomer").style.marginLeft = "20%";
        document.getElementById("bdeletecustomer").style.marginRight = "10%";
    }
    if (document.getElementById("productdatabase").style.display == "block") {
        document.getElementById("productdatabase").style.display = "none";
        document.getElementById("deleteproduct").style.display = "none";
        document.getElementById("registerproduct").style.display = "none";
    }
    document.getElementById("showproductdatabase").style.marginLeft = "43%";
    document.getElementById("showcustomerdatabase").style.display = "none";
    document.getElementById("cdatabaseheading").style.display = "block";
    document.getElementById("customerdatabase").style.display = "block";
    document.getElementById("bcreatecustomer").style.display = "inline";
    document.getElementById("bdeletecustomer").style.display = "inline";
}

function showproductdatabase() {
    if (document.getElementById("showcustomerdatabase").style.display == "none") {
        document.getElementById("bcreatecustomer").style.display = "none";
        document.getElementById("bdeletecustomer").style.display = "none";
        document.getElementById("cdatabaseheading").style.display = "none";
        document.getElementById("showcustomerdatabase").style.display = "block";
        document.getElementById("bregisterproduct").style.marginLeft = "20%";
        document.getElementById("bregisterproduct").style.marginRight = "10%";
        document.getElementById("bdeleteproduct").style.marginLeft = "20%";
        document.getElementById("bdeleteproduct").style.marginRight = "10%";

    }
    if (document.getElementById("customerdatabase").style.display == "block") {
        document.getElementById("customerdatabase").style.display = "none";
        document.getElementById("deletecustomer").style.display = "none";
        document.getElementById("registercustomer").style.display = "none";
    }
    document.getElementById("showcustomerdatabase").style.marginLeft = "43%";
    document.getElementById("showproductdatabase").style.display = "none";
    document.getElementById("pdatabaseheading").style.display = "block";
    document.getElementById("productdatabase").style.display = "block";
    document.getElementById("bregisterproduct").style.display = "inline";
    document.getElementById("bdeleteproduct").style.display = "inline";
}

function createcustomer() {
    if (document.getElementById("bdeletecustomer").style.display == "none") {
        document.getElementById("bdeletecustomer").style.display = "inline";
        document.getElementById("deletecustomer").style.display = "none";
    }
    document.getElementById("bcreatecustomer").style.display = "none";
    document.getElementById("bdeletecustomer").style.marginLeft = "44%";
    document.getElementById("registercustomer").style.display = "block";

}

function deletecustomer() {
    if (document.getElementById("bcreatecustomer").style.display == "none") {
        document.getElementById("bcreatecustomer").style.display = "inline";
        document.getElementById("registercustomer").style.display = "none";
    }
    document.getElementById("bdeletecustomer").style.display = "none";
    document.getElementById("bcreatecustomer").style.marginLeft = "44%";
    document.getElementById("deletecustomer").style.display = "block";

}

function registerproduct() {
    if (document.getElementById("bdeleteproduct").style.display == "none") {
        document.getElementById("bdeleteproduct").style.display = "inline";
        document.getElementById("deleteproduct").style.display = "none";
    }
    document.getElementById("bregisterproduct").style.display = "none";
    document.getElementById("bdeleteproduct").style.marginLeft = "44%";
    document.getElementById("registerproduct").style.display = "block";

}

function deleteproduct() {
    if (document.getElementById("bregisterproduct").style.display == "none") {
        document.getElementById("bregisterproduct").style.display = "inline";
        document.getElementById("registerproduct").style.display = "none";
    }
    document.getElementById("bdeleteproduct").style.display = "none";
    document.getElementById("bregisterproduct").style.marginLeft = "44%";
    document.getElementById("deleteproduct").style.display = "block";

}