const herbs = [];
const resultDiv = document.getElementById("result");
const animationDiv = document.getElementById("animation");
const successSound = document.getElementById("success-sound");
const failSound = document.getElementById("fail-sound");
const knownFormulas = document.getElementById("known-formulas");

// 對應配方
const recipes = {
  "星瑩苔+白芍+川芎+heat:中溫": {
    name: "清靈丹",
    effect: "清熱解毒、提神醒腦"
  },
  "蒲公英+乾薑+車前草+heat:高溫": {
    name: "通絡丸",
    effect: "活絡經脈、舒筋活血"
  },
  "荊芥+當歸+桔梗+heat:高溫": {
    name: "護元丹",
    effect: "增強免疫、護氣凝神"
  },
  "黃連+茯苓+蘇葉+heat:低溫": {
    name: "寧神丸",
    effect: "安神定志、解鬱寧心"
  }
};

document.querySelectorAll(".herb-btn").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.getAttribute("data-name");
    if (!herbs.includes(name) && herbs.length < 3) {
      herbs.push(name);
      button.disabled = true;
    }
  });
});

// 火候滑桿顯示標籤
const heatSlider = document.getElementById("heatSlider");
const heatLabel = document.getElementById("heatLabel");

heatSlider.addEventListener("input", () => {
  const value = parseInt(heatSlider.value);
  heatLabel.textContent = value === 1 ? "低溫" : value === 2 ? "中溫" : "高溫";
});

document.getElementById("brew-btn").addEventListener("click", () => {
  if (herbs.length < 3) {
    alert("請選擇三種藥材！");
    return;
  }

  const heatText = heatSlider.value === "1" ? "低溫" : heatSlider.value === "2" ? "中溫" : "高溫";
  const formula = herbs.sort().join("+") + "+heat:" + heatText;

  animationDiv.innerHTML = "";
  resultDiv.innerHTML = "";

  if (recipes[formula]) {
    const { name, effect } = recipes[formula];
    resultDiv.innerHTML = `✅ 煉製成功！你獲得了「${name}」<br>💡 效果：${effect}`;
    const img = document.createElement("img");
    img.src = "assets/images/smoke.gif";
    animationDiv.appendChild(img);
    successSound.play();

    // 圖鑑記錄
    if (!document.getElementById(formula)) {
      const li = document.createElement("li");
      li.id = formula;
      li.innerHTML = `<strong>${name}</strong>（${herbs.join(" + ")}，${heatText}）<br><small>${effect}</small>`;
      knownFormulas.appendChild(li);
    }
  } else {
    resultDiv.innerHTML = `❌ 煉製失敗，丹藥爆炸了！`;
    const img = document.createElement("img");
    img.src = "assets/images/explosion.gif";
    animationDiv.appendChild(img);
    failSound.play();
  }

  // 重置選擇
  herbs.length = 0;
  document.querySelectorAll(".herb-btn").forEach(btn => btn.disabled = false);
});