/*
    파일 입출력
    fs(File System) 모듈을 사용해서 파일을 읽고 쓰는 작업을 수행

*/

const fs = require("fs")

// 동기 방식으로 파일 읽기      동기는 에러처리는 기본이 아니라 무조건 try catch    (순차적)
const data = fs.readFileSync("./example01.txt", "utf8")
console.log("파일 내용: ", data)


// 비동기 방식으로 파일 읽기    비동기는 기본적으로 에러처리를 제공         (올려놓고 뒤로 넘어감)
fs.readFile("example02.txt", "utf8", (err, data) =>{
    if(err){
        console.log("파일 읽기 실패: ", err)
        return
    }
    console.log("파일 내용: ", data)
})

// 동기 방식으로 파일 쓰기
fs.writeFileSync("output01.txt", "이 내용이 파일에 저장됩니다. 동기방식!")
console.log("파일 저장 완료 (동기)")

// 비동기 방시긍로 파일 쓰기
fs.writeFile("output02.txt", "비동기 방식으로 자장합니다.", (err) => {
    if(err){
        console.log("저장 실패: ", err)
        return
    }
    console.log("파일 저장 완료 (비동기")
})


// 비동기 방식으로 파일에 내용 추가
fs.appendFile("output02.txt", "\n새로운 줄이 추가됩니다.", (err) => {
    if(err) throw err
    console.log("내용 추가 완료")
})


// 비동기 방식으로 파일 삭제하기
 fs.unlink("output02.txt", (err) => {
    if(err) throw err
    console.log("파일 삭제 완료!!!")
 })
 