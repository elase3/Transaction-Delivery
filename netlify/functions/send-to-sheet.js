exports.handler = async (event, context) => {
  try {
    const scriptURL = process.env.APPS_SCRIPT_URL;

    // نبعته زي ما جاي (FormData) من الـ Frontend
    const response = await fetch(scriptURL, {
      method: "POST",
      headers: { "Content-Type": event.headers["content-type"] },
      body: event.body,
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
