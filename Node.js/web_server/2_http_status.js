/*

    HTTP response status code
    Web server가 clinet 에게 보내는 코드, 서버 ==> 클라이언트

    sendStatus()

    postman

*/

const express = require('express')
const app = express()

app.get('/', (req, res) => {
    // res.sendStatus(200) // 200은 OK 의 의미
    // web browser 에서는 서버로부터 받은 Http response status code인 200을 받으면
    // OK로 표시하게 된다.
    
    res.sendStatus(400) // 400은 Bad request 의 의미

    // 403 : forbidden, 요청한 request를 비공개로 처리
    // 404 : Not Found
    // 500 : Internal server error, 서버 에러
    // 503 : service unavailable
})

app.listen(3000, () => {
    console.log('start listening on 3000')
})