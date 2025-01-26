function filterProductTable() {
    const input = document.getElementById("paymentSearch").value.toLowerCase(); // Get input value
    const table = document.getElementById("bill_details"); // Get table element
    const rows = table.getElementsByTagName("tr"); // Get all table rows

    // Loop through all table rows (skip the first row as it is the header)
    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName("td");
        const name = cells[2].innerText.toLowerCase(); // Name column
        const date = cells[1].innerText.toLowerCase(); // Date column

        // If the input matches the name or date, show the row, otherwise hide it
        if (name.includes(input) || date.includes(input)) {
            rows[i].style.display = ""; // Show row
        } else {
            rows[i].style.display = "none"; // Hide row
        }
    }
}