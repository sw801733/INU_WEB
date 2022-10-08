const express = require('express') // npm install express --save
const app = express() // express 시작

// 로컬 폴더 __dirname : maing.js 가 있는 폴더 위치

// /scripts 경로로 들어오는 요청에 대해서는
// __dirname + '/scripts' 로 가라
app.use('/scripts', express.static(__dirname + '/scripts'))

app.listen(3000, () => {
    console.log('3000번에 귀를 대고 듣기 시작했음.')
}) // listen 으로 서버를 시작하는데 인자는 port 번호가 된다, 두번째는 해당 port에 listen을 시작한 경우 실행할 callback 함수


// 처리해주는 루틴들을 추가
app.get('/', (reg, res) => {
    console.log('/에 대한 요청 들어왔음')

    // res.send('루트에 대한 요청') // Web browser 에 답변을 보냄
    // 웹 페이지에 보낸 것을 보여준다.

    // html 파일을 보내기 위해서는 res.sendFile 로 전송
    res.sendFile(__dirname + '/pages/index.html')
    // __dirname 은 현재 디렉터리를 가리킨다. main.js 가 있는 위치
 

}) // client가 서버에 요청할 때 사용하는 명령어 GET
// Web Browser 는 맨 처음 루트 (/) 를 GET 하므로 위의 콜백 함수를 바로 실행


app.get('/about', (reg, res) => {
    console.log('about에 대한 요청 들어왔음')
    //res.send('about에 대한 요청')
    res.sendFile(__dirname + '/pages/about.html')
}) // get 이 여러개 일 떄 구분하는 방법은 get의 인자로 정한 목적지로 구분한다.
   // ex) '/' 과 '/about' 두 개로 구분

app.get('/working', (reg, res) => {
    console.log('working에 대한 요청 들어왔음')

    res.sendFile(__dirname + '/pages/working.html')
}) 