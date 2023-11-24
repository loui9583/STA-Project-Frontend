document.addEventListener('DOMContentLoaded', function () {
    const courseIdInput = document.getElementById('courseId');
    const fetchbtn = document.getElementById('fetchbtn');
    const editbtn = document.getElementById('editbtn');
    const editStatus = document.getElementById('editStatus');

    fetchbtn.addEventListener('click', async function (event) {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/courses/' + courseIdInput.value);
            const data = await response.json();

            document.getElementById('courseDate').value = data.courseDate;
            document.getElementById('courseLocation').value = data.courseLocation;
            document.getElementById('courseType').value = data.courseType;
            document.getElementById('airplaneId').value = data.airplaneId;
            document.getElementById('simulatorType').value = data.simulatorType;
            document.getElementById('coursePrice').value = data.coursePrice;
            document.getElementById('easaApproved').checked = data.easaApproved;
            document.getElementById('atplUnfreezing').checked = data.atplUnfreezing;

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    });

    editbtn.addEventListener('click', async function (event) {
        event.preventDefault();
        editStatus.textContent = '';

        const requestBody = {
            courseDate: document.getElementById('courseDate').value,
            courseLocation: document.getElementById('courseLocation').value,
            courseType: document.getElementById('courseType').value,
            airplaneId: document.getElementById('airplaneId').value,
            simulatorType: document.getElementById('simulatorType').value,
            coursePrice: document.getElementById('coursePrice').value,
            easaApproved: document.getElementById('easaApproved').checked,
            atplUnfreezing: document.getElementById('atplUnfreezing').checked
        };

        try {
            const response = await fetch('http://localhost:8080/api/courses/edit/' + courseIdInput.value, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            const responseData = await response.text();
            console.log('Response data:', responseData);

            editStatus.textContent = 'Edit complete';

        } catch (error) {
            console.error('Error editing course:', error);
            editStatus.textContent = 'Edit failed';
        }
    });
});
