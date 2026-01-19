async function buscar() {
  const uid = document.getElementById("uid").value;
  const region = document.getElementById("region").value;
  const status = document.getElementById("status");

  if (!uid) {
    status.innerText = "Informe o UID";
    return;
  }

  status.innerText = "Buscando dados...";
  
  try {
    const res = await fetch(`/api/player?uid=${uid}&region=${region}`);
    const data = await res.json();

    if (!data.success) {
      status.innerText = "Jogador não encontrado";
      return;
    }

    document.getElementById("name").innerText = data.nickname;
    document.getElementById("level").innerText = data.level;
    document.getElementById("rank").innerText = data.rank;
    document.getElementById("kills").innerText = data.kills;
    document.getElementById("matches").innerText = data.matches;
    document.getElementById("hs").innerText = data.headshot_rate;

    const ban = document.getElementById("ban");
    const blacklist = document.getElementById("blacklist");

    if (data.banned) {
      ban.innerText = "BANIDO ❌";
      ban.className = "banned";
    } else {
      ban.innerText = "NÃO BANIDO ✅";
      ban.className = "safe";
    }

    if (data.blacklisted) {
      blacklist.innerText = "SIM ⚠️";
      blacklist.className = "blacklisted";
    } else {
      blacklist.innerText = "NÃO ✅";
      blacklist.className = "safe";
    }

    document.getElementById("card").classList.remove("hidden");
    status.innerText = "";

  } catch {
    status.innerText = "Erro ao conectar com a API";
  }
}
