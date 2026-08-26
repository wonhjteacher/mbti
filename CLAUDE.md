# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트

**MBTI 공부법 연구소** — 여러 개의 HTML 페이지로 구성된 콘텐츠 사이트.

## 디자인

IBM.com(Carbon 디자인 시스템) 스타일을 따른다.

- 흰색 배경(#ffffff) + 연회색 보조 배경(#f4f4f4) + IBM 블루(#0f62fe) 포인트 컬러
- 텍스트: 진회색 #161616, 보조 텍스트 #525252, 구분선·보더 #e0e0e0
- IBM Plex Sans KR 폰트 (Google Fonts CDN)
- 직각 모서리(border-radius 0), 그림자 대신 1px 보더의 타일형 카드
- 큰 제목은 가벼운 굵기(300~400), 왼쪽 정렬 위주, 링크·버튼에 화살표(→) 사용
- 이모지 대신 라인 스타일 SVG 픽토그램(1.5px stroke, currentColor)을 장식 요소로 사용
- 다크/라이트 모드 지원: 상단 네비의 해/달 아이콘 토글, `html[data-theme]` + CSS 변수로 구현, localStorage에 저장
- 모바일 반응형

## 규칙

- 서버·API·키는 절대 사용하지 않는다. 정적 파일(HTML/CSS/JS)만 사용한다.
- 파일이 300줄을 넘으면 코드를 작성하기 전에 파일 분리를 먼저 제안한다.
