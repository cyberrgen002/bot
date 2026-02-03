export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const data = req.body || {};

  const command = data.command;
  const argumentsText = data.arguments || "";
  const user = data.creator?.name || "unknown";

  let reply;

  switch (command) {
    case "ping":
      reply = `Pong! 👋 (from ${user})`;
      break;

    case "echo":
      reply = `${user} said: ${argumentsText}`;
      break;

    default:
      reply = `Unknown command: ${command}`;
  }

  return res.status(200).json({
    content: reply
  });
}
