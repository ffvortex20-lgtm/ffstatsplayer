import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.static("public"));

app.get("/api/player", async (req, res) => {
  const { uid, region } = req.query;

  if (!uid || !region) {
    return res.json({ success: false, error: "UID ou região ausente" });
  }

  const apiURL = `https://free-ff-api-src-5plp.onrender.com/api/v1/playerstats?region=${region}&uid=${uid}`;

  try {
    const response = await fetch(apiURL, { timeout: 15000 });

    if (!response.ok) {
      console.error("API OFFLINE:", response.status);
      return res.json({ success: false, error: "API indisponível" });
    }

    const json = await response.json();

    if (!json.player || !json.stats) {
      console.error("Dados inválidos:", json);
      return res.json({ success: false, error: "Jogador não encontrado" });
    }

    const banned =
      json.player.is_banned === true ||
      json.player.ban_status === "banned";

    const blacklisted =
      json.player.blacklisted === true ||
      json.player.flagged === true;

    res.json({
      success: true,
      nickname: json.player.nickname || "Desconhecido",
      level: json.player.level || 0,
      rank: json.player.rank || "N/A",
      kills: json.stats.kills || 0,
      matches: json.stats.matches || 0,
      headshot_rate: json.stats.headshot_rate || 0,
      banned,
      blacklisted
    });

  } catch (err) {
    console.error("ERRO FETCH:", err.message);
    res.json({ success: false, error: "Falha ao conectar à API" });
  }
});

app.listen(3000, () => {
  console.log("🔥 Free Fire Stats VORTEX rodando em http://localhost:3000");
});
