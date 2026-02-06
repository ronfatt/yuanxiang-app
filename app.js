const suitMeta = {
  spades: {
    symbol: "♠",
    cn: "黑桃",
    dimension: "意志 / 业力 / 决断维度",
    hint: "你现在不是没能力，是不敢下决心。",
    directive: "CUT"
  },
  hearts: {
    symbol: "♥",
    cn: "红心",
    dimension: "情感 / 因缘 / 关系维度",
    hint: "这不是事的问题，是你心还在拉扯。",
    directive: "OBSERVE"
  },
  diamonds: {
    symbol: "♦",
    cn: "方块",
    dimension: "资源 / 现实 / 金钱维度",
    hint: "别再讲感觉了，现实条件不支持。",
    directive: "STABILIZE"
  },
  clubs: {
    symbol: "♣",
    cn: "梅花",
    dimension: "行动 / 成长 / 流动维度",
    hint: "你卡住，是因为没有在动。",
    directive: "MOVE"
  }
};

const stageMap = {
  "A": "源头 / 启动",
  "2": "酝酿期-摇摆",
  "3": "酝酿期-想试",
  "4": "酝酿期-开始卡",
  "5": "冲突期-想逃",
  "6": "冲突期-开始承担",
  "7": "冲突期-内在拉扯",
  "8": "现实显化期-力量出现",
  "9": "现实显化期-代价浮现",
  "10": "现实显化期-事情到顶",
  "J": "人格与主权-执行者",
  "Q": "人格与主权-关系者",
  "K": "人格与主权-主权者"
};

const stageGroup = {
  "A": { phase: "源点", freq: "初启", energy: "觉察点火", destiny: "命题刚浮现" },
  "2": { phase: "酝酿", freq: "摇摆", energy: "能量分流", destiny: "路径未定" },
  "3": { phase: "酝酿", freq: "试探", energy: "小幅推进", destiny: "机会在门口" },
  "4": { phase: "酝酿", freq: "停滞", energy: "阻力显影", destiny: "卡点成形" },
  "5": { phase: "冲突", freq: "逃避", energy: "内耗拉扯", destiny: "回避代价" },
  "6": { phase: "冲突", freq: "承担", energy: "力量聚焦", destiny: "开始转向" },
  "7": { phase: "冲突", freq: "撕扯", energy: "对立并存", destiny: "需要抉择" },
  "8": { phase: "显化", freq: "兑现", energy: "行动加速", destiny: "结果逼近" },
  "9": { phase: "显化", freq: "代价", energy: "承重测试", destiny: "交换浮现" },
  "10": { phase: "显化", freq: "顶点", energy: "结构定型", destiny: "走向确定" },
  "J": { phase: "人格", freq: "执行", energy: "习惯驱动", destiny: "做事方式定性" },
  "Q": { phase: "人格", freq: "关系", energy: "互动模式", destiny: "关系结构显形" },
  "K": { phase: "主权", freq: "主宰", energy: "核心意志", destiny: "人生议题上桌" }
};

const directiveCn = {
  CUT: "断",
  OBSERVE: "看",
  MOVE: "做",
  STABILIZE: "稳"
};

const topicLex = [
  {
    id: "relationship",
    label: "关系/感情",
    keywords: [
      "冷战", "已读不回", "不回消息", "忽冷忽热", "暧昧",
      "信任危机", "猜疑", "翻旧账", "控制", "黏人",
      "出轨", "精神出轨", "第三者", "劈腿",
      "分手", "复合", "拉扯", "舍不得", "放不下",
      "没感觉了", "心变了", "距离感", "亲密感",
      "冷淡", "敷衍", "吵架", "冷处理",
      "不被珍惜", "委屈", "心累", "安全感",
      "拉黑", "删除", "断联", "复联"
    ]
  },
  {
    id: "family",
    label: "家庭/亲人",
    keywords: [
      "婆媳", "公婆", "岳父岳母",
      "原生家庭", "代沟", "偏心",
      "抚养", "赡养", "照顾父母",
      "孩子教育", "叛逆", "管不动",
      "住一起", "分家", "搬出去",
      "家庭压力", "责任太重",
      "被夹在中间", "不被理解",
      "情感勒索", "道德绑架",
      "家庭矛盾", "长期冷战"
    ]
  },
  {
    id: "career",
    label: "事业/工作",
    keywords: [
      "裁员", "被辞退", "失业",
      "试用期", "转正失败",
      "绩效", "考核", "KPI",
      "升职无望", "被打压",
      "跳槽", "转行", "转型",
      "面试", "被刷", "没回音",
      "合伙", "拆伙", "股权纠纷",
      "工作倦怠", "天花板",
      "内卷", "加班", "被压榨",
      "不被认可", "没发展"
    ]
  },
  {
    id: "money",
    label: "金钱/资源",
    keywords: [
      "没钱", "不够用", "快撑不住",
      "现金流", "周转不过来",
      "负债", "欠款", "被追债",
      "房贷", "车贷", "信用卡",
      "收入不稳定", "断收入",
      "理财失败", "投资失败",
      "亏损", "被割", "爆仓",
      "被拖欠", "收不到钱",
      "存不到钱", "花钱焦虑"
    ]
  },
  {
    id: "health",
    label: "健康/身体",
    keywords: [
      "失眠", "睡不着", "睡不好",
      "焦虑", "紧张", "心慌",
      "情绪失控", "情绪低落",
      "头痛", "胃痛", "胸闷",
      "复查", "指标异常", "报告",
      "手术", "术前", "术后恢复",
      "慢性问题", "反复不好",
      "免疫力低", "容易累",
      "身体被情绪影响"
    ]
  },
  {
    id: "self",
    label: "自我/成长",
    keywords: [
      "迷茫", "不知道要什么",
      "内耗", "想太多", "停不下来",
      "拖延", "没动力", "摆烂",
      "卡住", "瓶颈", "走不动",
      "觉醒", "看清", "想改变",
      "对自己失望", "自责",
      "讨好型人格", "没边界",
      "不敢拒绝", "容易心软",
      "害怕选择", "不敢决定"
    ]
  }
];

const crossTopicTriggers = [
  "压力很大",
  "心累",
  "快撑不住了",
  "不知道该怎么办",
  "一直这样下去",
  "我是不是做错了",
  "为什么总是我",
  "已经很久了",
  "我真的很累"
];

function createCard(suit, rank, deity) {
  const meta = suitMeta[suit];
  const group = stageGroup[rank];
  const id = `${meta.symbol}-${rank}`;
  return {
    id,
    suit,
    rank,
    deity,
    dimension: meta.dimension,
    stage: stageMap[rank],
    directive: meta.directive,
    group
  };
}

const deck = [
  // Spades
  createCard("spades", "A", "释迦牟尼佛（成道觉醒相）"),
  createCard("spades", "2", "文昌帝君"),
  createCard("spades", "3", "哪吒（未出手相）"),
  createCard("spades", "4", "玄武大帝"),
  createCard("spades", "5", "雷公"),
  createCard("spades", "6", "关圣帝君"),
  createCard("spades", "7", "真武大帝"),
  createCard("spades", "8", "钟馗"),
  createCard("spades", "9", "城隍爷"),
  createCard("spades", "10", "太上老君"),
  createCard("spades", "J", "文殊菩萨"),
  createCard("spades", "Q", "准提菩萨"),
  createCard("spades", "K", "大日如来"),

  // Hearts
  createCard("hearts", "A", "阿弥陀佛"),
  createCard("hearts", "2", "月老"),
  createCard("hearts", "3", "何仙姑"),
  createCard("hearts", "4", "观音护法相（静观）"),
  createCard("hearts", "5", "狐仙（情执照见相）"),
  createCard("hearts", "6", "妈祖"),
  createCard("hearts", "7", "地藏王菩萨（照苦相）"),
  createCard("hearts", "8", "观音菩萨（应化相）"),
  createCard("hearts", "9", "注生娘娘"),
  createCard("hearts", "10", "太阴星君"),
  createCard("hearts", "J", "普贤菩萨"),
  createCard("hearts", "Q", "观世音菩萨（慈悲正相）"),
  createCard("hearts", "K", "药师佛"),

  // Diamonds
  createCard("diamonds", "A", "毗卢遮那佛"),
  createCard("diamonds", "2", "土地公"),
  createCard("diamonds", "3", "刘海蟾"),
  createCard("diamonds", "4", "四值功曹"),
  createCard("diamonds", "5", "五路财神"),
  createCard("diamonds", "6", "福德正神"),
  createCard("diamonds", "7", "城隍判官"),
  createCard("diamonds", "8", "武财神赵公明"),
  createCard("diamonds", "9", "地母娘娘"),
  createCard("diamonds", "10", "太上老君（炼化物质相）"),
  createCard("diamonds", "J", "虚空藏菩萨"),
  createCard("diamonds", "Q", "摩利支天菩萨"),
  createCard("diamonds", "K", "多宝如来"),

  // Clubs
  createCard("clubs", "A", "燃灯古佛"),
  createCard("clubs", "2", "张果老"),
  createCard("clubs", "3", "蓝采和"),
  createCard("clubs", "4", "吕洞宾"),
  createCard("clubs", "5", "铁拐李"),
  createCard("clubs", "6", "韩湘子"),
  createCard("clubs", "7", "曹国舅"),
  createCard("clubs", "8", "汉钟离"),
  createCard("clubs", "9", "何仙姑（修行成熟相）"),
  createCard("clubs", "10", "王重阳"),
  createCard("clubs", "J", "金刚手菩萨"),
  createCard("clubs", "Q", "弥勒菩萨"),
  createCard("clubs", "K", "金刚萨埵")
];

const layerInfo = [
  {
    title: "第一轮｜表层人生",
    hint: "这是你意识层面已经知道的事情。",
    positions: ["现况", "显性卡点", "表层指引"]
  },
  {
    title: "第二轮｜深层动机",
    hint: "这不是好或坏，这是你为什么会走到这里。",
    positions: ["内在动机", "核心盲点", "真实代价"]
  },
  {
    title: "第三轮｜根层与走向",
    hint: "这一层，不是每个人都准备好。请确认你愿意看见完整的自己。",
    positions: ["灵魂惯性", "人生主权", "下一阶段方向"]
  }
];

let shuffleCount = 0;
let drawn = [];
let currentLayer = 0;
let currentTopics = [];
let currentCrossTriggered = false;
let aiReadings = [];
let aiRequestInFlight = false;
let aiRequested = false;

const questionEl = document.getElementById("question");
const questionError = document.getElementById("question-error");
const validateBtn = document.getElementById("validate");
const stepQuestion = document.getElementById("step-question");
const stepShuffle = document.getElementById("step-shuffle");
const stepLayer = document.getElementById("step-layer");
const stepGrid = document.getElementById("step-grid");
const shuffleArea = document.getElementById("shuffle-area");
const shuffleCountEl = document.getElementById("shuffle-count");
const shuffleTip = document.getElementById("shuffle-tip");
const shuffleDone = document.getElementById("shuffle-done");
const shuffleReset = document.getElementById("shuffle-reset");
const layerTitle = document.getElementById("layer-title");
const layerHint = document.getElementById("layer-hint");
const layerCards = document.getElementById("layer-cards");
const layerNext = document.getElementById("layer-next");
const layerError = document.getElementById("layer-error");
const nineGrid = document.getElementById("nine-grid");
const finalDirective = document.getElementById("final-directive");

const yesNoPatterns = ["吗", "是不是", "是否", "要不要", "会不会", "能不能", "可不可以", "行不行", "好不好", "对不对"];
const predictPatterns = ["会成功", "会失败", "会不会成功", "未来", "结果", "结局", "能不能成"];

function isValidQuestion(text) {
  if (!text || text.trim().length < 6) return "问题太短，请写清楚你卡在哪里。";
  const t = text.trim();
  if (yesNoPatterns.some(p => t.includes(p)) || t.endsWith("?") || t.endsWith("？")) {
    return "请改成非 Yes/No 问题，聚焦“你现在卡在哪里”。";
  }
  if (predictPatterns.some(p => t.includes(p))) {
    return "请避免预测型提问，改为“当前卡点/结构”。";
  }
  return "";
}

function updateShuffle(count) {
  shuffleCount = count;
  shuffleCountEl.textContent = String(shuffleCount);
  shuffleArea.classList.add("active");
  clearTimeout(updateShuffle._t);
  updateShuffle._t = setTimeout(() => shuffleArea.classList.remove("active"), 300);
  if (shuffleCount >= 7) {
    shuffleDone.disabled = false;
  } else {
    shuffleDone.disabled = true;
  }
  if (shuffleCount > 21) {
    shuffleTip.textContent = "执念过重，请停下并重置。";
  } else {
    shuffleTip.textContent = "当你觉得可以了，停下来。";
  }
}

function incrementShuffle() {
  if (shuffleCount >= 21) {
    shuffleTip.textContent = "执念过重，请停下并重置。";
    return;
  }
  updateShuffle(shuffleCount + 1);
}

function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildSummary(card) {
  const meta = suitMeta[card.suit];
  const directive = directiveCn[card.directive];
  return `【${meta.dimension}】${meta.hint} 当前阶段：${card.stage}。行动指令：${directive}。`;
}

function buildInterpretation(card) {
  const meta = suitMeta[card.suit];
  const g = card.group;
  const directive = directiveCn[card.directive];
  const frequency = `频率：${g.freq}。你的意识在「${meta.cn}」维度呈现${g.phase}态。`;
  const energy = `能量：${g.energy}，需要以「${directive}」的方式介入，让${meta.dimension}回到可控轨道。`;
  const destiny = `命运观：${g.destiny}。此牌要求你在${meta.dimension}上做出清晰选择。`;
  return { frequency, energy, destiny };
}

function buildDirectiveLine(card) {
  const directive = directiveCn[card.directive];
  return `指令：${directive}`;
}

function suitColor(card) {
  return card.suit === "hearts" || card.suit === "diamonds" ? "#c62828" : "#111111";
}

function cardFaceSvg(card) {
  const meta = suitMeta[card.suit];
  const color = suitColor(card);
  const rank = card.rank;
  const suit = meta.symbol;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="320" height="460" viewBox="0 0 320 460">
      <rect x="8" y="8" width="304" height="444" rx="18" fill="#f7f3ea" stroke="#d8c8a2" stroke-width="2"/>
      <text x="24" y="44" font-size="26" font-family="KaiTi, STKaiti, serif" fill="${color}">${rank}</text>
      <text x="24" y="76" font-size="28" font-family="KaiTi, STKaiti, serif" fill="${color}">${suit}</text>
      <text x="160" y="250" font-size="140" text-anchor="middle" font-family="KaiTi, STKaiti, serif" fill="${color}">${suit}</text>
      <text x="296" y="430" font-size="26" text-anchor="end" font-family="KaiTi, STKaiti, serif" fill="${color}">${rank}</text>
      <text x="296" y="400" font-size="28" text-anchor="end" font-family="KaiTi, STKaiti, serif" fill="${color}">${suit}</text>
    </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function detectTopics(question) {
  const q = (question || "").trim();
  if (!q) return [];
  currentCrossTriggered = crossTopicTriggers.some((k) => q.includes(k));
  const hits = [];
  topicLex.forEach((t) => {
    if (t.keywords.some((k) => q.includes(k))) hits.push(t);
  });
  return hits;
}

function buildContext(card, topics, crossTriggered) {
  const meta = suitMeta[card.suit];
  if (!topics.length) {
    return crossTriggered
      ? "问题未归类，但能量强度高，通常牵动多个维度。"
      : "问题未归类，按整体状态解读即可。";
  }
  const primary = topics[0];
  const topicLabel = primary.label;
  const suitMatch = (
    (primary.id === "relationship" && card.suit === "hearts") ||
    (primary.id === "family" && card.suit === "hearts") ||
    (primary.id === "career" && card.suit === "clubs") ||
    (primary.id === "money" && card.suit === "diamonds") ||
    (primary.id === "health" && card.suit === "diamonds") ||
    (primary.id === "self" && card.suit === "spades")
  );
  if (suitMatch) {
    return crossTriggered
      ? `与你的问题「${topicLabel}」高度相关：此牌直接指向该领域的核心卡点。当前处于高压状态，建议同步留意其它维度牵动。`
      : `与你的问题「${topicLabel}」高度相关：此牌直接指向该领域的核心卡点。`;
  }
  return crossTriggered
    ? `你问的是「${topicLabel}」，但牌落在「${meta.cn}」维度，提示该问题被${meta.dimension}所牵动。当前处于高压状态，建议同步留意其它维度牵动。`
    : `你问的是「${topicLabel}」，但牌落在「${meta.cn}」维度，提示该问题被${meta.dimension}所牵动。`;
}

function renderLayer() {
  layerCards.innerHTML = "";
  const info = layerInfo[currentLayer];
  layerTitle.textContent = info.title;
  layerHint.textContent = info.hint;

  const start = currentLayer * 3;
  const cards = drawn.slice(start, start + 3);
  cards.forEach((card, idx) => {
    const meta = suitMeta[card.suit];
    const suitClass = `suit-${card.suit}`;
    const div = document.createElement("div");
    div.className = "card reveal";
    const interp = buildInterpretation(card);
    const ctx = buildContext(card, currentTopics, currentCrossTriggered);
    const art = cardFaceSvg(card);
    div.innerHTML = `
      <div class="card-holder draw" style="--delay:${idx * 80}ms">
        <div class="card-3d" role="button" aria-label="翻开卡牌">
          <div class="card-side back">
            <div class="back-mark">元像</div>
          </div>
          <div class="card-side front ${suitClass}">
            <img class="card-art" src="${art}" alt="${meta.symbol} ${card.rank}" />
          </div>
        </div>
      </div>
      <div class="card-body">
        <details class="more">
          <summary>展开解读</summary>
          <div class="section">
            <div class="section-title">当前定位</div>
            <div class="section-body">
              <div class="pos">${info.positions[idx]}</div>
              <div class="name">${meta.symbol} ${card.rank} · ${card.deity}</div>
              <div class="kv"><div class="k">关联</div><div class="v">${ctx}</div></div>
              <div class="kv"><div class="k">频率</div><div class="v">${interp.frequency.replace("频率：", "")}</div></div>
              <div class="kv"><div class="k">指令</div><div class="v">${buildDirectiveLine(card).replace("指令：", "")}</div></div>
            </div>
          </div>

          <div class="section ai-block" data-index="${start + idx}">
            <div class="section-title">AI 解读（短 / 中 / 深）</div>
            <div class="section-body">
              <div class="ai-text">点击展开后生成</div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">系统深层</div>
            <div class="section-body">
              <div class="meta">${meta.cn}｜${card.stage}</div>
              <div class="summary">${buildSummary(card)}</div>
              <div class="summary">${interp.energy}</div>
              <div class="summary">${interp.destiny}</div>
            </div>
          </div>
        </details>
      </div>
    `;
    layerCards.appendChild(div);
  });

  attachFlipHandlers(layerCards);
  attachDetailsHandlers(layerCards);

  if (currentLayer === 0) {
    layerNext.textContent = "继续深入";
  } else if (currentLayer === 1) {
    layerNext.textContent = "进入根层";
  } else {
    layerNext.textContent = "查看九宫整合";
  }
}

function renderGrid() {
  nineGrid.innerHTML = "";
  drawn.forEach((card, idx) => {
    const meta = suitMeta[card.suit];
    const suitClass = `suit-${card.suit}`;
    const div = document.createElement("div");
    const axis = [1, 4, 7].includes(idx);
    div.className = axis ? "card axis reveal small" : "card reveal small";
    const interp = buildInterpretation(card);
    const ctx = buildContext(card, currentTopics, currentCrossTriggered);
    const art = cardFaceSvg(card);
    div.innerHTML = `
      <div class="card-holder draw" style="--delay:${idx * 60}ms">
        <div class="card-3d" role="button" aria-label="翻开卡牌">
          <div class="card-side back">
            <div class="back-mark">元像</div>
          </div>
          <div class="card-side front ${suitClass}">
            <img class="card-art" src="${art}" alt="${meta.symbol} ${card.rank}" />
          </div>
        </div>
      </div>
      <div class="card-body">
        <details class="more">
          <summary>展开解读</summary>
          <div class="section">
            <div class="section-title">当前定位</div>
            <div class="section-body">
              <div class="pos">${Math.floor(idx / 3) + 1}-${(idx % 3) + 1}</div>
              <div class="name">${meta.symbol} ${card.rank} · ${card.deity}</div>
              <div class="kv"><div class="k">关联</div><div class="v">${ctx}</div></div>
              <div class="kv"><div class="k">频率</div><div class="v">${interp.frequency.replace("频率：", "")}</div></div>
              <div class="kv"><div class="k">指令</div><div class="v">${buildDirectiveLine(card).replace("指令：", "")}</div></div>
            </div>
          </div>

          <div class="section ai-block" data-index="${idx}">
            <div class="section-title">AI 解读（短 / 中 / 深）</div>
            <div class="section-body">
              <div class="ai-text">点击展开后生成</div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">系统深层</div>
            <div class="section-body">
              <div class="meta">${meta.cn}｜${card.stage}</div>
              <div class="summary">${buildSummary(card)}</div>
              <div class="summary">${interp.energy}</div>
              <div class="summary">${interp.destiny}</div>
            </div>
          </div>
        </details>
      </div>
    `;
    nineGrid.appendChild(div);
  });

  attachFlipHandlers(nineGrid);
  attachDetailsHandlers(nineGrid);

  const last = drawn[8];
  const directive = directiveCn[last.directive];
  finalDirective.textContent = `最终行动指令：${directive}（取自 3-3）`;
}

function attachFlipHandlers(container) {
  const cards = container.querySelectorAll(".card-3d");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
    });
  });
}

function attachDetailsHandlers(container) {
  const details = container.querySelectorAll("details.more");
  details.forEach((d) => {
    d.addEventListener("toggle", () => {
      if (d.open && !aiRequested) {
        aiRequested = true;
        requestAIReadings(questionEl.value);
      }
    });
  });
}

function getPositionLabel(index) {
  const layer = Math.floor(index / 3);
  const pos = index % 3;
  return layerInfo[layer].positions[pos];
}

async function requestAIReadings(question) {
  if (aiRequestInFlight) return;
  aiRequestInFlight = true;
  try {
    document.querySelectorAll(".ai-text").forEach((el) => {
      el.textContent = "生成中...";
      el.classList.add("ai-loading");
    });
    const payload = {
      question,
      cards: drawn.map((card, index) => ({
        index,
        position: getPositionLabel(index),
        suit: card.suit,
        rank: card.rank,
        deity: card.deity,
        dimension: card.dimension,
        stage: card.stage,
        directive: card.directive
      }))
    };
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error("AI 生成失败");
    const data = await res.json();
    aiReadings = data.cards || [];
    hydrateAIBlocks();
  } catch (e) {
    document.querySelectorAll(".ai-text").forEach((el) => {
      el.textContent = "AI 生成失败，可稍后再试。";
      el.classList.remove("ai-loading");
    });
  } finally {
    aiRequestInFlight = false;
  }
}

function hydrateAIBlocks() {
  document.querySelectorAll(".ai-block").forEach((block) => {
    const idx = Number(block.getAttribute("data-index"));
    const item = aiReadings.find((r) => r.index === idx);
    const textEl = block.querySelector(".ai-text");
    if (!item || !textEl) return;
    textEl.classList.remove("ai-loading");
    textEl.innerHTML = `
      <div><strong>短：</strong>${item.short}</div>
      <div><strong>中：</strong>${item.medium}</div>
      <div><strong>深：</strong>${item.long}</div>
    `;
  });
}

validateBtn.addEventListener("click", () => {
  const err = isValidQuestion(questionEl.value);
  questionError.textContent = err;
  if (err) return;
  currentTopics = detectTopics(questionEl.value);
  stepQuestion.classList.add("hidden");
  stepShuffle.classList.remove("hidden");
});

shuffleReset.addEventListener("click", () => {
  updateShuffle(0);
});

shuffleDone.addEventListener("click", () => {
  if (shuffleCount < 7) return;
  const deckShuffled = shuffleArray(deck);
  drawn = deckShuffled.slice(0, 9);
  currentLayer = 0;
  aiReadings = [];
  aiRequested = false;
  shuffleArea.classList.remove("active");
  stepShuffle.classList.add("hidden");
  stepLayer.classList.remove("hidden");
  renderLayer();
});

let lastMove = 0;
shuffleArea.addEventListener("pointerdown", (e) => {
  incrementShuffle();
  shuffleArea.setPointerCapture(e.pointerId);
});

shuffleArea.addEventListener("pointermove", (e) => {
  if (e.pressure === 0) return;
  const now = Date.now();
  if (now - lastMove > 120) {
    incrementShuffle();
    lastMove = now;
  }
});

layerNext.addEventListener("click", () => {
  layerError.textContent = "";
  if (currentLayer === 0) {
    const ok = window.confirm("如果你准备好，我们将进入你不一定愿意面对的部分。");
    if (!ok) return;
  }
  if (currentLayer === 1) {
    const ok = window.confirm("这一层，不是每个人都准备好。请确认你愿意看见完整的自己。");
    if (!ok) return;
  }
  if (currentLayer === 2) {
    stepLayer.classList.add("hidden");
    stepGrid.classList.remove("hidden");
    renderGrid();
    return;
  }
  currentLayer += 1;
  renderLayer();
});

updateShuffle(0);
