import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.static("public"));

const API_KEY = "SUA_API_KEY_AQUI"; // se a API exigir

app.get("/api/freefire", async (req, res) => {
  const { uid, region } = req.query;

  if (!uid || !region) {
    return res.json({ success: false, error: "UID ou região faltando" });
  }

  try {
    const response = await fetch(
      `https://freefire-api.com/player?uid=${uid}&region=${region}`,
      {
        headers: {
          "Authorization": `Bearer ${API_KEY}`
        }
      }
    );

    if (!response.ok) {
      return res.json({ success: false, error: "API offline" });
    }

    const data = await response.json();

    res.json({
      success: true,
      nickname: data.account.nickname,
      level: data.account.level,
      rank: data.stats.rank,
      kd: data.stats.kd,
      kills: data.stats.kills,
      matches: data.stats.matches,
      banned: data.account.is_banned === true,
      blacklisted: data.blacklist === true
    });

  } catch (err) {
    console.error(err);
    res.json({ success: false, error: "Erro ao conectar à API" });
  }
});

app.listen(3000, () => {
  console.log("🔥 Free Fire Community API rodando");
});
