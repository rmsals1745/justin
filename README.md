# MBC+ 상담문의 랜딩페이지

구글 폼과 연동되는 모던한 랜딩페이지입니다.

## 🎨 특징

- 반응형 디자인 (모바일, 태블릿, 데스크톱 지원)
- 파란색 그라디언트 테마
- 부드러운 애니메이션 효과
- 구글 폼 연동 지원
- 전화번호 자동 포맷팅 (010-1234-5678)

## 📋 구글 폼 연동 방법

### 1단계: 구글 폼 만들기

1. [Google Forms](https://forms.google.com)에 접속
2. 새 폼 만들기
3. 다음 질문들을 추가:
   - 이름 (단답형)
   - 이메일 (단답형)
   - 전화번호 (단답형)
   - 문의 사항 (장문형) - 선택사항

### 2단계: 폼 URL 가져오기

1. 구글 폼 상단의 "보내기" 버튼 클릭
2. 링크 탭 선택
3. URL 복사
4. URL 형식을 다음과 같이 변경:
   ```
   원본: https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform
   변경: https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse
   ```

### 3단계: Entry ID 찾기

1. 구글 폼 미리보기 열기
2. F12를 눌러 개발자 도구 열기
3. 각 입력 필드를 우클릭 → "검사"
4. `name="entry.xxxxxxxxx"` 형식의 값 확인
5. 각 필드의 entry ID를 메모

### 4단계: script.js 파일 수정

`script.js` 파일을 열고 다음 부분을 수정하세요:

```javascript
// 1. 구글 폼 URL 업데이트
const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse';

// 2. Entry ID 업데이트
const FORM_FIELDS = {
    name: 'entry.1234567890',    // 이름 필드의 entry ID
    email: 'entry.0987654321',   // 이메일 필드의 entry ID
    phone: 'entry.1111111111',   // 전화번호 필드의 entry ID
    message: 'entry.2222222222'  // 문의사항 필드의 entry ID
};
```

## 🚀 사용 방법

1. 웹 서버에 파일 업로드 또는 로컬에서 실행
2. `index.html` 파일을 브라우저로 열기
3. 구글 폼 연동 완료!

## 📁 파일 구조

```
.
├── index.html      # 메인 HTML 파일
├── styles.css      # 스타일시트
├── script.js       # JavaScript 로직
└── README.md       # 이 파일
```

## 🎯 커스터마이징

### 색상 변경
`styles.css` 파일에서 다음 부분을 수정:
- 메인 그라디언트: `.hero` 섹션의 `background`
- 버튼 색상: `.cta-button`, `.submit-button`

### 내용 수정
`index.html` 파일에서:
- 서비스 설명 변경
- 기능 카드 내용 수정
- 연락처 정보 추가

## 📱 브라우저 지원

- Chrome (최신)
- Firefox (최신)
- Safari (최신)
- Edge (최신)

## 💡 팁

- 구글 폼은 CORS 정책으로 인해 `no-cors` 모드로 제출됩니다
- 제출 성공 여부는 구글 폼의 응답 페이지에서 확인하세요
- 로컬 테스트 시에는 구글 폼 URL 없이도 작동합니다 (콘솔에 데이터 출력)

## 📞 문의

문제가 있거나 도움이 필요하시면 언제든지 연락주세요!
