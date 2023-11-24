

const API_URL = "http://localhost:8080/api/"


/*export function initAddCourse(){
    const token = localStorage.getItem('token');
    if (token === null) {
        alert("You must be logged in to change courses")
        window.router.navigate("#")
        return;
    }
loadPlanes()
document.querySelector("#addCourse").addEventListener("click", async () => addCourse())
}*/

loadPlanes()

async function loadPlanes(){
    console.log("i was called")
    let airplanes = document.querySelector("#airplaneId")
    try {
        const response = await fetch(API_URL + "airplanes");
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const data = await response.json();
        
        
        data.forEach(item => {
          let option = document.createElement('option');
          option.value = item.id;
          option.text = item.airplaneType;
          airplanes.appendChild(option);
        });
      } catch (error) {
        console.error('There was a problem fetching the data:', error);
      }
    };

document.querySelector("#addCourse").addEventListener("click", async () => addCourse())

async function addCourse(){
    const status = document.querySelector("#add-course-status")
    const form = document.querySelector("#courseForm")
    const newCourse = {
        courseDate: form.date.value,
        courseLocation: form.courseLocation.value,
        airplaneId: form.airplaneId.value,
        courseType: form.courseType.value,
        simulatorType: form.simulatorType.value,
        coursePrice: parseFloat(form.price.value),
        isEASAAApproved: form.ESEA.value,
        isATPUnfreezingPossible: form.ATPL.value, // Corrected property access
        
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCourse)
    };

    try {
        const response = await fetch(API_URL + "courses", options);

        if (!response.ok) {
            // Check for specific HTTP status codes that indicate authorization issues
            if (response.status === 401 || response.status === 403) {
                // Handle unauthorized access
                status.textContent = "Unauthorized access. Please log in.";
                // Perform additional actions like redirecting to a login page or showing a modal
            } else {
                // Handle other non-authorization-related HTTP errors
                throw new Error('HTTP error: ' + response.status);
            }
        } else {
            // Proceed with handling successful response
            const courseResponse = await response.json();
            console.log('Course added:', courseResponse);
            status.textContent = "Course added successfully";
            // Optionally, do something with the response
        }
    } catch (error) {
        console.error('Error adding course:', error);
        status.textContent = "Error adding course";
        // Handle other errors, such as network issues, parsing JSON, etc.
    }
};



