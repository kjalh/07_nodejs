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
                <button>수정</button> <button>삭제</button>
            </div>
        `
        memoList.appendChild(li)
    })
}

loadMemos()