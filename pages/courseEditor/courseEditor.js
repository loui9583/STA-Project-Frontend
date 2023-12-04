


export function courseEditor() {
  console.log("Course Editor") 
  fetchCourses();
  document.getElementById("submitButton").onclick = addCourse;
}



async function fetchCourses() {
  let tbody = document.getElementById("tbody");
  try {
    const response = await fetch('http://localhost:8080/api/courses', {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json'
      },
    })
    if (response.ok) {
      const data = await response.json();
      let tableString = "";
      for (let i = 0; i<data.length; i++){
        tableString+=`
        <tr><td>${data[i].id}</td><td>${data[i].title}</td><td>${data[i].description}</td>
       
        <td><input readonly type="datetime-local" value="${data[i].startDate}"></td>
        <td>${data[i].pageLink}</td>
        
        <td><button style="margin-right: 10px" class="btn btn-primary">Edit</button><button class="btn btn-danger">Delete</button></td></tr>
        `
      }
      tbody.innerHTML=tableString;
    }
    else {
      console.error("Error fetching: Reponse status:" + response.status)
      throw new Error()
    }
  }
  catch(error){
    console.log('ERROR ' + error.message)
  }
}


async function addCourse() {
  let bodyString = `
  {
    "title": "${document.getElementById("title").value}",
    "description": "${document.getElementById("description").value}", 
    "startDate": "${document.getElementById("start-date").value}",
    "pageLink": "${document.getElementById("pageLink").value}"
  }`;
  console.log(bodyString)
  try {
    const response = await fetch('http://localhost:8080/api/courses', {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json'
      },
      body: bodyString
    })
    if (response.ok) {
      
      console.log("course added");
    }
    else {
      console.error("Error fetching: Reponse status:" + response.status)
      throw new Error()
    }
  }
  catch(error){
    console.log('ERROR add ' + error.message)
  }
  fetchCourses();
}