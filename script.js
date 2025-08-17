const selectedHerbs = [];
const formulas = {
  "星瑩苔+白芍+川芎+中溫": {
    name: "清靈丹",
    effect: "清熱解毒、提神醒腦"
  },
  "蒲公英+乾薑+車前草+高溫": {
    name: "通絡丸",
    effect: "活絡經脈、舒筋活血"
  },
  "荊芥+當歸+桔梗+高溫": {
    name: "護元丹",
    effect: "增強免疫、護氣凝神"
  },
  "黃連+茯苓+蘇葉+低溫": {
    name: "寧神丸",
    effect: "安神定志、解鬱寧心"
  }
};

const heatSlider = document.getElementById("heatSlider");
const heatLabel = document.getElementById("heatLabel");
const catalog = document.getElementById("catalog");
const knownList = document.getElementById("known-formulas");
const explosion = document.getElementById("explosion");
const smoke = document.getElementById("smoke");
const successSound = document.getElementById("successSound");
const failSound = document.getElementById("failSound");

// 顯示火候文字
const heatMap = {
  1: "低溫",
  2: "中溫",
  3: "高溫"
};
heatSlider.addEventListener("input", () => {
  heatLabel.textContent = heatMap[heatSlider.value];
});

// 藥材選擇
document.querySelectorAll(".herb-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    if (selectedHerbs.length < 3) {
      selectedHerbs.push(btn.dataset.name);
      btn.disabled = true;
    }
  });
});

// 開始煉丹
document.getElementById("brew-btn").addEventListener("click", () => {
  if (selectedHerbs.length !== 3) {
    alert("請選擇三種藥材！");
    return;
  }

  const heat = heatMap[heatSlider.value];
  const key = `${selectedHerbs.join("+")}+${heat}`;
  const result = formulas[key];

  if (result) {
    smoke.style.display = "block";
    successSound.play();
    showMessage(`成功煉成：${result.name}｜${result.effect}`);
    if (![...knownList.children].some(li => li.textContent.includes(result.name))) {
      const li = document.createElement("li");
      li.textContent = `${result.name}：${result.effect}`;
      knownList.appendChild(li);
    }
  } else {
    explosion.style.display = "block";
    failSound.play();
    showMessage("煉丹失敗，藥材或火候錯誤！");
  }

  setTimeout(() => {
    smoke.style.display = "none";
    explosion.style.display = "none";
  }, 2000);

  resetSelection();
});

document.getElementById("toggle-catalog").addEventListener("click", () => {
  catalog.style.display = catalog.style.display === "none" ? "block" : "none";
});

function showMessage(msg) {
  alert(msg); // 可改為更美觀的提示
}

function resetSelection() {
  selectedHerbs.length = 0;
  document.querySelectorAll(".herb-btn").forEach(btn => btn.disabled = false);
}
