export const config = {
  runtime: "nodejs"
};

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(200).json({
        content: "Bot aktif. Gunakan command !bot ..."
      });
    }

    // DEBUG LOG (penting)
    console.log("HEADERS:", req.headers);
    console.log("BODY:", req.body);

    const content = req.body?.content || "(no content)";

    return res.status(200).json({
      content: `✅ Bot OK. Kamu kirim: ${content}`
    });
  } catch (e) {
    console.error("ERROR:", e);

    // ⚠️ JANGAN BALAS 500
    return res.status(200).json({
      content: "❌ Error internal bot (lihat log Vercel)."
    });
  }
}
