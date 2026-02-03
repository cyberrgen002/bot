// Allowlist command handlers
const ALLOWED_COMMANDS = {
  ping: ({ user }) => {
    return `Pong! 👋 (from ${user})`;
  },

  echo: ({ user, args }) => {
    if (!args) return "Usage: /echo <text>";
    return `${user}: ${args}`;
  },

  help: () => {
    return [
      "Available commands:",
      "/ping — check bot status",
      "/echo <text> — repeat your message",
      "/help — show this help"
    ].join("\n");
  }
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const data = req.body || {};

  const raw = (data.content || "").trim();
  const user = data.creator?.name || "unknown";

  // kosong → ignore
  if (!raw) {
    return res.json({ content: "Empty command" });
  }

  // parse command
  const [cmdRaw, ...argsArr] = raw.replace(/^\//, "").split(/\s+/);
  const command = cmdRaw.toLowerCase();
  const args = argsArr.join(" ");

  // allowlist check
  if (!ALLOWED_COMMANDS[command]) {
    return res.json({
      content: `❌ Command not allowed: ${command}\nType /help`
    });
  }

  // execute handler
  const reply = ALLOWED_COMMANDS[command]({
    user,
    args,
    raw
  });

  return res.json({ content: reply });
}
