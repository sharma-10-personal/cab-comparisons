document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("fareForm");
  const loader = document.getElementById("loader");
  const fareTable = document.getElementById("fareTable");
  const fareTableBody = fareTable.getElementsByTagName("tbody")[0];

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const pickupAddress = document.getElementById("pickup_address").value;
    const dropAddress = document.getElementById("drop_address").value;

    loader.style.display = "block"; // Show loader
    fareTable.style.display = "none"; // Hide table initially

    fetch(
      `http://localhost:3000/v1/get-fares?pickup_address=${encodeURIComponent(
        pickupAddress
      )}&drop_address=${encodeURIComponent(dropAddress)}`
    )
      .then((response) => response.json())
      .then((data) => {
        loader.style.display = "none"; // Hide loader
        fareTable.style.display = "table"; // Show table

        // Clear any existing rows
        fareTableBody.innerHTML = "";

        const services = [
          { name: "ola", img: "ola.png" },
          { name: "uber", img: "uber.png" },
        ];
        const vehicleTypes = ["Auto", "Suv", "Sedan", "Hatchback"];

        services.forEach((service) => {
          let row = fareTableBody.insertRow();
          let cellService = row.insertCell();
          cellService.innerHTML = `<img src="${service.img}" alt="${service.name}" class="service-logo">`;

          vehicleTypes.forEach((type) => {
            let cell = row.insertCell();
            if (data[service.name] && data[service.name][type]) {
              cell.textContent = data[service.name][type].price;
            } else {
              cell.textContent = "-";
            }
          });
        });
      })
      .catch((error) => {
        loader.style.display = "none"; // Hide loader
        console.error("Error fetching data:", error);
      });
  });
});
