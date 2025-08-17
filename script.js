const selectedHerbs = [];
const resultDiv = document.getElementById("result");
const encyclopedia = document.getElementById("encyclopedia");
const encyclopediaContent = document.getElementById("encyclopedia-content");

const cauldron = document.getElementById("cauldron");
const smoke = document.getElementById("smoke");
const explosion = document.getElementById("explosion");

const successSound = document.getElementById("success-sound");
const failSound = document.getElementById("fail-sound");

document.querySelectorAll(".herb-btn").forEach(button => {
  button.addEventListener("click", () => {
    if (selectedHerbs.length >= 3) return;
    const herb = button.dataset.name;
    selectedHerbs.push(herb);
    button.disabled = true;
  });
});

document.getElementById("brew-btn").addEventListener("click", () => {
  const heat = parseInt(document.getElementById("heatSlider").value);
  const formula = selectedHerbs.sort().join("+") + "+heat:" + heat;

  // 清除動畫
  smoke.classList.add("hidden");
  explosion.classList.add("hidden");

  // 丹藥配方對照
  const recipes = {
    "星瑩苔+白芍+川芎+heat:5": {
      name: "清靈丹",
      effect: "清熱解毒、提神醒腦"
    },
    "蒲公英+乾薑+車前草+heat:6": {
      name: "通絡丸",
      effect: "活絡經脈、舒筋活血"
    },
    "荊芥+當歸+桔梗+heat:7": {
      name: "護元丹",
      effect: "增強免疫、護氣凝神"
    },
    "黃連+茯苓+蘇葉+heat:4": {
      name: "寧神丸",
      effect: "安神定志、解鬱寧心"
    }
    // 更多配方可在這擴充
  };

  const result = recipes[formula];

  if (result) {
    resultDiv.innerText = `✅ 成功煉製：${result.name}`;
    smoke.classList.remove("hidden");
    successSound.play();

    // 顯示圖鑑
    encyclopedia.classList.remove("hidden");
    encyclopediaContent.innerHTML += `
      <div class="encyclopedia-item">
        <h3>${result.name}</h3>
        <p>功效：${result.effect}</p>
        <p>配方：${selectedHerbs.join(" + ")}，火候：${heat}</p>
      </div>
    `;
  } else {
    resultDiv.innerText = "💥 煉丹失敗！";
    explosion.classList.remove("hidden");
    failSound.play();
  }

  // 重置
  selectedHerbs.length = 0;
  document.querySelectorAll(".herb-btn").forEach(b => b.disabled = false);
});