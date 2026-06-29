import express from "express"

const router = express.Router()

// http://127.0.0.1:3000/posts (GET)
router.get("/", (req, res) => {
    res.status(200).send("GET: /posts 글보기")
})

router.post("/", (req, res) => {
    res.status(201).send("POST: /posts 글 작성")
})

router.put("/:id", (req, res) => {
    res.status(201).send("PUT: /posts/:id 글 수정")
})

router.delete("/:id", (req, res) => {
    res.status(200).send("DELETE: /delete: id 글 삭제")
})
 
export default router