# My Routine

## 소개

사용자가 일상에서 반복되는 루틴을 관리하고, 설정한 시간에 따라 음성으로 머릿말을 알려주는 기능을 제공합니다.  

**배포 사이트**: [my routine](https://routine-next-js-git-main-yenniej.vercel.app/)

## 기술 스택

- Next.js 14 (App Router)
- NextUI (Tailwind CSS)
- TypeScript
- Firebase의 Auth를 통해 로그인 및 회원가입 기능을 제공하며, Firestore를 이용해 사용자 데이터를 관리합니다.


## 기능

| 로그인 | 회원가입 |
|------|------|
| <img width="702" alt="1 로그인" src="https://github.com/YennieJ/routine_next.js/assets/108519185/3a3687ab-b2dc-4e48-b1c8-a243360d665d"> |<img width="702" alt="2 회원가입" src="https://github.com/YennieJ/routine_next.js/assets/108519185/b9cf4fec-ae77-4045-91ee-921ee508c993">|

| 루틴관리  | 루틴관리 |
|------|------|
|<img width="702" alt="3  루틴관리" src="https://github.com/YennieJ/routine_next.js/assets/108519185/d3e070d3-0ccf-434f-ac0f-e38551b8e1c7"> | <img width="702" alt="3-1  루틴관리" src="https://github.com/YennieJ/routine_next.js/assets/108519185/9c5ca86f-9246-4f64-9043-c699786099aa"> |

| 머릿말 추가 | 머릿말 수정 | 머릿말 삭제 |
|------|------|------|
| <img width="702" alt="4  머릿말 추가" src="https://github.com/YennieJ/routine_next.js/assets/108519185/c5e6957f-49b8-4fcc-8d90-19847b4e21a2"> | <img width="702" alt="5  머릿말 수정" src="https://github.com/YennieJ/routine_next.js/assets/108519185/6879b239-bddd-49dc-88c0-ded38ad31d53"> | <img width="702" alt="6  머릿말 삭제" src="https://github.com/YennieJ/routine_next.js/assets/108519185/4a0fb4e5-53d1-4215-ad75-5275b9acf785"> |

| 루틴 추가 | 루틴 상세 | 루틴 수정 | 루틴 삭제 |
|------|------|------|------|
| <img width="702" alt="7  루틴 추가" src="https://github.com/YennieJ/routine_next.js/assets/108519185/1ec2974d-fd7e-400b-99bf-9ac31987ef4b"> | <img width="702" alt="8  루틴 상세" src="https://github.com/YennieJ/routine_next.js/assets/108519185/3d8c8e34-7faa-4a40-b58a-41f95fd05565"> | <img width="702" alt="9  루틴 수정" src="https://github.com/YennieJ/routine_next.js/assets/108519185/87318ef3-3b55-4cfe-a4bb-faf93a447a04"> | <img width="702" alt="10  루틴 삭제" src="https://github.com/YennieJ/routine_next.js/assets/108519185/75f02455-3a1f-4569-a70f-f89cc899b432"> |

| 다크모드  | 로그아웃 |
|------|------|
|<img width="702" alt="다크모드" src="https://github.com/YennieJ/routine_next.js/assets/108519185/e82512e9-4ac4-4d4f-9bc1-54b646d99e7f"> | <img width="702" alt="로그아웃" src="https://github.com/YennieJ/routine_next.js/assets/108519185/ebdceefb-49ce-4013-9307-916dc78688c1"> |
 

## 트러블슈팅: speechSynthesis.speak() 사용자 활성화 문제

### 문제 상황
`speechSynthesis.speak()` 함수를 사용하여 예정된 시간에 맞춰 머릿말을 음성으로 변환하려고 할 때, "speechSynthesis.speak() without user activation is deprecated and will be removed."라는 에러가 발생했습니다. 이 문제는 웹 표준이 사용자의 명시적 동작 없이 자동으로 음성을 재생하는 것을 제한하여 발생합니다. 사용자의 음성 안내 동의를 'localStorage' 통해 저장하고 useEffect로 상태를 변경하여도, 웹 애플리케이션에 포커스가 없는 상태일 경우 여전히 동일한 에러가 발생했습니다.

### 개선
이 문제를 해결하기 위해, 음성 안내 기능을사용자의 명시적인 인터랙션(speech 버튼)에 의존하도록 추가했습니다. 이는 브라우저의 사용자 활성화 정책을 준수하고 사용자가 음성 안내를 시작할 때 직접 액션을 취하도록 유도하는 방식입니다. 이렇게 함으로써, 사용자가 명시적으로 음성 안내 기능을 활성화할 수 있게 되었습니다.

### 결론
포커스가 있는 상태에서는 예정된 시간에 음성 출력이 잘 이루어지지만, 포커스가 없는 상태에서는 원하는 기능을 완벽하게 구현하는 데 제약이 있었습니다. 이 과정을 통해, 웹 표준이 사용자 경험을 보호하기 위해 설정한 방어 메커니즘을 이해할 수 있었으며, 사용자 인터랙션을 요구하는 기능의 접근성을 개선하는 방법에 대해 깊이 고민해볼 수 있는 유익한 경험이었습니다.

## 프로젝트를 통해 배운 점

### Next.js의 장점

- **SSR (서버 사이드 렌더링)**: Next.js의 서버 사이드 렌더링 기능은 사용자에게 더욱 빠른 페이지 로딩 시간을 제공하며, 검색 엔진 최적화(SEO) 성능을 향상시킵니다. 비록 Firebase를 사용하여 토큰 기반 데이터 조회를 수행함으로써 SSR의 장점이 완전히 극대화되지는 않지만, 초기 페이지 로딩 속도는 여전히 빠르며, 스켈레톤 로딩 기법을 통해 사용자 경험을 개선하였습니다.

- **App Router**: 파일 기반 라우팅 방식을 사용하면 라우트 관련 로직을 중앙화하고 더 명확하게 표현할 수 있으며, 중첩 라우트 기능을 통해 공통 UI 컴포넌트의 재사용성을 높이고 애플리케이션의 페이지 구조를 효율적으로 관리할 수 있습니다.

### Middleware의 이해와 활용

Next.js 프로젝트에서 Middleware를 사용하는 이유와 방법을 배웠습니다. Middleware를 통해 사용자의 로그인 상태를 확인하고, 특정 페이지 접근을 제한하는 로직을 구현하는 방법을 학습했습니다. 이는 초기 로딩을 더 빠르게 하고 보안성을 강화하고 불필요한 페이지 전환을 경험하지 않도록 하여 사용자 경험을 개선합니다.

### Axios Interceptors를 통한 효율적인 HTTP 요청 관리

Axios Interceptors를 활용하여 HTTP 요청과 응답을 전역적으로 관리하는 방법을 배웠습니다. Firebase 인증을 사용하여 생성된 토큰을 자동으로 모든 요청에 포함시키는 방법을 통해, 개발자가 각 요청마다 토큰을 수동으로 추가하는 번거로움을 줄였습니다. 이러한 접근 방식은 애플리케이션의 보안을 강화하고 개발 과정을 더욱 효율적으로 만들었습니다.


