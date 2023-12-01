//import "https://unpkg.com/navigo"  //Will create the global Navigo object used below
import "https://cdnjs.cloudflare.com/ajax/libs/dompurify/2.4.0/purify.min.js"
import "./navigo_EditedByLars.js"  //Will create the global Navigo, with a few changes, object used below



import {
  setActiveLink, renderHtml, loadHtml, adjustForMissingHash
} from "./utils.js"


//import { initSomething } from "./pages/something.js"
import { initTest } from "./pages/pageTest/test.js"
/*import { initAddCourse } from "./pages/addCourse/addCourse.js"*/
import { initSignOut } from "./pages/signout/signOut.js"

window.addEventListener("load", async () => {

  const templateTest = await loadHtml("./pages/pageTest/test.html")
  /*const templateAddCourse = await loadHtml("./pages/addCourse/addCourse.html")*/
  
  const router = new Navigo("/",{hash:true});
  //Not especially nice, BUT MEANT to simplify things. Make the router global so it can be accessed from all js-files
  window.router = router
 

  router
    .hooks({
      before(done, match) {
        setActiveLink("sidebar", match.url)
        checkLoginStatus()
        adjustForMissingHash()
        done()
      }
    })
    .on({
      //For very simple "templates", you can just insert your HTML directly like below
      "/": () => document.getElementById("content").innerHTML =
      `<h1>Welcome to the Admin Portal</h1>`,
      
      "/test": () => {
        renderHtml(templateTest, "content")
        initTest()
      },
      /*"/addCourse": () => {
        renderHtml(templateAddCourse, "content")
        initAddCourse()
      },*/
      "/signOut": () => {
        initSignOut()
      }
    })
    .resolve()
});


window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
  alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber
    + ' Column: ' + column + ' StackTrace: ' + errorObj);
}

function checkLoginStatus(){
  const token = localStorage.getItem('token');
  if (token === null) {
      window.location.href = "/pages/login/adminPortal-Login.html"
      return;
  }
}