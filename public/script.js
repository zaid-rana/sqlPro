
const apiBaseURL = 'http://localhost:3000/api/v1/passengers';

// Fetch all passengers and display in a alert
async function fetchPassengers() {
    try {
        const response = await fetch(`${apiBaseURL}/list`);
        const result = await response.json();

        if (result.sucess) {
            const passengerData = result.data; // Extract the data array
            console.log(passengerData); // Still log to console for debugging

            // Find the table body element
            const passengerTableBody = document.getElementById('passenger-list');
            
            // Clear any existing data in the table
            passengerTableBody.innerHTML = '';

            // Populate the table with passenger data
            passengerData.forEach((passenger) => {
                // Create a new row for each passenger
                const row = document.createElement('tr');

                // Add columns (cells) to the row
                row.innerHTML = `
                    <td>${passenger.passengerID}</td>
                    <td>${passenger.PassName}</td>
                    <td>${passenger.PickupLOC}</td>
                    <td>${passenger.destination}</td>
                `;

                // Append the row to the table body
                passengerTableBody.appendChild(row);
            });

            alert('Passenger List Fetched and Displayed.');
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error fetching passengers:', error);
    }
}



// Create a new passenger
async function createPassenger(event) {
    event.preventDefault();
    const passengerID = document.getElementById('create-passengerID').value;
    const PassName = document.getElementById('create-PassName').value;
    const PickupLOC = document.getElementById('create-PickupLOC').value;
    const destination = document.getElementById('create-destination').value;

    try {
        const response = await fetch(`${apiBaseURL}/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ passengerID, PassName, PickupLOC, destination }),
        });
        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error('Error creating passenger:', error);
    }
}

// Update a passenger
async function updatePassenger(event) {
    event.preventDefault();
    const passengerID = document.getElementById('update-passengerID').value;
    const PassName = document.getElementById('update-PassName').value;
    const PickupLOC = document.getElementById('update-PickupLOC').value;
    const destination = document.getElementById('update-destination').value;

    try {
        const response = await fetch(`${apiBaseURL}/update/${passengerID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ passengerID, PassName, PickupLOC, destination }),
        });
        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error('Error updating passenger:', error);
    }
}

// Delete a passenger
async function deletePassenger(event) {
    event.preventDefault();
    const passengerID = document.getElementById('delete-passengerID').value;

    try {
        const response = await fetch(`${apiBaseURL}/delete/${passengerID}`, {
            method: 'DELETE',
        });
        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error('Error deleting passenger:', error);
    }
}


document.getElementById('create-form').addEventListener('submit', createPassenger);
document.getElementById('update-form').addEventListener('submit', updatePassenger);
document.getElementById('delete-form').addEventListener('submit', deletePassenger);
document.getElementById('view-form').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission default behavior
    fetchPassengers();
});


console.log("hello")