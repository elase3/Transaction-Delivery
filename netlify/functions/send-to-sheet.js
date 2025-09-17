exports.handler = async (event, context) => {
  try {
    // رابط Google Apps Script من الـ Environment Variable
    const scriptURL = process.env.APPS_SCRIPT_URL;

    // استلام البيانات اللي جاية من الـ Frontend
    const formData = JSON.parse(event.body);

    // إرسال البيانات للـ Google Apps Script
    const response = await fetch(scriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.text();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Data sent successfully!", result }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
