// ==========================================================
// MBTI 공부법 연구소 — 다크/라이트 모드 전환
// <head>에서 로드해 저장된 테마를 즉시 적용(깜빡임 방지)하고,
// DOM이 준비되면 상단 토글 버튼을 연결한다.
// ==========================================================

(function () {
  const saved = localStorage.getItem("theme");
  const system = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  const theme = saved || system;
  document.documentElement.setAttribute("data-theme", theme);

  // 해/달 아이콘 표시는 CSS(html[data-theme])가 담당하므로
  // JS는 속성 토글과 저장만 한다
  function bind() {
    const btn = document.getElementById("themeToggle");
    if (!btn) return;
    btn.addEventListener("click", function () {
      const next =
        document.documentElement.getAttribute("data-theme") === "dark"
          ? "light"
          : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }

  // head에서 로드되므로 보통은 DOMContentLoaded를 기다리지만,
  // 이미 파싱이 끝난 상태라면 즉시 바인딩한다
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bind);
  } else {
    bind();
  }
})();
