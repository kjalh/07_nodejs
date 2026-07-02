const memoInput = document.getElementById("memoInput")
const addBtn = document.getElementById("addBtn")
const memoList = document.getElementById("memoList")

// 메모 불러오기
async function loadMemos() { // 화면에 메모가 있으면 보여야 됨
    try{
        const response = await fetch("/memos") // http://127.0.0.1:3000/memos
        const data = await response.json()
        renderMemos(data.memos)
    }
    catch(error){
        console.log("메모 조회 실패", error)
    }
}

// 메모 추가하기
addBtn.addEventListener("click", async() => {
    const text = memoInput.value.trim()
    if(!text){
        alert("메모를 입력하세요")
        return
    }   

    try{
        const response = await fetch("memo", { // fetch는 기본적으로 팻 방식??
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({text})
        })
        const data = await response.json()
        memoInput.value = ""
        renderMemos(data.memos)
    }
    catch(error){
        console.log("메모 추가 실패: ", error)
    }   
})



function renderMemos(memos){
    memoList.innerHTML = ""

    memos.forEach((memo) => {
        const li = document.createElement("li") //<li></li>
        li.className = "memo-item" // <li class="memo-item"></li>
        li.innerHTML = `
            <span>${memo.text}</span>
            <div class="memo-buttons">
                <button onclick="editMemo('${memo._id}')">수정</button> <button onclick="deleteMemo('${memo._id}')">삭제</button>
            </div>
        `
        memoList.appendChild(li)
    })
}

// 메모 삭제
async function deleteMemo(id){
    const check = confirm("정말 삭제하시겠습니까?")
    // console.log(check)
    // console.log(id)

    if(!check) return
    
    try{
        const reponse = await fetch(`/memos/${id}`, {
            method:"DELETE"
        })
                const data = await reponse.json()
        renderMemos(data.memos)
    }catch(error){
        console.log("메모 삭제 실패: ", error)

    }
}


// 메모 수정
// 내가 하다 망함
// async function editMemo(id) {
//     const newText = prompt("수정할 내용을 입력하세요.")
//     console.log(newText)
//     // const check = confirm("")

//     if(!newText || nexText.trim() === "") return

    

//     try{
//         const response = await fetch(`/memos/${id}`,{
//             method:"PUT",
//             headers: {
//                 'Content-Type': 'application/json'
//             },     
//             body: JSON.stringify({newText})
//         })
        
        
        
//     }
//     catch(error){
//         console.log("메모 수정 실패: ", error)
//     }
// }

async function editMemo(id) {
    const newText = prompt("수정할 내용을 입력하세요.")
    console.log(newText)
    // const check = confirm("")

    if(!newText || newText.trim() === "") return

    

    try{
        await fetch(`/memos/${id}`,{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json'
            },     
            body: JSON.stringify({text: newText})
        })
        
        
        loadMemos() // reload()해도 상관 없음
    }
    catch(error){
        console.log("메모 수정 실패: ", error)
    }
}




loadMemos()