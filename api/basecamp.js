import axios from "axios";

export default async function handler(req, res) {
  try {
    const data = req.body;

    if (!data || !data.command) {
      return res.status(200).end(); // Basecamp suka ini
    }

    if (data.command !== "tes") {
      return res.status(200).end();
    }

    const callbackUrl = data.callback_url;

    await axios.post(
      callbackUrl,
      { content: "command bisa" },
      {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
          "Content-Type": "application/json",
          "User-Agent": "Basecamp-Bot"
        }
      }
    );

    return res.status(200).end();
  } catch (err) {
    console.error("BOT ERROR:", err.response?.data || err.message);
    return res.status(200).end(); 
    // ⚠️ JANGAN return 500 ke Basecamp
  }
}
