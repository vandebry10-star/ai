export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    const r = await fetch(`${process.env.FAA_BASE}/faa/chatai`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await r.json();

    res.status(200).json({
      reply: data.result // rename, NO FAA TRACE
    });

  } catch (err) {
    res.status(500).json({
      reply: "Azbry-AI lagi capek, coba lagi."
    });
  }
}
