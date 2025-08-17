const selectedHerbs = [];
const herbSlot = document.getElementById('herb-slot');
const heatSlider = document.getElementById('heat-level');
const heatLabel = document.getElementById('heat-label');
const animationEffect = document.getElementById('animation-effect');
const successSound = document.getElementById('success-sound');
const failSound = document.getElementById('fail-sound');

// 火候標籤更新
heatSlider.addEventListener('input', () => {
  const levels = ['低溫', '中溫', '高溫'];
  heatLabel.textContent = levels[heatSlider.value - 1];
});

// 點選藥材加入
document.querySelectorAll('.herb-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const herb = btn.dataset.name;
    if (selectedHerbs.length < 3) {
      selectedHerbs.push(herb);
      updateHerbSlot();
    }
  });
});

function updateHerbSlot() {
  herbSlot.innerHTML = '';
  selectedHerbs.forEach(herb => {
    const li = document.createElement('li');
    li.textContent = herb;
    herbSlot.appendChild(li);
  });
}

const recipes = {
  "星瑩苔+白芍+川芎|2": "養元丹",
  "乾薑+蒲公英+車前草|1": "清炎丹",
  "黃連+茯苓+荊芥|3": "定神丹",
  "當歸+桔梗+蘇葉|2": "強體丹",
  "星瑩苔+蘇葉+白芍|1": "活絡丹",
};

document.getElementById('start-brew').addEventListener('click', () => {
  if (selectedHerbs.length !== 3) return alert("請選擇三種藥材");
  const combo = [...selectedHerbs].sort().join('+') + '|' + heatSlider.value;
  const result = recipes[combo];
  animationEffect.className = '';

  if (result) {
    animationEffect.classList.add('success-effect');
    successSound.currentTime = 0;
    successSound.play();
    alert(`煉成：${result}`);
    unlockPill(result);
  } else {
    animationEffect.classList.add('fail-effect');
    failSound.currentTime = 0;
    failSound.play();
    alert("煉丹失敗！");
  }
});

document.getElementById('reset').addEventListener('click', () => {
  selectedHerbs.length = 0;
  updateHerbSlot();
});

const dexBtn = document.getElementById('open-dex');
const dexModal = document.getElementById('dex-modal');
const closeDex = document.getElementById('close-dex');
const dexList = document.getElementById('dex-list');

dexBtn.addEventListener('click', () => {
  dexModal.style.display = 'block';
  updateDexList();
});

closeDex.addEventListener('click', () => {
  dexModal.style.display = 'none';
});

function unlockPill(pillName) {
  const unlocked = JSON.parse(localStorage.getItem('pillDex') || '[]');
  if (!unlocked.includes(pillName)) {
    unlocked.push(pillName);
    localStorage.setItem('pillDex', JSON.stringify(unlocked));
  }
}

function updateDexList() {
  const unlocked = JSON.parse(localStorage.getItem('pillDex') || '[]');
  dexList.innerHTML = '';
  const allPills = Object.values(recipes).filter((v, i, a) => a.indexOf(v) === i);
  allPills.forEach(pill => {
    const li = document.createElement('li');
    li.textContent = unlocked.includes(pill) ? pill : '？？？';
    dexList.appendChild(li);
  });
}

window.addEventListener('click', (e) => {
  if (e.target === dexModal) {
    dexModal.style.display = 'none';
  }
});