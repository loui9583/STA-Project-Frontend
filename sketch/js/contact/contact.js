
const form = document.querySelector('form');
const statusMessage = document.getElementById('statusMessage');

function handleFormSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    const formDataString = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`;


    try {
        form.reset();
        console.log(formDataString);
        statusMessage.textContent = 'Email sent successfully!';
        statusMessage.style.color = 'green';
    } catch (error) {
        console.error('Email sending failed:', error);
        statusMessage.textContent = 'Email sending failed. Please try again.';
        statusMessage.style.color = 'red';
    }
}

form.addEventListener('submit', handleFormSubmit);
