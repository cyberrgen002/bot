import axios from "axios";

export default async function handler(req, res) {
  try {
    const { code } = req.query;
    if (!code) return res.status(400).send("Missing code");

    const tokenRes = await axios.post(
      "https://launchpad.37signals.com/authorization/token",
      {
        type: "web_server",
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URI,
        code
      }
    );

    // ⚠️ Simpan token (sementara tampilkan dulu)
    res.status(200).json(tokenRes.data);

  } catch (e) {
    res.status(500).json(e.response?.data || { error: "OAuth failed" });
  }
}
