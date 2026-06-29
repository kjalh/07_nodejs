// 데이터베이스 선택 및 생성
use("AIdb") // 오타 진짜 조심 왜냐 에러도 안나고 찾기도 힘듦 왜냐 새로 만들어짐


// db: AIdb
// students: 컬렉션(컬렉션이 없으면 생성하면서 삽입)
// insertOne(): 문서를 1개 넣는 메서드
 db.students.insertOne({ // db는 자동으로 studednts는 테이블 insertOne 하나만 삽입
    userid: "apple",
    name: "김사과",
    age: 20,
    major: "AI",
    score: 88
 })

 // 일부만 실행 가능 -> 드래그하면 됨 (ctrl + alt + s가 실행하는 단축키)

 // 이 공간은 걍 연습하는 공간임 코드를 만드는 공간 X


 // insertMany(): 여러 문서를 한번에 넣음
 use("AIdb")
 db.students.insertMany([
    {name: "김사과", age: 20, major: "AI", score: 88},
    {name: "반하나", age: 25, major: "Backend", score: 91},
    {name: "오렌지", age: 30, major: "Frontend", score: 77},
 ])

 
 // 전체 조회
 // find(): 문서를 조회하는 기본 메서드
 // {}: 조건이 없다는 뜻
use("AIdb")
db.students.find({})


/* 
    ObjectId
    - 각 문서의 12바이트(24자리 16진수) 고우한 ID로 사용되는 데이터 타입
    - SQL의 기본키와 비슷한 역할을 함
    - 각 문서에 _id 필드를 기본적으로 생성하며, 특별히 지정하지 않으면 자돋으로
      ObjectId 형태로 생성
*/