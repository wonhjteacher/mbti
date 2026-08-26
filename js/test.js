// ==========================================================
// MBTI 공부법 연구소 — 자가진단 로직
// 보기(value=nt|nf|sj|sp)를 합산해 최고 점수 그룹을 판정한다.
// 동점이면 먼저 응답한 문항의 그룹을 우선한다.
// ==========================================================

const GROUPS = {
  nt: {
    name: "NT 분석형",
    page: "nt.html",
    desc: "원리를 이해해야 움직이는 두뇌파! 개념의 구조가 잡히면 폭발적으로 성장하는 타입이에요. 분석력을 살린 전략적 공부법이 잘 맞습니다.",
  },
  nf: {
    name: "NF 이상형",
    page: "nf.html",
    desc: "의미가 생기면 몰입하는 공감파! 공부가 꿈·사람·이야기와 연결될 때 놀라운 집중력을 보여주는 타입이에요. 마음을 움직이는 공부법이 잘 맞습니다.",
  },
  sj: {
    name: "SJ 관리형",
    page: "sj.html",
    desc: "계획대로 쌓아 올리는 성실파! 루틴과 체계 속에서 꾸준함이 곧 실력이 되는 타입이에요. 계획표와 반복 복습 공부법이 잘 맞습니다.",
  },
  sp: {
    name: "SP 탐험형",
    page: "sp.html",
    desc: "해보면서 배우는 실전파! 짧은 미션과 즉각적인 피드백에서 게임처럼 몰입하는 타입이에요. 문제 중심의 실전형 공부법이 잘 맞습니다.",
  },
};

const TOTAL_QUESTIONS = 10;
const form = document.getElementById("quiz");
const submitBtn = document.getElementById("submitBtn");
const progress = document.getElementById("progress");

function getAnswers() {
  // 문항 순서(q1→q10)대로 응답값을 모은다 — 동점 판정에 이 순서를 쓴다.
  const answers = [];
  for (let i = 1; i <= TOTAL_QUESTIONS; i++) {
    const checked = form.querySelector(`input[name="q${i}"]:checked`);
    if (checked) answers.push(checked.value);
  }
  return answers;
}

form.addEventListener("change", () => {
  const count = getAnswers().length;
  progress.textContent = `${count} / ${TOTAL_QUESTIONS} 문항 응답`;
  submitBtn.disabled = count < TOTAL_QUESTIONS;
  if (count < TOTAL_QUESTIONS) {
    progress.textContent += " — 모든 문항에 답하면 결과를 볼 수 있어요";
  }
});

submitBtn.addEventListener("click", () => {
  const answers = getAnswers();
  if (answers.length < TOTAL_QUESTIONS) return;

  const scores = { nt: 0, nf: 0, sj: 0, sp: 0 };
  answers.forEach((g) => scores[g]++);

  const max = Math.max(...Object.values(scores));
  // 동점이면 응답 순서에서 먼저 등장한 그룹이 승자
  const winner = answers.find((g) => scores[g] === max);

  showResult(winner, scores);
});

function showResult(winner, scores) {
  const group = GROUPS[winner];
  document.getElementById("resultName").textContent = group.name;
  document.getElementById("resultDesc").textContent = group.desc;
  document.getElementById("resultLink").href = group.page;
  // 화살표는 .btn::after가 그리므로 텍스트에는 넣지 않는다
  document.getElementById("resultLink").textContent = `${group.name} 공부법 보러 가기`;

  const bars = document.getElementById("scoreBars");
  bars.innerHTML = "";
  ["nt", "nf", "sj", "sp"].forEach((key) => {
    const row = document.createElement("div");
    row.className = "bar-row";
    row.innerHTML =
      `<span>${key.toUpperCase()}</span>` +
      `<div class="track"><div class="fill" style="width:0%"></div></div>` +
      `<span>${scores[key]}점</span>`;
    bars.appendChild(row);
  });

  const result = document.getElementById("result");
  result.classList.add("show");
  result.scrollIntoView({ behavior: "smooth" });

  // 표시 직후 너비를 채워 막대가 차오르는 애니메이션 효과
  requestAnimationFrame(() => {
    bars.querySelectorAll(".fill").forEach((fill, i) => {
      const key = ["nt", "nf", "sj", "sp"][i];
      fill.style.width = `${(scores[key] / TOTAL_QUESTIONS) * 100}%`;
    });
  });
}

// ---------- 공유 ----------
document.getElementById("shareBtn").addEventListener("click", async () => {
  const groupName = document.getElementById("resultName").textContent;
  const notice = document.getElementById("shareNotice");
  const shareData = {
    title: "MBTI 공부법 연구소",
    text: `나의 공부 기질은 ${groupName}! 너도 10문항으로 확인해 봐`,
    url: location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
      notice.textContent = "링크가 복사되었어요! 친구에게 붙여넣기 해 주세요.";
    }
  } catch (err) {
    if (err.name !== "AbortError") {
      notice.textContent = "공유에 실패했어요. 주소창의 링크를 직접 복사해 주세요.";
    }
  }
});
