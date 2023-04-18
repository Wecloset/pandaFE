<img src="https://user-images.githubusercontent.com/90922593/231734926-132311e4-8dc7-47c5-ad11-d89a2d4299f2.jpg" width="765"/>

📌옷장 속 숨어있는 아이템들을 공유하여 이익을 창출하는 중고 거래 & 렌탈 플랫폼.

### Features

- 회원가입시 사용자의 취향 키워드를 수집하여 로그인시 키워드에 맞는 아이템을 추천.
- 마이페이지에서 현재 판매/렌탈 중인 아이템 관리.
- sns형식의 룩북을 제공하여 내 스타일을 공유하고 사진에서 입고있는 아이템을 매칭.

💻 데모 사이트
[Panda Demo]()

### Tech Stack

- **Language** : **React**를 사용해 프로젝트를 생성하고 **TypeScript**를 사용한 정적 타입 지정으로 코드 작성 효율을 높임
- **Library** : file based routing, api routing, nextauth, SSR과 webpack, bundling을 지원하는 **Next.js**를 사용
- **CSS** : **Tailwind**사용으로 style작성 코드 컨벤션을 맞춤.
- **State Management** : **Recoil**로 client-state, 비동기쿼리를 관리, **React-query**로 서버 데이터 fetching
- **Server** : 관계형 데이터베이스 모델을 작성하는데 편리하고 보일러 플레이트가 적은 **Prisma** ORM을 사용하여 테이블을 정의.
- **Storage** : 사용자 프로필, 업로드한 이미지들의 관리를 위한 스토리지로 **AWS S3**선택.
- **Deploy**: Next.js, prisma에 친화적이고 빠른 배포를 위해 **Vercel**로 배포.

### Project

- 📌 [프로젝트 칸반보드](https://github.com/orgs/Wecloset/projects/1/views/2)
- 📌 [페이지 기획/UI](https://www.figma.com/file/z9rKNkQ6Z6JiOrGszUICR9/PANDA?node-id=0-1&t=OregN4Mb2nRLsCBV-0)
- 📌 [기능명세서, API설계](https://low-individual-829.notion.site/dad94466f07d4681b851daf1be13139d)
- 📌 [db model](https://www.prismabuilder.io/schemas/panda/graph)
 
### Main Features

- [Filtering](https://github.com/Wecloset/pandaFE/issues/69)
- [Infinite Scrolling](https://github.com/Wecloset/pandaFE/wiki/Infinite-Scrolling)
- [NextAuth login]()
- [External api - google, kakao signup]()
- [Search Engine]()
- [aws s3 file upload](https://github.com/Wecloset/pandaFE/blob/main/src/hooks/useUpload.tsx)
- [Custom Hooks](https://github.com/Wecloset/pandaFE/wiki/Custom-hooks)
- [State Management - recoil(user data fetching)](https://github.com/Wecloset/pandaFE/blob/main/src/recoil/user.ts)
- [Error Handling](https://github.com/Wecloset/pandaFE/wiki/Error-handling)

### Trouble Shooting

- [recoil 유저데이터 동기화](https://github.com/Wecloset/pandaFE/issues/58)
- [prisma db push error](https://velog.io/@rlorxl/prisma-db-push-%EC%97%90%EB%9F%AC-%ED%95%B4%EA%B2%B0)
- [aws s3 file upload issue]()
- [social signup]()
- [react-hook-form issue](https://velog.io/@rlorxl/react-hook-form-%EA%B4%80%EB%A0%A8-%EC%9D%B4%EC%8A%88)
- [useMutation & useForm & axios]()
- [localStorage is not defined error]()
- [next.js hydration error]()

### Members

|  name  |                                                                         github                                                                          |       contact        | roles                                                                                                                                                                                    |
| :----: | :-----------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 이조은 |   [<img src="https://raw.githubusercontent.com/peterthehan/peterthehan/master/assets/github.svg" width="25" height="25">](https://github.com/rlorxl)    | imjoeun08@naver.com  | ui 디자인, db model 설계, 마켓 페이지 개발, 메인페이지 개발, 룩북 페이지 개발, 게시물 생성 및 업데이트 기능 개발(이미지 업로드,댓글,좋아요,조회수), 유저인증 유지 비동기 처리, front배포 |
| 이지훈 | [<img src="https://raw.githubusercontent.com/peterthehan/peterthehan/master/assets/github.svg" width="25" height="25">](https://github.com/jiji-hoon96) | jihoon7705@gmail.com | 로그인 및 유효성 검사 처리, 자체 회원가입 및 소셜 로그인/회원가입 기능 개발, 게시물 검색 기능 구현, 마이페이지 개발                                                                      |

### Structure

```
📦Panda
┣ 📂prisma
┣ 📂s3-upload
┣ 📂public
┣ 📂src
┃ ┣ 📂components
┃ ┣ 📂hooks
┃ ┣ 📂lib
┃ ┣ 📂pages
┃ ┃ ┣ 📂api
┃ ┃ ┣ 📂create
┃ ┃ ┣ 📂login
┃ ┃ ┣ 📂lookbook
┃ ┃ ┣ 📂market
┃ ┃ ┣ 📂mypage
┃ ┃ ┣ 📂search
┃ ┃ ┣ 📂sign
┃ ┃ ┣ 📜404.tsx
┃ ┃ ┣ 📜_app.tsx
┃ ┃ ┣ 📜_document.tsx
┃ ┃ ┗ 📜index.tsx
┃ ┣ 📂recoil
┃ ┣ 📂styles
┃ ┣ 📂types
┃ ┗ 📂utils
┣ 📜.eslintrc.js
┣ 📜.prettierrc.js
┣ 📜README.md
┣ 📜next-env.d.ts
┣ 📜next.config.js
┣ 📜package-lock.json
┣ 📜package.json
┣ 📜postcss.config.js
┣ 📜tailwind.config.js
┗ 📜tsconfig.json
```

### Planning...

- 좋아요, 댓글에 대한 알림
- DM기능
