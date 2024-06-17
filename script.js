// function preventFormSubmit() {
//   var forms = document.querySelectorAll("form");
//   for (var i = 0; i < forms.length; i++) {
//     forms[i].addEventListener("submit", function (event) {
//       event.preventDefault();
//     });
//   }
// }

// for refresh socend page
// const refreshBtn = document.getElementById("closePage");
// refreshBtn.addEventListener("click", handleClick);

const loading = document.getElementById("loading");

// window.addEventListener("load", handleFormSubmit());

function handleFormSubmit() {
  document.getElementById("myForm").reset();
  document.getElementById("rep_code").innerHTML =
    '<option value="" disabled selected>اختار كودك</option>';
  document.getElementById("support_trans").setAttribute("disabled", "");
  document.getElementById("dateOfDay").value = datePattern;
}

const scriptURL =
  "https://script.google.com/macros/s/AKfycbyF873Ajo0wA9bIxju6eMsVa37Stjx9usTVddu7DQ6CH1cc6HOHhwJzZuXhUTsmFS0Sng/exec";
const form = document.forms["google-sheet"];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      loading.style.display = "none";
      handleFormSubmit();

      pop();
      throw new Error(popError());
    })
    .catch((error) => {
      // alert("Check your Connection Please ....!");

      loading.style.display = "flex";
      popError();
      throw new Error(pop());
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

// const checkOnlineStatus = async () => {
//   try {
//     const online = await fetch(
//       "https://docs.google.com/spreadsheets/d/1hyJnx4v3DYGA6wHCjgop8rc9v0tVvSDTYHu9eYz9x9w/edit#gid=0"
//     );
//     return online.status >= 200 && online.status < 300; // either true or false
//   } catch (err) {
//     return false; // definitely offline
//   }
// };

// setInterval(async () => {

// }, 3000); // probably too often, try 30000 for every 30 seconds

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
}
function hide() {
  document.getElementById("popup").style.display = "none";
  document.getElementById("popDiv").style.display = "none";
  document.getElementById("container").style.zIndex = "1";
  loading.style.display = "none";
  // window.addEventListener("load", handleFormSubmit());
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
