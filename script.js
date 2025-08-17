let selectedHerbs = [];

const herbButtons = document.querySelectorAll('.herb-btn');
const herbSlot = document.getElementById('herb-slot');
const animationDiv = document.getElementById('animation-effect');
const heatSlider = document.getElementById('heat-level');
const heatLabel = document.getElementById('heat-label');

// 音效
const successSound = new Audio('assets/sounds/success.mp3');
const failSound = new Audio('assets/sounds/fail.mp3');

// 火候變動顯示
heatSlider.addEventListener('input', () => {
  heatLabel.textContent = ['低溫', '中溫', '高溫'][heatSlider.value - 1];
});

// 點選藥材
herbButtons.forEach(button => {
  button.addEventListener('click', () => {
    const herb = button.dataset.name;
    if (selectedHerbs.length >= 2 || selectedHerbs.includes(herb)) return;
    selectedHerbs.push(herb);
    const li = document.createElement('li');
    li.textContent = herb;
    herbSlot.appendChild(li);
  });
});

// 配方資料庫
const recipeMap = {
  '星瑩苔+白芍': { result: '✔️ 成功煉出「清靈丸」！\n→ 淨化雜氣，稍提神識', heat: 2 },
  '川芎+蒲公英': { result: '✔️ 成功煉出「行血丸」！\n→ 活血化瘀，跌打損傷適用', heat: 2 },
  '乾薑+蒲公英': { result: '✔️ 成功煉出「溫陽散」！\n→ 祛寒暖身，助陽氣升騰', heat: 3 },
  '車前草+白芍': { result: '✔️ 成功煉出「固氣丹」！\n→ 穩固下丹田靈氣，助入門修煉', heat: 2 },
  '荊芥+蒲公英': { result: '✔️ 成功煉出「止痛丸」！\n→ 鎮痛止癢，內外皆用', heat: 1 },
  '星瑩苔+當歸': { result: '✔️ 成功煉出「凝神丹」！\n→ 凝聚精神，輔助靈識穩定', heat: 2 },
  '桔梗+黃連': { result: '✔️ 成功煉出「斷毒丹」！\n→ 解毒清熱，重病急救良方', heat: 3 },
  '茯苓+蘇葉': { result: '✔️ 成功煉出「回靈丸」！\n→ 回復靈力，應急使用', heat: 1 }
};

// 圖鑑資料
const DEX_KEY = 'unlockedPills';
const dexData = {
  '清靈丸': '→ 淨化雜氣，稍提神識',
  '行血丸': '→ 活血化瘀，跌打損傷適用',
  '溫陽散': '→ 祛寒暖身，助陽氣升騰',
  '固氣丹': '→ 穩固下丹田靈氣，助入門修煉',
  '止痛丸': '→ 鎮痛止癢，內外皆用',
  '凝神丹': '→ 凝聚精神，輔助靈識穩定',
  '斷毒丹': '→ 解毒清熱，重病急救良方',
  '回靈丸': '→ 回復靈力，應急使用'
};

function getUnlockedPills() {
  return JSON.parse(localStorage.getItem(DEX_KEY)) || [];
}

function unlockPill(name) {
  const unlocked = getUnlockedPills();
  if (!unlocked.includes(name)) {
    unlocked.push(name);
    localStorage.setItem(DEX_KEY, JSON.stringify(unlocked));
  }
}

function renderDex() {
  const list = document.getElementById('dex-list');
  list.innerHTML = '';
  const unlocked = getUnlockedPills();

  Object.keys(dexData).forEach(name => {
    const li = document.createElement('li');
    li.textContent = unlocked.includes(name) ? `${name} ${dexData[name]}` : '？？？';
    list.appendChild(li);
  });
}

// 煉丹按鈕
document.getElementById('start-brew').addEventListener('click', () => {
  if (selectedHerbs.length < 2) return alert('請選擇兩味藥材');
  const key = selectedHerbs.sort().join('+');
  const userHeat = parseInt(heatSlider.value);
  const match = recipeMap[key];

  animationDiv.className = '';
  void animationDiv.offsetWidth;

  if (match && match.heat === userHeat) {
    successSound.currentTime = 0; successSound.play();
    const pillName = match.result.match(/「(.+?)」/)?.[1];
    if (pillName) unlockPill(pillName);
    animationDiv.classList.add('success-effect');
    setTimeout(() => animationDiv.className = '', 1500);
    alert(match.result);
  } else {
    failSound.currentTime = 0; failSound.play();
    animationDiv.classList.add('fail-effect');
    setTimeout(() => animationDiv.className = '', 1500);
    alert('❌ 煉丹失敗，藥材或火候不合...');
  }
});

// 重置
document.getElementById('reset').addEventListener('click', () => {
  selectedHerbs = [];
  herbSlot.innerHTML = '';
  animationDiv.className = '';
});

// 圖鑑事件
document.getElementById('open-dex').addEventListener('click', () => {
  renderDex();
  document.getElementById('dex-modal').style.display = 'block';
});

document.getElementById('close-dex').addEventListener('click', () => {
  document.getElementById('dex-modal').style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target.id === 'dex-modal') {
    document.getElementById('dex-modal').style.display = 'none';
  }
});