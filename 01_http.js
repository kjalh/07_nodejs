/*
    https 모듈
    - 웹 서버를 만들 수 있게 해주는 핵심 내장 모듈
    - 클라이언트의 요청을 받고 응답을 반환하는 기능을 제공
*/

const http = require("http")

const server = http.createServer((req, res) => {
    res.writeHead(200, )
    res.end("Hello Node.js!!")
})

server.listen(3000, () => { /* 3000번 포트를 사용해서 들어와라*/
    console.log("서버 실행 중...")
})

