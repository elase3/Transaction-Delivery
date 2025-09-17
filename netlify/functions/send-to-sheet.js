exports.handler = async (event) => {
  try {
    console.log("Incoming body:", event.body); // نطبع البودي في Netlify log
    console.log("Incoming headers:", event.headers); // نطبع الهيدرز كمان

    // ابعت للـ Google Script
    const response = await fetch(process.env.APPS_SCRIPT_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: new URLSearchParams(JSON.parse(event.body)).toString(),
});
    
    const text = await response.text();
    console.log("Google Script response:", text);

    return {
      statusCode: 200,
      body: text,
    };
  } catch (err) {
    console.error("Error occurred:", err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
