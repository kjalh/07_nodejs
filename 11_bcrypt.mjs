import bcrypt from "bcrypt"

const password = "apple1004"
const saltRounds = 10


// 1. 비밀번호 해시화
async function hashPassword(password){
    const hashed = await bcrypt.hash(password, saltRounds)
    console.log("해시된 비밀번호: ", hashed)
    return hashed
}