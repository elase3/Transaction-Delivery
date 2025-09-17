// netlify/functions/send-to-sheet.js
const fetch = require("node-fetch"); // عشان نستعمل fetch في السيرفر

exports.handler = async function (event) {
  try {
    // اسمح بالـ POST بس
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    // ابعت البيانات إلى Google Apps Script (اللينك متخزن في Environment Variable)
    const response = await fetch(process.env.APPS_SCRIPT_URL, {
      method: "POST",
      body: event.body, // نفس البيانات اللي جات من الفورم
      headers: { "Content-Type": event.headers["content-type"] },
    });

    // رجع النتيجة للمتصفح
    const text = await response.text();
    return {
      statusCode: response.status,
      body: text,
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

