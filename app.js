const lessons = [
  {
    term: "Model", level: "LEVEL 1",
    summary: "入力された情報から、次に続く出力を生成するAI本体。",
    diagram: "あなたの入力\n↓\nModel\n↓\n回答・コード",
    example: "GPT系モデルやClaude系モデル。Codexそのものとは分けて考える。",
    why: "『モデルが賢い』ことと『開発エージェントとして使いやすい』ことを分離して考えられる。",
    q: "Modelに最も近いものは？", choices: ["GPT系モデル", "Unity Editor", "MCP Server"], answer: 0,
    feedback: "Modelは推論を行うAI本体です。"
  },
  {
    term: "Token", level: "LEVEL 1",
    summary: "モデルが文章やコードを処理するときの細かな単位。",
    diagram: "文章・コード\n↓ 分割\nToken Token Token\n↓\nModel",
    example: "長い仕様書や大量のコードほど、多くのTokenを使う。",
    why: "Context量・料金・速度・長文性能を考える共通単位になる。",
    q: "Tokenが増えやすいのは？", choices: ["長いコードを大量に読む", "画面を暗くする", "PCの音量を下げる"], answer: 0,
    feedback: "読み込む文章・コード量が増えるほどTokenも増えます。"
  },
  {
    term: "Context", level: "LEVEL 1",
    summary: "モデルが今この瞬間に参照できる情報の集合。",
    diagram: "会話\n+ AGENTS.md\n+ 読んだコード\n+ Tool結果\n↓\nContext",
    example: "Codexが読んだ仕様書、ファイル、コマンド結果など。",
    why: "必要情報がContextに無いと、モデルが賢くても正しく判断できない。",
    q: "Contextに含まれうるものは？", choices: ["読んだ仕様書", "PCケースの色", "部屋の湿度"], answer: 0,
    feedback: "モデルに渡された情報はContextの一部になります。"
  },
  {
    term: "Harness", level: "LEVEL 2",
    summary: "モデルを実際に働くエージェントにする外側の仕組み。",
    diagram: "Model\n↕\nHarness\n↙   ↓   ↘\nFiles Shell MCP",
    example: "CodexやClaude Codeのように、モデルへToolや作業ループを提供する層。",
    why: "同じModelでもHarnessが違えば、操作性・安全性・成功率が変わる。",
    q: "Harnessの役割として近いものは？", choices: ["モデルにToolを使わせる", "GPUを冷却する", "画像を圧縮する"], answer: 0,
    feedback: "HarnessはModelと各種Toolの橋渡しをします。"
  },
  {
    term: "Agent", level: "LEVEL 2",
    summary: "考える→Toolを使う→結果を見る→また考える、を繰り返して目的を達成する仕組み。",
    diagram: "Think\n↓\nTool\n↓\nObserve\n↓\nThink…",
    example: "ファイルを読み、コードを書き、テストし、失敗したら直すCodex。",
    why: "単発回答AIと、自律的に作業を進めるAIの違いが理解できる。",
    q: "Agentらしい動きは？", choices: ["調査→編集→テスト→修正", "1回だけ文章を返す", "画面を表示するだけ"], answer: 0,
    feedback: "Agentは複数ステップで環境へ働きかけます。"
  },
  {
    term: "Tool", level: "LEVEL 2",
    summary: "Agentが外部世界へ働きかけるために使う機能。",
    diagram: "Agent\n↓ Tool call\nFile / Shell / Search / MCP",
    example: "ファイル読み書き、Shell、Web検索、Unity操作。",
    why: "Model単体ではできない操作をAgentへ追加できる。",
    q: "Toolの例として正しいものは？", choices: ["Shellコマンド実行", "Modelの重み", "Tokenそのもの"], answer: 0,
    feedback: "Toolは外部操作のための機能です。"
  },
  {
    term: "MCP", level: "LEVEL 3",
    summary: "AIと外部ツールやデータを接続しやすくする共通プロトコル。",
    diagram: "Agent\n↓\nMCP Client\n↓\nMCP Server\n↓\n外部アプリ",
    example: "AIからLive2Dや各種サービスを操作するための接続層。",
    why: "ツールごとに専用接続を作る負担を減らし、再利用しやすくする。",
    q: "MCPに最も近い説明は？", choices: ["AIと外部機能をつなぐ規格", "AIモデルそのもの", "ゲームエンジン"], answer: 0,
    feedback: "MCPは接続方法を標準化するための仕組みです。"
  },
  {
    term: "Skill", level: "LEVEL 3",
    summary: "特定作業をうまく行うための手順・知識を、必要なときに読み込む仕組み。",
    diagram: "Task\n↓\n必要なSkillを読む\n↓\n詳細手順をContextへ",
    example: "Unity操作時だけUnity用Skillを読む。",
    why: "大量の手順を常時Contextへ入れず、必要な知識だけ追加できる。",
    q: "Skillの利点は？", choices: ["必要な手順だけ後から読み込める", "モデルを再学習できる", "GPUメモリが増える"], answer: 0,
    feedback: "Skillは必要な作業知識を必要な時だけContextへ追加します。"
  }
];

const STORAGE_KEY = "ai-coding-learn-progress-v1";
let state = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || { index: 0, completed: [] };
state.index = Math.min(state.index, lessons.length - 1);

const $ = (id) => document.getElementById(id);
const lessonView = $("lessonView");
const quizView = $("quizView");

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function renderProgress() {
  const done = state.completed.length;
  $("progressText").textContent = `${done} / ${lessons.length}`;
  $("progressBar").style.width = `${(done / lessons.length) * 100}%`;
  $("streakBadge").textContent = done === lessons.length ? "COMPLETE" : done > 0 ? "LEARNING" : "START";
  $("progressHint").textContent = done === lessons.length ? "試作版の8概念を完了しました。" : `次は ${lessons[state.index].term}。`;
}

function renderMap() {
  const map = $("conceptMap");
  map.innerHTML = "";
  lessons.forEach((lesson, i) => {
    const node = document.createElement("div");
    node.className = "concept-node";
    if (state.completed.includes(i)) node.classList.add("done");
    if (i === state.index && !state.completed.includes(i)) node.classList.add("current");
    node.textContent = lesson.term;
    map.appendChild(node);
  });
}

function renderLesson() {
  const l = lessons[state.index];
  $("lessonStep").textContent = `${state.index + 1} / ${lessons.length}`;
  $("lessonLevel").textContent = l.level;
  $("lessonTerm").textContent = l.term;
  $("lessonSummary").textContent = l.summary;
  $("lessonDiagram").textContent = l.diagram;
  $("lessonExample").textContent = l.example;
  $("lessonWhy").textContent = l.why;
  lessonView.classList.remove("hidden");
  quizView.classList.add("hidden");
  renderProgress();
  renderMap();
}

function showQuiz() {
  const l = lessons[state.index];
  $("quizTerm").textContent = l.term;
  $("quizQuestion").textContent = l.q;
  $("quizFeedback").textContent = "";
  $("quizFeedback").className = "feedback";
  $("nextBtn").classList.add("hidden");
  const box = $("quizChoices");
  box.innerHTML = "";
  l.choices.forEach((choice, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "choice-button";
    btn.textContent = `${String.fromCharCode(65 + idx)}. ${choice}`;
    btn.addEventListener("click", () => answerQuiz(idx));
    box.appendChild(btn);
  });
  lessonView.classList.add("hidden");
  quizView.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function answerQuiz(selected) {
  const l = lessons[state.index];
  [...$("quizChoices").children].forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === l.answer) btn.classList.add("correct");
    if (idx === selected && selected !== l.answer) btn.classList.add("wrong");
  });
  const ok = selected === l.answer;
  $("quizFeedback").textContent = ok ? `正解。${l.feedback}` : `不正解。${l.feedback}`;
  $("quizFeedback").className = `feedback ${ok ? "good" : "bad"}`;
  $("nextBtn").classList.remove("hidden");
  if (ok && !state.completed.includes(state.index)) {
    state.completed.push(state.index);
    save();
    renderProgress();
    renderMap();
  }
}

function nextLesson() {
  if (state.index < lessons.length - 1) {
    state.index += 1;
  } else {
    state.index = 0;
  }
  save();
  renderLesson();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

$("quizBtn").addEventListener("click", showQuiz);
$("nextBtn").addEventListener("click", nextLesson);
$("resetBtn").addEventListener("click", () => {
  if (!confirm("学習進捗をリセットしますか？")) return;
  state = { index: 0, completed: [] };
  save();
  renderLesson();
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js"));
}

renderLesson();
