# 인수인계 문서 — 좋은비전 자립생활센터 웹사이트

## 1. 레포 위치
- GitHub: https://github.com/unfoldat/sitetest
- 배포 주소: https://unfoldat.github.io/sitetest/
- 배포 방식: main 브랜치에 push → GitHub Actions(`.github/workflows/deploy.yml`)가 자동 빌드·배포

## 2. 권한 모델 (1단계 · Flat RBAC)

| 역할 | 현재 담당 | 할 수 있는 일 |
|---|---|---|
| **Owner** | 독수리 (GitHub: unfoldat) | 레포 설정, 배포 설정, 협업자 추가/삭제, 모든 글 작성·삭제 |
| **Editor** | (미배정) | `/admin`에서 센터소식·활동사진 글 작성·수정. 레포 설정은 못 건드림 |

Editor 권한 부여 방법:
1. GitHub 레포 → Settings → Collaborators → Add people
2. 상대방 GitHub 계정 초대 (Write 권한)
3. 상대방이 `/admin`에서 GitHub 계정으로 로그인하면 바로 사용 가능

## 3. Owner 이전 방법 (독수리가 손을 뗄 경우)
1. GitHub 레포 → Settings → General → Danger Zone → **Transfer ownership**
2. 새 Owner의 GitHub 계정/조직으로 이전
3. 이전 후 기존 Owner(독수리)는 자동으로 Collaborator로 전환됨 — 필요 없으면 4번으로 완전 제거
4. Settings → Collaborators에서 이전 Owner 계정 제거

## 4. 권한 회수 절차 (직원 교체·퇴사 시 — 반드시 수행)
- [ ] GitHub 레포 → Settings → Collaborators → 해당 계정 **Remove**
- [ ] 해당 직원이 개인 PAT(개인 액세스 토큰)를 발급해 쓰고 있었다면, 본인이 GitHub Settings → Developer settings에서 직접 토큰 삭제하도록 안내
- [ ] Cloudflare Worker(OAuth 인증기, 2단계 도입 시)를 쓰고 있다면 GitHub OAuth App의 Authorized 사용자 목록에서도 확인
- [ ] 제거 후 `/admin` 로그인이 안 되는지 반드시 재확인

권한은 부여한 채로 방치하면 안 됨 — 최소 반기 1회, 현재 Collaborators 목록과 실제 활동 인원이 일치하는지 점검할 것 ("access review").

## 5. 2단계 도입 시 참고 (검토 승인 워크플로)
- `public/admin/config.yml`에 `publish_mode: editorial_workflow` 추가 → 저장 시 PR 자동 생성되는 구조로 전환
- 단, 이 기능은 Decap/Sveltia 계열에서 아직 **베타**로 표기됨 — 실제 도입 전 별도 테스트 레포에서 먼저 검증할 것
- "작성자가 본인 글을 직접 승인 못 하게" 강제하려면 CMS 설정과 별개로 GitHub 레포 Settings → Branches → Branch protection rule에서 "Require review from someone other than the author" 활성화 필요

## 6. 콘텐츠 구조
```
src/content/notice/*.md    ← 센터소식 (공지/활동)
src/content/gallery/*.md   ← 활동사진 (대체텍스트 필수 — 스키마에서 강제됨)
src/content.config.ts      ← 위 두 컬렉션의 타입 계약(스키마)
```
새 컬렉션(예: 사업안내 게시판화)이 필요하면 `content.config.ts`에 스키마 추가 → `public/admin/config.yml`에 대응 필드 추가 → `src/pages/`에 목록·상세 페이지 추가, 세 곳을 함께 수정해야 함.
