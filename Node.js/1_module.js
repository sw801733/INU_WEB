// 함수
// function sayHello(name) {
//     console.log('Hello ' + name)
// }

// sayHello('John')
// sayHello('Alice')

// const v = 10

// if (v > 5) {
//     console.log('It is a big number')
// }
// else {
//     console.log('작은 숫자야!')
// }

// 3초에 한 번씩 주기적으로
// setInterval(() => {
//     console.log('Node.js 연습중입니다')
// }, 3000);

// 3초 뒤에 한 번만 실행
// setTimeout(() => {
//     console.log('타임아웃, 한번만 실행')
// }, 3000);




// * Module
// 함수들의 집합 ==> 라이브러리
// ex) express 모듈로 웹 서버 개발이 가능

// logger.js 에 있는 showLogMessage 함수를 쓰고자 한다.

// logger.js 를 불러온다.
const logger = require('./logger.js')

logger.showLogMessage('첫번째 로그메세지')
logger.secondLog('두번째 로그메세지')
console.log('Logger 모듈에 들어있는 소중한 값 : ' + logger.pvalue)

// logger.showLogMessage2('Hello') // logger.js에서 보낸 이름이 아닌 -실제 함수의 이름을 사용할 경우 에러