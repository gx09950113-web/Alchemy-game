const selectedHerbs = new Set();
const herbButtons = document.querySelectorAll(".herb-btn");
const brewBtn = document.getElementById("brew-btn");
const catalogBtn = document.getElementById("toggle-catalog");
const knownList = document.getElementById("known-formulas");
const explosion = document.getElementById("explosion");
const smoke = document.getElementById("smoke");
const catalog = document.getElementById("catalog");
const successSound = document.getElementById("success-sound");
const failSound = document.getElementById("fail-sound");
const heatSlider = document.getElementById("heatSlider");
const heatLabel = document.getElementById("heatLabel");

const knownFormulas = [];

const recipes = [
  {
    name: "清神丹",
    herbs: ["星瑩苔", "白芍", "川芎"],
    heat: "中溫"
  },
  {
    name: "強身丸",
    herbs: ["乾薑", "車前草", "當歸"],
    heat: "高溫"
  },
  {
    name: "鎮痛散",
    herbs: ["荊芥", "桔梗", "蒲公英"],
    heat: "低溫"
  }
];

function updateHeatLabel(value) {
  const levels = { 1: "低溫", 2: "中溫", 3: "高溫" };
  heatLabel.textContent = levels[value];
}

heatSlider.addEventListener("input", () => {
  updateHeatLabel(heatSlider.value);
});

herbButtons.forEach(button => {
  button.addEventListener("click", () => {
    const name = button.getAttribute("data-name");
    if (selectedHerbs.has(name)) {
      selectedHerbs.delete(name);
      button.classList.remove("selected");
    } else {
      selectedHerbs.add(name);
      button.classList.add("selected");
    }
  });
});

catalogBtn.addEventListener("click", () => {
  catalog.style.display = catalog.style.display === "none" ? "block" : "none";
});

brewBtn.addEventListener("click", () => {
  const herbsArray = Array.from(selectedHerbs).sort();
  const currentHeat = heatLabel.textContent;
  let found = false;

  for (const recipe of recipes) {
    const sortedRecipe = [...recipe.herbs].sort();
    if (
      JSON.stringify(herbsArray) === JSON.stringify(sortedRecipe) &&
      recipe.heat === currentHeat
    ) {
      triggerSuccess(recipe.name);
      found = true;
      break;
    }
  }

  if (!found) triggerFailure();

  // 清空選擇
  selectedHerbs.clear();
  herbButtons.forEach(btn => btn.classList.remove("selected"));
});

function triggerSuccess(name) {
  smoke.style.display = "block";
  explosion.style.display = "none";
  successSound.play();

  setTimeout(() => (smoke.style.display = "none"), 2000);

  if (!knownFormulas.includes(name)) {
    knownFormulas.push(name);
    const li = document.createElement("li");
    li.textContent = `${name}（${heatLabel.textContent}）`;
    knownList.appendChild(li);
  }

  alert(`成功煉成：${name}`);
}

function triggerFailure() {
  explosion.style.display = "block";
  smoke.style.display = "none";
  failSound.play();
  setTimeout(() => (explosion.style.display = "none"), 2000);
  alert("煉丹失敗！");
}
