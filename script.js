

const loading = document.getElementById("loading");



function handleFormSubmit() {
  document.getElementById("myForm").reset();
  document.getElementById("rep_code").innerHTML =
    '<option value="" disabled selected>اختار كودك</option>';
  document.getElementById("support_trans").setAttribute("disabled", "");
  document.getElementById("dateOfDay").value = datePattern;
 
}

// for time input
function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const timeString = `${datePattern}, ${hours}:${minutes}:${seconds}`;
  document.getElementById("timeofsubmission").value = timeString;
}

updateClock();
setInterval(updateClock, 1000);



// في client-side (script.js)
const proxyURL = "/.netlify/functions/send-to-sheet"; 
const form = document.forms["google-sheet"];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  loading.style.position = "absolute";
  loading.style.top = "70%";
  loading.style.left = "50%";
  loading.style.transform = "translate(-50%, -50%)";
  

  // حول الفورم لـ JSON
  const formData = Object.fromEntries(new FormData(form));

  fetch(proxyURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // مهم جدًا
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Sucssesful"); // Debug
      handleFormSubmit();
      pop();
    })
    .catch((error) => {
      console.error("Error submitting form:", error);
      loading.style.display = "flex";
      popError();
    });
});



var date = new Date();
var year = date.getFullYear();
var month = String(date.getMonth() + 1).padStart(2, "0");
var todayDate = String(date.getDate()).padStart(2, "0");
var datePattern = year + "-" + month + "-" + todayDate;
document.getElementById("dateOfDay").value = datePattern;


const commonValues = {
  سائق: [
    3893, 4750, 6376, 5768, 6447, 6589, 7172, 7681, 3905, 7466, 6342, 6312,
    7869, 3482, 8052,
  ],
  مندوب: [
    6928, 6731, 8854, 8818, 9492, 9265, 7152, 5424, 8575, 1689, 6174, 9240,
    8155, 1123, 6698,
  ],
};

function enableCode(value) {
  if (value.length == 0) {
    document.getElementById("rep_code").innerHTML = "<option></option>";
  } else {
    var commonOptions = "";
    for (categoryID in commonValues[value]) {
      commonOptions +=
        "<option>" + commonValues[value][categoryID] + "</option>";
    }
    document.getElementById("rep_code").innerHTML = commonOptions;
  }
}

function vacation(value) {
  const supTrans = document.getElementById("support_trans");
  const carnum = document.getElementsByName("trcuk_num")[0];
  const channel = document.getElementById("channel");
  if (value == "خدمات") {
    supTrans.removeAttribute("disabled");
    carnum.removeAttribute("disabled", "");
    channel.setAttribute("disabled", "");
  } else if (value == "اجازة" || value == "احتياطي") {
    carnum.setAttribute("disabled", "");
    supTrans.setAttribute("disabled", "");
    channel.setAttribute("disabled", "");
  } else {
    supTrans.setAttribute("disabled", "");
    carnum.removeAttribute("disabled");
    channel.removeAttribute("disabled", "");
  }
}


function changeColor(ev) {
  if (ev.value.length > 0) {
    ev.style.border = "solid 1px #059862";
  } else {
    ev.style.border = "solid 1px red";
  }
}

// for popup after submition
function pop() {
  document.getElementById("popup").style.display = "flex";
  document.getElementById("popDiv").style.display = "block";
  document.getElementById("container").style.zIndex = "-999999";
  document.getElementById("popuperror").style.display = "none";
  loading.style.display = "none";
}
function hide() {
  document.getElementById("popup").style.display = "none";
  document.getElementById("popDiv").style.display = "none";
  document.getElementById("container").style.zIndex = "1";
  loading.style.display = "none";
  window.addEventListener("load", handleFormSubmit());
}

function popError() {
  document.getElementById("popuperror").style.display = "flex";
  document.getElementById("popDiv").style.display = "block";
  document.getElementById("container").style.zIndex = "-999999";
  document.getElementById("popup").style.display = "none";
}
//To detect escape button
document.onkeydown = function (evt) {
  evt = evt || window.event;
  if (evt.keyCode == 27) {
    hide("popDiv");
  }
};

const loader = document.getElementById("preloader");
window.addEventListener("load", function () {
  setTimeout(() => {
    loader.style.display = "none";
  }, 5000);
});



