const proxyURL = "/.netlify/functions/send-to-sheet"; 
const form = document.forms["google-sheet"];
const loading = document.getElementById("loading");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // حول الفورم لـ JSON
  const formData = Object.fromEntries(new FormData(form));

  fetch(proxyURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        popError(); // تظهر للمستخدم رسالة خطأ
      } else {
        handleFormSubmit();
        pop(); // تظهر رسالة نجاح
      }
    })
    .catch(() => {
      popError(); // تظهر رسالة خطأ لو فيه مشكلة في الشبكة
    });
});
