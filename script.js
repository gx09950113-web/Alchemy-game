const selectedHerbs = [];
const knownFormulas = {
  "星瑩苔,白芍,川芎@中溫": "補氣丹",
  "蒲公英,乾薑,車前草@高溫": "清熱丸",
  "當歸,桔梗,荊芥@低溫": "疏風散",
};

const brewBtn = document.getElementById("brew-btn");
const catalog = document.getElementById("catalog");
const toggleCatalog = document.getElementById("toggle-catalog");
const knownList = document.getElementById("known-formulas");

const explosionGif = document.getElementById("explosion");
const smokeGif = document.getElementById("smoke");

const failSound = new Audio("assets/sounds/fail.mp3");
const successSound = new Audio("assets/sounds/success.mp3");

const heatSlider = document.getElementById("heatSlider");
const heatLabel = document.getElementById("heatLabel");
const heatMap = ["低溫", "中溫", "高溫"];

heatSlider.addEventListener("input", () => {
  const level = parseInt(heatSlider.value);
  heatLabel.textContent = heatMap[level - 1];
});

document.querySelectorAll(".herb-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const name = btn.dataset.name;
    if (!selectedHerbs.includes(name)) {
      selectedHerbs.push(name);
      btn.disabled = true;
    }
  });
});

toggleCatalog.addEventListener("click", () => {
  catalog.style.display = catalog.style.display === "none" ? "block" : "none";
});

brewBtn.addEventListener("click", () => {
  const sortedHerbs = selectedHerbs.slice().sort().join(",");
  const currentHeat = heatMap[parseInt(heatSlider.value) - 1];
  const fullKey = `${sortedHerbs}@${currentHeat}`;

  explosionGif.style.display = "none";
  smokeGif.style.display = "none";

  if (knownFormulas[fullKey]) {
    smokeGif.style.display = "block";
    successSound.play();
    addToCatalog(knownFormulas[fullKey], `${sortedHerbs}（${currentHeat}）`);
  } else {
    explosionGif.style.display = "block";
    failSound.play();
  }

  selectedHerbs.length = 0;
  document.querySelectorAll(".herb-btn").forEach(btn => btn.disabled = false);
});

function addToCatalog(name, formulaDetail) {
  const exists = [...knownList.children].some(li => li.textContent.includes(name));
  if (!exists) {
    const li = document.createElement("li");
    li.textContent = `${name} ← ${formulaDetail}`;
    knownList.appendChild(li);
  }
}
