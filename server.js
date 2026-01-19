import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.static("public"));

app.get("/api/player", async (req, res) => {
  const { uid, region } = req.query;

  try {
    const apiURL = `https://free-ff-api-src-5plp.onrender.com/api/v1/playerstats?region=${region}&uid=${uid}`;
    const response = await fetch(apiURL);
    const json = await response.json();

    if (!json || !json.player) {
      return res.json({ success: false });
    }

    const banned =
      json.player.is_banned === true ||
      json.player.ban_status === "banned";

    const blacklisted =
      json.player.blacklisted === true ||
      json.player.flagged === true;

    res.json({
      success: true,
      nickname: json.player.nickname,
      level: json.player.level,
      rank: json.player.rank,
      kills: json.stats.kills,
      matches: json.stats.matches,
      headshot_rate: json.stats.headshot_rate,
      banned,
      blacklisted
    });

  } catch {
    res.json({ success: false });
  }
});

app.listen(3000, () => {
  console.log("🔥 Free Fire Stats VORTEX rodando em http://localhost:3000");
});
