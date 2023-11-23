

const API_URL = "localhost:3306/api/courses"


export function initAddCourse(){
    const token = localStorage.getItem('token');
    if (token === null) {
        alert("You must be logged in to change courses")
        window.router.navigate("#")
        return;
    }
document.querySelector("#addCourse").addEventListener("click", async () => addCourse())
}

async function addCourse(){
    const form = document.querySelector("#carForm")
    const newCourse = {
        type: form.trainingType.value,
        airplane: form.airplaneType.value, //airplanes needs to be fetched from db
        venue: form.venue.value,
        simulatorType: form.simulatorType.value,
        ESEA: form.ESEA.value,
        ATPL: form.ATPL.value,
        price: parseFloat(form.price.value),
        date: form.date.value
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCourse)
    };

    try {
        const response = await fetch(API_URL, options);
        const courseResponse = await response.json();
        console.log('Course added:', courseResponse);
        // Optionally, do something with the response
    } catch (error) {
        console.error('Error adding course:', error);
        // Handle errors, show an error message to the user, etc.
    }
};
