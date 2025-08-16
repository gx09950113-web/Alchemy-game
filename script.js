// 玩家選的藥材
let selectedHerbs = [];

// 選藥材事件
const herbButtons = document.querySelectorAll('.herb-btn');
const herbSlot = document.getElementById('herb-slot');

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
  const result = recipeMap[key] || '❌ 煉丹失敗，藥材不合...';
  alert(result);
});

// 重置煉丹
document.getElementById('reset').addEventListener('click', () => {
  selectedHerbs = [];
  herbSlot.innerHTML = '';
});

// 配方資料庫（簡化）
const recipeMap = {
  '星瑩苔+白芍': '✔️ 成功煉出「清靈丸」！\n→ 淨化雜氣，稍提神識',
  '川芎+蒲公英': '✔️ 成功煉出「行血丸」！\n→ 活血化瘀，跌打損傷適用',
  '乾薑+蒲公英': '✔️ 成功煉出「溫陽散」！\n→ 祛寒暖身，助陽氣升騰'
};