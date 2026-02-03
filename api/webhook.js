import axios from "axios";

export default async function handler(req, res) {
  try {
    const { command, callback_url } = req.body;

    if (command === "tes") {
      await axios.post(
        callback_url,
        { content: "command bisa" },
        {
          headers: {
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            "Content-Type": "application/json",
            "User-Agent": "Basecamp-Bot"
          }
        }
      );
    }

    res.status(200).json({ status: "ok" });

  } catch (e) {
    res.status(500).json({ error: "webhook failed" });
  }
}
