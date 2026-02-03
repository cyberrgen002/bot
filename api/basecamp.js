export const config = {
  runtime: "nodejs"
};

export default async function handler(req, res) {
  try {
    // Basecamp kadang test dengan GET
    if (req.method !== "POST") {
      return res.status(200).json({
        content: "🤖 Bot aktif. Gunakan: !bot <perintah>"
      });
    }

    // Payload asli Basecamp
    const body = req.body || {};
    const command = body.command || "";

    // Normalisasi
    const text = command.trim().toLowerCase();

    // Debug (lihat di Vercel Logs)
    console.log("Incoming command:", command);

    // ========= COMMAND HANDLER =========

    if (text === "!bot tes" || text === "tes") {
      return res.status(200).json({
        content: "✅ command bisa"
      });
    }

    if (text === "!bot help") {
      return res.status(200).json({
        content: "📖 Perintah tersedia:\n- !bot tes\n- !bot help"
      });
    }

    // Default fallback
    return res.status(200).json({
      content: `🤖 Bot OK.\nKamu kirim: ${command || "(kosong)"}`
    });

  } catch (err) {
    console.error("BOT ERROR:", err);

    // ⚠️ PENTING: tetap 200 agar Basecamp tidak error
    return res.status(200).json({
      content: "❌ Bot error (internal)."
    });
  }
}
