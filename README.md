# ShareHub Web

GitHub Pages를 통한 Obsidian 노트 공유 웹 인터페이스

## 기능

- **Headless Tailwind**: 기본 유틸리티만 사용, 사용자가 CSS로 쉽게 커스터마이즈
- **목업 데이터 기반 UI**: `src/data/config.js`에서 UI 구조와 스타일 제어
- **해시 기반 라우팅**: 깃헙 페이지 호스팅에 최적화
- **MOC 지원**: Map of Content 파일 기반 대시보드
- **Obsidian 링크 변환**: `[[note]]` → 클릭 가능한 내부 링크
- **이미지 처리**: `![[image]]` → GitHub Raw URL로 변환 (접두사 규칙 사용)

## 프로젝트 구조

```
sharehub-web/
├── src/
│   ├── data/
│   │   └── config.js              ← UI/스타일 설정 (목업 데이터)
│   ├── styles/
│   │   └── custom.css             ← 사용자 커스터마이즈 CSS
│   ├── components/
│   │   ├── sidebar.js
│   │   └── header.js
│   ├── pages/
│   │   ├── dashboard.js           ← Home MOC 대시보드
│   │   ├── note-viewer.js         ← 노트 뷰어
│   │   └── not-found.js           ← 404 페이지
│   ├── services/
│   │   ├── github.js              ← GitHub Raw URL 로드
│   │   └── renderer.js            ← 마크다운 렌더링
│   ├── router/
│   │   └── router.js              ← Navaid 라우터
│   ├── app.js                     ← 메인 앱
│   └── main.js                    ← 진입점
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## 사용법

### 1. GitHub 설정 수정

`src/data/config.js`에서 GitHub 저장소 정보를 수정:

```javascript
github: {
  owner: 'your-username',
  repo: 'your-repo',
  branch: 'main',
  homeMoc: '_home.md'
}
```

### 2. UI 커스터마이즈

#### 사이드바 설정
```javascript
sidebar: {
  show: true,                    // 사이드바 표시
  width: '280px',                // 너비
  title: 'ShareHub',              // 제목
  navigation: [                  // 네비게이션 아이템
    {
      id: 'home',
      label: 'Home',
      icon: 'home',
      path: '#/'
    }
  ]
}
```

#### 스타일 오버라이드
`src/styles/custom.css`에서 CSS 변수 수정:

```css
.sidebar {
  --sidebar-bg: #ffffff;        /* 배경색 */
  --sidebar-text: #1f2937;       /* 텍스트 색상 */
}
```

### 3. 빌드

```bash
npm install
npm run build
```

### 4. 배포

`dist/` 폴더 내용을 GitHub 저장소 루트에 푸시

## 라우팅 구조

```
#/                    → Home MOC
#/_moc-tech.md        → 하위 MOC
#/note.md            ← 일반 노트
#/404                ← 404 페이지
```

## Obsidian 링크 처리

### 노트 링크
```
[[note]] → <a href="#/note.md" class="internal-link">note</a>
```

### 이미지 링크
```
![[image.png]] → <img src=".../raw.githubusercontent.com/.../_image_image.png" />
```

이미지는 `_image_` 접두사를 자동으로 추가합니다 (플러그인에서 업로드 시).

## 기술 스택

- **Vite**: 빌드 도구
- **Tailwind CSS**: 스타일링 (Headless)
- **Navaid**: 경량 해시 라우터
- **marked.js**: 마크다운 → HTML
- **highlight.js**: 코드 하이라이팅

## 브라우저 지원

- Chrome/Edge (최신)
- Firefox (최신)
- Safari (최신)