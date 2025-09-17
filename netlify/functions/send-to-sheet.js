export async function handler(event) {
  try {
    const formData = JSON.parse(event.body);

    const response = await fetch(process.env.APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(formData).toString(),
    });

    const text = await response.text();

    return {
      statusCode: 200,
      body: text,
    };
  } catch (error) {
   
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
