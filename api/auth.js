export default function handler(req, res) {
  const url =
    "https://launchpad.37signals.com/authorization/new" +
    "?type=web_server" +
    `&client_id=${process.env.CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}`;

  res.redirect(url);
}
