// api/password.js

export default async function handler(req, res) {
  const response = await fetch('https://api.npoint.io/8ba6d5e4994308131eac');
  const data = await response.json();

  res.status(200).json(data);  // Send the password data from the external API
}
