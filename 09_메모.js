// const express = require("express")
// const {MongoClient } = require("mongodb")

// const app = express()
// const PORT = 3000

// app.use(express.json())

// const url = "mongodb+srv://gmltmd:Z7NeBuqEqiLCUbGb@cluster0.bavei4g.mongodb.net/"
// const client = new MongoClient(url)

// const dbName = "memo"
// let memoCollection 

// async function startServer(){ // 비동기로 연결
//     try{
//         await client.connect()
//         console.log("MongoDB 연결 성공!!")

//         const db = client.db(dbName)
//         memoCollection = db.collection("memos")
        
//         app.listen(PORT, () => {
//             console.log("서버 실행 중...")
//         })



//     }catch(error){
//         console.log("MongoDB 연결 실패: ", error)
//     }
// }

// startServer()

// app.post(".memo", async(req, res) => {
//     try{
//         // { text: "메모값" }
//         const {text} = req.body
        
//         if(!text || text.trim() === ""){
//             return  res.status(400).json({
//                 success: false,
//                 message: "메모 내용을 입력해주세요"
//             })
//         }

//         const newMemo = {
//             text: text.trim(),
//             createAt: new Date()

//         }

//         await memoCollection.insertOne(newMemo)
//         res.status(201).json({
//             success: true,
//             message: "메모가 추가 되었습니다."
//         })

//     }catch(error){
//         console.log("메모 저장 오류: ", error)
//         res.status(201).json({
//             success: false,
//             message: "서버 오류 발생!!"
//         })
//     }
// })


const express = require("express")
const { MongoClient, ObjectId, ReturnDocument } = require("mongodb")

const app = express()
const PORT = 3000

app.use(express.json())

const url = "mongodb+srv://gmltmd:Z7NeBuqEqiLCUbGb@cluster0.bavei4g.mongodb.net/"
const client = new MongoClient(url)

const dbName = "memo"
let memoCollection

async function startServer() { // 비동기로 연결
    try {
        await client.connect()
        console.log("MongoDB 연결 성공!!")

        const db = client.db(dbName)
        memoCollection = db.collection("memos")

        app.listen(PORT, () => {
            console.log("서버 실행 중...")
        })
    } catch (error) {
        console.log("MongoDB 연결 실패: ", error)
    }
}

startServer()

app.get("/memos", async(req, res) => {
    try{
        const {keyword} = req.query
        let filter = {}

        if(keyword && keyword.trim() !== ""){
            filter = {
                text: {$regex: keyword.trim(), $options: "i"}    
            }
        }
        const memos = await memoCollection.find(filter).sort({createdAt: -1}).toArray()
        res.json({
            success: true,
            count: memos.length,
            memos
        })
    }catch(error){
        console.log("메모 조회 오류: ", error)
        res.status(500)({
            success: false,
            message: "메모 조회 중 오류가 발생!"
        })
    }
})

app.post("/memo", async(req, res) => {
    try {
        // { text: "메모값" }

        const { text } = req.body
        if(!text || text.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "메모 내용을 입력해주세요"
            })
        }

        const newMemo = {
            text: text.trim(),
            createdAt: new Date()
        }

        await memoCollection.insertOne(newMemo)

        const memos = await memoCollection.find().sort({ createdAt: -1}).toArray()

        res.status(201).json({
                success: true,
                message: "메모가 추가되었습니다.",
                memos
        })
    } catch (error) {
        console.log("메모 저장 오류: ", error)
        res.status(500).json({
                success: false,
                message: "서버 오류가 발생!!"
        })
    }
})


// app.put("/memos/:id", async(req, res) => {
//     try{
//         const { id } = req.params
//         const { text } = req.body

//         // id가 MongoDB ObjecteId 형식인지 검사하고 아니면 400에러 반환
//         if(!ObjectId.isValid(id)){
//             return res.status(400).json({
//                 success: false,
//                 message: "올바르지 않은 메모 id 형식!!"
//             })
            
//         }
//         if(!text || text.trim() === "") {
//             return res.status(400).json({
//                 success: false,
//                 message: "변경할 메모 내용을 입력해주세요"
//             })
//         }

//         const result = await memoCollection.findOneAndUpdate(
//             {_id: new ObjectId(id) },

//             {
//                 $set: {
//                     text: text.trim(),
//                     updatedAt: new Date()
//                 }
//             },
//             {
//                 ReturnDocument: "after"
//             }
//         )
//         if(!result){
//             return res.status(404).json({
//                 success: false,
//                 message: "해당 id의 메모를 찾을 수 있 없습니다."
//             })
//         }
//         res.json({
//             success: true,
//             message: "메모가 수정되었습니다. (PUT)",
//             memo: result
//         })
//     }catch(error){
//         console.log("메모 수정 오류(PUT): ", error)
//         return res.status(500).json({
//             success: false,
//             message: "메모 수정 중 오류가 발생!!"
//         })
//     }
// })

app.put("/memos/:id", async (req, res) => {
    try{
        const { id } = req.params
        const { text } = req.body

        // id가 MongoDB ObjectId 형식인지 검사하고 아니면 400에러를 반환
        if(!ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "올바르지 않은 메모 id 형식!!"
            })
        }

        if(!text || text.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "변경할 메모 내용을 입력해주세요"
            })
        }

        const result = await memoCollection.findOneAndUpdate(
            { _id: new ObjectId(id) },
            {
                $set: {
                    text: text.trim(),
                    updatedAt: new Date()
                }
            },
            {
                returnDocument: "after"
            }
        )

        if(!result) {
            return res.status(404).json({
                success: false,
                message: "해당 id의 메모를 찾을 수 없습니다"
            })
        }

        res.json({
            success: true,
            message: "메모가 수정되었습니다. (PUT)",
            memo: result
        })
    }catch(error){
        console.log("메모 수정 오류(PUT): ", error)
        return res.status(500).json({
            success: false,
            message: "메모 수정 중 오류가 발생!!"
        })
    }
})

app.delete("/memos/:id", async(req, res) => {

    try{
        // 1. id 형식 감사
        const { id } = req.params
    
        // id가 MongoDB ObjectId 형식인지 검사하고 아니면 400에러를 반환
        if(!ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "올바르지 않은 메모 id 형식!!"
            })
        }  

        // 2. 삭제 실행
        await memoCollection.deleteOne({ _id: new ObjectId(id) })
        

         // 3. 삭제 후 전체 목록 다시 조회
        const memos = await memoCollection.find().sort({ createdAt: -1}).toArray()

        res.status(200).json({
                success: true,
                message: "메모가 삭제됨",
                memos
        })

    }catch(error){
        console.log("메모 삭제 오류(DELETE): ", error)
        return res.status(500).json({
            success: false,
            message: "메모 삭제 중 오류가 발생!!"
        })
    }

})