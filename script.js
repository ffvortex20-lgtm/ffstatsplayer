function buscar() {
  const nick = document.getElementById("nick").value;
  if (!nick) return;

  const statsFake = {
    level: Math.floor(Math.random() * 80) + 20,
    rank: ["Bronze", "Ouro", "Diamante", "Mestre"][Math.floor(Math.random()*4)],
    kd: (Math.random() * 4 + 1).toFixed(2),
    hs: Math.floor(Math.random() * 60) + 20
  };

  document.getElementById("player").innerText = nick;
  document.getElementById("level").innerText = statsFake.level;
  document.getElementById("rank").innerText = statsFake.rank;
  document.getElementById("kd").innerText = statsFake.kd;
  document.getElementById("hs").innerText = statsFake.hs;

  document.getElementById("card").classList.remove("hidden");
}
