// 데이터베이스 선택 및 생성
use("AIdb") // 오타 진짜 조심 왜냐 에러도 안나고 찾기도 힘듦 왜냐 새로 만들어짐
db.students.find({})

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


/*
    $eq 같다
    $ne 같지 않다
    $gt 크다
    $gte 크거나 같다
    $lt 작다
    $lte 작거나 같다
*/
// 이름이 김사과인 학생 조회
use("AIdb")
db.students.find({ name: "김사과"})

// 점수가 80점 이상인 학생 조회
use("AIdb")
db.students.find({ score: {$gte: 80 }})

// 나이가 23살 초과인 학생 조회
use("AIdb")
db.students.find({age: {$gt: 23}})

// 원하는 필드만 조회 // db.students.find({}, {필드명: 1, 필드명: 0}) 1은 조회 0은 제외
use("AIdb")
db.students.find({}, {name: 1, score: 1, _id: 0})

// 1개만 조회
use("AIdb")
db.students.find({age: {$gt: 23}})
db.students.findOne()

// 점수 정렬
use("AIdb")
db.students.find({}).sort({ score: 1}) // 오름차순

use("AIdb")
db.students.find({}).sort({ score: -1}) // 내림차순


// 개수 세기
use("AIdb")
db.students.countDocuments({})

// 특정 조건을 만족하는 학생 수
use("AIdb")
db.students.countDocuments({ score: {$gte: 80}})


// 1개 수정
// 첫 번째 객체: 누구를 수정할지 조건
// 두 번째 객체: 무엇을 어떻게 바꿀지 조건
use("AIdb")
db.students.updateOne(
   {name: "김사과"},
   {$set:{score: 95}}
)

// 여러 데이터 수정
use("AIdb")
db.students.updateMany(
   {major: "AI"},
   {$set:{major: "Artificial Intelligence"}}
)

// 숫자 증가 시키기
use("AIdb")
db.students.updateMany(
   {}, {$inc: { score: 3 } }
)