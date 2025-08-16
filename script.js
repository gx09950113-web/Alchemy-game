// 玩家選的藥材會放這裡
let selectedHerbs = [];

// DOM 元素
const herbButtons = document.querySelectorAll('.herb-btn');
const herbSlot = document.getElementById('herb-slot');
const animationDiv = document.getElementById('animation-effect');

// 點選藥材按鈕邏輯
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

// 開始煉丹邏輯
document.getElementById('start-brew').addEventListener('click', () => {
  if (selectedHerbs.length < 2) {
    alert('請選擇兩味藥材');
    return;
  }

  const key = selectedHerbs.sort().join('+');

  // 先清除任何舊動畫
  animationDiv.className = '';
  void animationDiv.offsetWidth; // 強制重繪，保證動畫可以重新觸發

  const resultText = recipeMap[key];

  if (resultText) {
    // ✅ 成功動畫
    animationDiv.classList.add('success-effect');
    setTimeout(() => animationDiv.className = '', 1500);
    alert(resultText);
  } else {
    // ❌ 失敗動畫
    animationDiv.classList.add('fail-effect');
    setTimeout(() => animationDiv.className = '', 1500);
    alert('❌ 煉丹失敗，藥材不合...');
  }
});

// 重置邏輯
document.getElementById('reset').addEventListener('click', () => {
  selectedHerbs = [];
  herbSlot.innerHTML = '';
  animationDiv.className = '';
});

// 可用配方對照表（key 用排序後組合）
const recipeMap = {
  '川芎+蒲公英': '✔️ 成功煉出「行血丸」！\n→ 活血化瘀，跌打損傷適用',
  '乾薑+蒲公英': '✔️ 成功煉出「溫陽散」！\n→ 祛寒暖身，助陽氣升騰',
  '星瑩苔+白芍': '✔️ 成功煉出「清靈丸」！\n→ 淨化雜氣，稍提神識'
};