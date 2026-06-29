const express = require("express")
const fs = require("fs")
const path = require("path")

const app = express()
const PORT = 3000

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "view"))

app.use(express.urlencoded({ extended: true}))


// 게시물 작성
app.post("/posts", (req, res) => {
    const {title, content } = req.body
    const saveText = `
    ==========================
    제목: ${title}
    내용: ${content}
    작성일: ${new Date().toLocaleDateString()}
    ==========================   
    `

    const filePath = path.join(__dirname, "data", "posts.txt")
    fs.appendFile(filePath, saveText, "utf-8", (err) => {
        if(err){
            console.error(err)
            return res.send("파일 저장 중 오루가 발생함")
        }
        res.send("파일 저장 성공")

    })
})

app.listen(PORT,() => {
    console.log("서버 실행 중...")
})