/*
    1. 경로 설정
    http 모듈에서 경로 설정(라우팅)은 사용자의 요청 주소를 나타내는 req.url과 요청 방식인 req.method를 확인하여 
    조건문으로 분기 처리하는 방식으로 이루어짐

    127.0.0.1:3000/
    127.0.0.1:3000/about

    2. GET괴 POST
        GET: 서버로부터 데이터를 조회할 때 사용하는 요청 방식으로, 주로 게시글 목록 보기, 검색 결과 조회, 상세 페이지 열기처럼 데이터를 가여오는 데 
             사용됨. GET요청은 필요한 값을 URL 뒤에 ? key=value 형태의 쿼리 문자열로 함께 전달하며, 브러우저 주소창에 그대로 표시
       POST: 서버에 데이터를 전송하여 새로운 데이터를 생성하거나 기존 데이터를 변경할 때 사용하는 요청 방식으로, 회원 가입, 로그인, 글 작성, 
             파일 업로드 등에 사용됨. POST 요청은 데이터를 URL이 아니라 요청 본문(body)에 담아 보내기 때문에 주소창에 내용이 보이지 않으며, 
             GET보다 보안성이 조금 더 높고 전송할 수 있는 데이터의 양에도 제한이 거의 없음

        127.0.0.1:3000/login
        if(req.url === "/login" && req.method === "post"){
            res.end("로그인 처리")
        }
    
    3. 쿼리 문자열(String)
        - 쿼리 문자열(Query String)은 URL 뒤에 ? 기호에 기준으로 붙는 추가 데이터 전달 방식으로, 서버에 필요한 값을 함께 보내기 위해 사용됨
        - key = value 형태로 작성하며 여러 개의 값은 & 기호로 연결함(예: ?name=김사과&age=20)
        - 주로 GET 요청에서 사용되며 검색 조건, 페이지 번호, 필터 값 등을 전달할 떄 많이 사용

    코드러너 실행: 컨트럴 + 알트 + n

    nodemon
    node.js 개발시 자주 사용하는 유틸리티로, 소스 코드가 변경될 때마다 자동으로 서버를 재시작해주는 도구
    js 파일 만들 때마다 뭐가 있어서 불편함. 하지만 저장만 하면 자동으로 재시작이라 편함

    도구
        npm install -g modemon (글로벌이라 권장하지 않음 -> node.js안에 설치됨)
        npm install --save-dev nodemon (해당 프로젝트에서만 사용,  package.json 안에 설치됨)

        npm install --save-dev nodemon 을 설치하면 .gitignore에 node_modules/올리기
        package.json이 reauirement.txt 같은거
        npm install -> 하면 package.json에 있는 버전들이 한번에 깔림
    


    
            
*/


// 예전에 사용하던거
const http = require("http")
const url = require("url") // 주소에 ? 뒤에 가져옴

const server = http.createServer((req,res) => {
    // const pasrseURL = url.parse(req.url, true) // true는 query string을 객체로 자동 변환
    
    const myUrl = new URL(req.url, `https://${req.headers.host}`)
    console.log(myUrl.pathname)
    console.log(myUrl.searchParams.get("userid"))
    console.log(myUrl.searchParams.get("name"))
    console.log(myUrl.searchParams.get("age"))

    if(url === "/"){ // 127.0.0.1:3000/
        res.writeHead(200, {"Content-Type": "text/html"})
        res.end("<h2>Hello Node.js</h2>")
    }
    else if(url === "/about") {// 127.0.0.1:3000/about
        res.writeHead(200, {"Content-Type": "text/html"})
        res.end("<h2>about page</h2>")
    }
    else{ // 127.0.0.1:3000/아무거나
        res.writeHead(404, {"Content-Type": "text/html"})
        res.end("<h2>error 😀</h2>")
    }
})
server.listen(3000, () => {
    console.log("서버 실행 중...")
})
