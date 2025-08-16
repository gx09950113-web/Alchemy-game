let selectedHerbs = [];

const herbButtons = document.querySelectorAll('.herb-btn');
const herbSlot = document.getElementById('herb-slot');
const animationDiv = document.getElementById('animation-effect');
const heatSlider = document.getElementById('heat-level');
const heatLabel = document.getElementById('heat-label');

// 加入音效
const successSound = new Audio('assets/sounds/success.mp3');
const failSound = new Audio('assets/sounds/fail.mp3');

// 火候文字顯示
heatSlider.addEventListener('input', () => {
  const value = parseInt(heatSlider.value);
  heatLabel.textContent = value === 1 ? '低溫' : value === 2 ? '中溫' : '高溫';
});

// 點選藥材
herbButtons.forEach(button => {
  button.addEventListener('click', () => {
    const herb = button.dataset.name;

    if (selectedHerbs.length >= 2) {
      alert('最多只能選兩種藥材');
      return;
    }

    if (selectedHerbs.includes(herb)) {
      alert('你已經選過這味藥材了');
      return;
    }

    selectedHerbs.push(herb);
    const li = document.createElement('li');
    li.textContent = herb;
    herbSlot.appendChild(li);
  });
});

// 開始煉丹
document.getElementById('start-brew').addEventListener('click', () => {
  if (selectedHerbs.length < 2) {
    alert('請選擇兩味藥材');
    return;
  }

  const key = selectedHerbs.sort().join('+');
  const userHeat = parseInt(heatSlider.value);
  const match = recipeMap[key];

  animationDiv.className = '';
  void animationDiv.offsetWidth;

  if (match && match.heat === userHeat) {
    successSound.currentTime = 0;
    successSound.play();

    animationDiv.classList.add('success-effect');
    setTimeout(() => animationDiv.className = '', 1500);
    alert(match.result);
  } else {
    failSound.currentTime = 0;
    failSound.play();

    animationDiv.classList.add('fail-effect');
    setTimeout(() => animationDiv.className = '', 1500);
    alert('❌ 煉丹失敗，藥材或火候不合...');
  }
});

// 重置按鈕
document.getElementById('reset').addEventListener('click', () => {
  selectedHerbs = [];
  herbSlot.innerHTML = '';
  animationDiv.className = '';
});

// 煉丹配方（含火候條件）
const recipeMap = {
  '星瑩苔+白芍': {
    result: '✔️ 成功煉出「清靈丸」！\n→ 淨化雜氣，稍提神識',
    heat: 2
  },
  '川芎+蒲公英': {
    result: '✔️ 成功煉出「行血丸」！\n→ 活血化瘀，跌打損傷適用',
    heat: 2
  },
  '乾薑+蒲公英': {
    result: '✔️ 成功煉出「溫陽散」！\n→ 祛寒暖身，助陽氣升騰',
    heat: 3
  }
};