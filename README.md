# TimeShare (TimeSeller)

경험을 1:1로 거래하는 프리미엄 마켓플레이스 MVP

## 주요 기능
- 메인: 셀러 모집 랜딩/CTA, 셀러 지원 폼(이메일/카톡/경험 등)
- 회원: 이메일/비번 회원가입, 로그인, 프로필(최소)
- 경험: 셀러만 경험 등록, 경험 리스트/상세, 구매자 예약(결제X), 후기
- 마이페이지: 구매자(내 예약/후기), 셀러(내 경험/예약)
- 알림: 지원 시 이메일, 카카오톡 안내(링크)
- 결제/환불: MVP에서는 제외

## 기술스택
- 프론트: Next.js 14, TypeScript
- 백엔드: Express, Prisma, PostgreSQL, TypeScript, JWT
- Docker, Docker Compose

## 폴더 구조
```
TimeSeller/
├── backend/
├── frontend/
├── docker-compose.yml
├── README.md
└── .env.example
```

## 환경설정
- backend/.env.example
- frontend/.env.example
- 루트 .env.example (docker-compose)

## 개발 가이드
1. 저장소 클론
2. 각 서비스별 `.env` 파일 생성 및 값 입력
3. `docker-compose up --build`
4. `cd backend && npx prisma migrate dev`로 DB 마이그레이션

## 배포 가이드
- Docker 기반 배포
- 환경변수/시크릿 관리 주의 