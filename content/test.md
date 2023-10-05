CSR 의 단점으로부터 시작 SSR (React -> Next)

과거에 생긴 불편함으로 생긴 기술이라는 관점에서
Next 를 대체할 무언가가 나타나는 과정도 동일할 것.

React 프레임워크.

React 는 화면을 그리는 데 필요한 기능을 제공한다면,
Next 는 화면을 그리는 것 외의 기능까지도 제공한다.

파일 기반의 라우팅
페이지 단위의 사전 렌더링 (SSR, SSG)
코드 스플리팅 자동화
Prefetching 을 통해 CSR 에서의 라우팅
...

https://nextjs.org/docs

Next 13. 어떻게 다른가.

파일 시스템 기반의 라우팅 (디렉토리 구조에 따라 라우팅이 달라진다.)
디렉토리가 pages -> app 으로 바뀐다. (App Routing)

표면적으로는 달라보이지는 않는데..
실제 내부 구성이 풍부해졌다.

* Hydration 을 페이지 단위에서 컴포넌트 단위로 해줄 수 있다.
  * Streaming 패턴이라고 한다. -> 필요할 때마다 Hydration.

서버 컴포넌트가 뭐야?
React Server Component -> RSC (React 18 에서 도입.)

장점이 뭐야?

* 데이터 패칭
  * 서버에서 데이터를 가져오니 물리적으로 빠르다.
* 보안
  * 브라우저에서 보면 안되는 정보를 서버쪽에 둔다.
* 캐싱
  * 렌더링 된 값을 캐싱해서, 재사용한다. (요청에 최적화)

-> 핵심은 JS Bundle 이 감소한다.
-> 렌더링까지 다된 파일을 내려주므로, Hydration 에 필요한 JS 번들이 줄어든다.

RCC RSC 의 차이.

컴포넌트를 생성하면 기본적으로 RSC 고, RCC 를 사용하려면 'use client' 를 코드에 명시해서 구분할 수 있다.

RCC 는 RSC 를 포함할 수 없다. 다시 말해. RCC 는 자식 컴포넌트로 존재해야한다. (import 할 수 없다.)
-> 서버 컴포넌트를 쓰고 싶으면, RCC Props 로 넘겨주어야한다. (children)

RCC 는 클라이언트에서만 렌더링되는 컴포넌트가 아니다.

* Pre-rendering 방식으로 렌더링 될  수 있는 컴포넌트가 클라이언트 컴포넌트라고 명명했을 뿐이다.
* SSR / SSG 방식으로 렌더링이 가능하다. 서버에서 미리 렌더링할 수 있다는 것.

그럼 SSR 되는 RCC 는 RSC 랑 뭐가 달라?

* 데이터 패칭 / 보안 / 캐싱은 서버 컴포넌트의 장점이자 클라이언트 컴포넌트와의 차이라고 봐도 된다.
* JS 번들 크기 또한 차이가 있겠다.

서버 컴포넌트가 짱 아니야? 클라이언트 컴포넌트를 써야하는 상황이 있어? 다르게 서버 컴포넌트를 못쓰는 상황이 있어?

* 서버 컴포넌트는 Hook, EventListener 를 쓰지 못한다.

useState / useEffect 같은 걸 못쓴다고?

* 그래서 RSC 를 컴포넌트 트리의 끝으로 보내야 한다는 것.

서버 컴포넌트의 활용은 그다지 익숙하지않다. -> 현재 과도기.

라우팅.

파일 시스템 기반 라우팅 -> URL Path 이 폴더 이름을 따른다.

시멘틱하게 파일을 제공하면, Next 에서 계층대로 컴포넌트를 구성해서 페이지를 보여준다 

* page.tsx
* error.tsx
* loading.tsx
* layout.tsx 

동적 세그먼트
`app/blog/[id]/page.tsx`

`[id]` 라는 폴더를 생성하면, page.tsx 에서 params.id  props 로 조회할 수 있다.

예) 고유 식별자, PID 같은 걸 받아낼 수 있을 듯.

그럼 페이지 간 이동은 어떻게 하지? 

* Link 컴포넌트를 사용하기.
* useRouter() 를 활용하기
  * 버튼 onClick 으로 이동할 수도 있게

스타일링.
방법은 여러가지인데 가장 심플하게 CSS Modules

* CSS Modules
  * 지역 스타일링 (file.module.css)
  * 전역 스타일링 (global.css)
    * 가능하면 오염되지 않게 (어디있는 컴포넌트던 사용할 수 있음) Layout 컴포넌트에서 일괄 적용하는 것이 좋은 방법.
* TailwindCSS
* Sass
* CSS-in-JS

데이터 패칭.

* 서버에서 fetch 하는 방법.
  * fetch API 를 Next 에서 조금 확장해서 제공함.
    * RSC, RCC 모두에서 다 사용할 수 있음
    * Next 에서 제공하는 API 라 자체적으로 데이터를 캐싱하고 있음.
  * Next 에서 캐싱은 여러 레이어에서 관리하고 있는데. (https://nextjs.org/docs/app/building-your-application/caching)
    * API 쪽은 Date Cache 레이어 쪽.
  * Revalidating, 캐시 재검증 하기.
    * 캐시된 데이터가 아닌 새로운 데이터를 가져와야한다.
      * 시간 기반 -> 특정 시간을 기준으로
        * `fetch(url, { next: { revalidate: 3600 } })`
        * 60분 동안 유효하고, 60분 뒤 재호출되면 재검증된다.
        * 60분 뒤 호출하면 Stale 하다만 알 뿐, 두번째 호출부터 재검증이 발동함.
      * 온디멘드 기반 -> 수요가 있을때 재검증한다.
        * 태그 기반
          * `fetch(url, { next { tags: ['태그값'] }})`
          * `revalidating(태그값)`
          * revalidating 하면 purge (무효화) 한다. 그리고 fetch 하면 재검증된다.
        * path 기반도 있음.

메타 데이터.

* 정의 방법 두가지 (두가지 모두 Metadata 라는 타입으로 정의된다.)
  * 정적 메타데이터 - metadata 라는 객체를 정의하는 것으로 한다.
    * layout.tsx 안에서 정의
  * 동적 메타데이터 - 함수로 한다. generateMetadata 라는 이름의 함수를 export 하면, 이 함수를 next 가 호출해서 반환값을 메타데이터로 한다.
    * params(쿼리 값), searchParams(동적 라우팅 값) 를 받는다.
    * 가공해서 title, *OpenGraph* 를 만드는데 사용한다.

## 사이드 한번 해볼까. (날씨 앱)

* 페이지 개발
* 페이지 간 이동 (라우팅)
  * next 가 아니라, next/navigation 에서 useRouter 를 가져와야한다.
  * onClick 으로 라우팅을 한다면, RCC 되어야한다. 페이지 자체가 RCC 되지않도록 컴포넌트를 뺄 수 있다.
* 페이지 스타일
  * 지역 또는 전역 스타일로 적용하기
    * 페이지의 Layout 쪽에서 바운더리를 가두어서 사용하면 좀 더 지역적으로 사용될 수 있음. (권장됨.)
* API 연동
  * 환경변수
    * NEXT_PUBLIC\_\* 으로 설정해야 NEXT 가 환경변수값을 인지할 수 있다.
  * 리턴이 아니라 에러를 던져서, 에러 페이지에 던진 에러가 보여지도록 한다.
* 에러 / 로딩 페이지
  * reset() props 로 로딩 / 에러 페이지에서 후처리할 수 있도록 한다.
* 캐싱 관리
  * https://nextjs.org/docs/app/building-your-application/caching
  * Next 에서는 fetch 결과를 자동으로 캐싱한다.
    * 온디맨드 혹은 시간 기준으로 캐싱을 풀어주어야한다.
  * 특정 시간마다 업데이트되는 데이터면, 업데이트 되었는지를 시간으로 따로 체크해줘야한다. 데이터 자체만으로 바뀐 데이터인지 확인하기 어렵기 때문에. 
  * revalidateTag (서버에서만 동작함.)
  * api > revalidate > route.ts
    * POST 라는 함수를 재정의해서 사용하도록 한다.
      * request: NextRequest (next/server)
      * request.nexturl.searchParams.get('tag') 가 있어야하고, 있다면, next/cache 에서 제공하는 revalidateTag(tag) 로 재검증한다.
      * 성공했을때 NextResponse.json(응답값) 정의
  * 우리가 만든 파일 구조를 url 로 쏘면, 만든 함수가 돈다. fetch(/api/revalidate?tag=)
  * 태그를 통해서 재검증할거면, 요청할때 tag 값을 정의해줘야함. 그래야 next 에서 알고서 지울거니.
* 메타데이터 설정
  * 정적 메타데이터
  * 동적 메타데이터
    * 동적 라우팅하는 곳에서 동적으로 메타데이터를 넣어주고 싶다.
    * generateMetadata 를 정의하고, 인자로 받은 값으로 메타데이터를 만들어낸다.
      * generateMetadata 라는 함수를 Next 가 인식하는 것.
  * params 와 searchParams
    * params 는 쿼리스트링 전체
    * searchParams 는 쿼리스트링의 키를 집어낼 수 있다.
* 배포
  * 배포할때 환경변수를 따로 주입하는 이유가 뭐지?
    * 아 리모트에 올라가지않는 파일이라 정의해줘야함.

*캐싱을 재검증하는 방식*은 어떤 것들이 있을까?
*Next 디렉토리 컨벤션*에 대해서
