import { API_URL } from "../../settings.js";
import {
  makeOptions,
  handleHttpErrors,
  sanitizeStringWithTableRows,
} from "../../utils.js";

export async function initTestimonials() {
  document.getElementById("error").innerText = "";
  try {
    const URL = API_URL + "/testimonials";
    const testimonials = await fetch(URL, makeOptions("GET", null, false)).then(
      handleHttpErrors
    );
    const rows = testimonials
      .map((testimonial) => {
        console.log(testimonial);
        return `<tr>
        <td>${testimonial.text}</td>
        <td>${testimonial.submissionName}</td>
        <td>${testimonial.image}</td>
        </tr>`;
      })
      .join("\n");
    const saferows = sanitizeStringWithTableRows(rows);
    document.getElementById("tablerows").innerHTML = saferows;
  } catch (error) {
    if (error.apiError) {
      document.getElementById("error").innerText = error.apiError.message;
    } else {
      document.getElementById("error").innerText = error.message;
      console.log("Error: ", error);
    }
  }
}

function submitTestimonial() {
    // Add your logic to handle the submitted testimonial
    // You can access the input values using document.getElementById
    console.log('Testimonial submitted');
    // Close the modal after submitting
    var addTestimonialModal = new bootstrap.Modal(document.getElementById('addTestimonialModal'));
    addTestimonialModal.hide();
  }