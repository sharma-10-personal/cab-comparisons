// document.getElementById('locationForm').addEventListener('submit', function(event) {
//     event.preventDefault();
    
//     const pickupLocation = document.getElementById('pickup').value;
//     const dropLocation = document.getElementById('drop').value;

//     const data = {
//         pickup: pickupLocation,
//         drop: dropLocation
//     };

//     fetch('http://localhost:3000/', {
//         method: 'GET', // Assuming you're making a POST request
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     })
//     .then(response => response.json())
//     .then(result => {
//         document.getElementById('result').innerText = `Response from API:\n${JSON.stringify(result, null, 2)}`;
//     })
//     .catch(error => {
//         document.getElementById('result').innerText = `Error: ${error.message}`;
//     });

//     document.getElementById('result').innerText = `Pick-up Location: ${pickupLocation}\nDrop Location: ${dropLocation}`;
// });
    


var x =7;

function  getName() {
    console.log('Namaste JavaScript');
    newName();
    function newName() {
        console.log('inside 2')
    }
}

getName();
