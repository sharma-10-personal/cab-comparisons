document.getElementById('locationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const pickupAddress = document.getElementById('pickup').value;
    const dropAddress = document.getElementById('drop').value;

    const url = 'http://localhost:3000/v1/get-fares';
    const params = `pickup_address=${encodeURIComponent(pickupAddress)}&drop_address=${encodeURIComponent(dropAddress)}`;

    fetch(`${url}?${params}`)
        .then(response => response.json())
        .then(data => {
            console.log('Response from backend:', data);
            displayFares(data); // Call function to display fares in table
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // Handle error
        });
});

function displayFares(data) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = ''; // Clear existing table rows

    // Iterate over Ola data
    for (const category in data.ola) {
        const row = document.createElement('tr');

        const serviceCell = document.createElement('td');
        serviceCell.textContent = 'Ola';
        row.appendChild(serviceCell);

        const categoryCell = document.createElement('td');
        categoryCell.textContent = category;
        row.appendChild(categoryCell);

        const priceCell = document.createElement('td');
        priceCell.textContent = data.ola[category].price;
        row.appendChild(priceCell);

        tableBody.appendChild(row);
    }

    // Iterate over Uber data
    for (const service in data.uber) {
        const row = document.createElement('tr');

        const serviceCell = document.createElement('td');
        serviceCell.textContent = 'Uber';
        row.appendChild(serviceCell);

        const categoryCell = document.createElement('td');
        categoryCell.textContent = service;
        row.appendChild(categoryCell);

        const priceCell = document.createElement('td');
        priceCell.textContent = data.uber[service].price;
        row.appendChild(priceCell);

        tableBody.appendChild(row);
    }
}
