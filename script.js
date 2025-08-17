const herbs = [
  "玄息蘭",
  "靈芝",
  "赤炎果",
  "冰心草",
  "夜光花",
  "玉露葉"
];

const recipes = {
  "玄息蘭,靈芝": "回氣丹",
  "赤炎果,冰心草": "陽陰調和丹",
  "夜光花,玉露葉": "凝神丸"
};

const potionDex = new Set();

function renderHerbs() {
  const herbList = document.getElementById("herb-list");
  herbList.innerHTML = "";
  herbs.forEach(herb => {
    const btn = document.createElement("button");
    btn.className = "herb-btn";
    btn.textContent = herb;
    btn.onclick = () => selectHerb(herb);
    herbList.appendChild(btn);
  });
}

const selected = [];

function selectHerb(herb) {
  if (selected.length >= 2) return;
  selected.push(herb);
  updateHerbSlot();
}

function updateHerbSlot() {
  const slot = document.getElementById("herb-slot");
  slot.innerHTML = "";
  selected.forEach(h => {
    const li = document.createElement("li");
    li.textContent = h;
    slot.appendChild(li);
  });
}

function brewPotion() {
  const heat = parseInt(document.getElementById("heat-level").value, 10);
  const animation = document.getElementById("animation-effect");
  const key = selected.sort().join(",");
  animation.className = ""; // reset

  void animation.offsetWidth; // trigger reflow

  if (recipes[key] && heat >= 4 && heat <= 7) {
    const potion = recipes[key];
    alert(`煉成成功！你獲得了 ${potion}`);
    potionDex.add(potion);
    animation.classList.add("success-effect");
  } else {
    alert("煉丹失敗！");
    animation.classList.add("fail-effect");
  }

  selected.length = 0;
  updateHerbSlot();
}

function openDex() {
  const list = document.getElementById("dex-list");
  list.innerHTML = "";
  [...potionDex].forEach(name => {
    const li = document.createElement("li");
    li.textContent = name;
    list.appendChild(li);
  });
  document.getElementById("potion-dex").style.display = "block";
}

function closeDex() {
  document.getElementById("potion-dex").style.display = "none";
}

renderHerbs();
