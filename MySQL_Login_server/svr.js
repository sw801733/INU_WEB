const { exec } = require('child_process')
const express = require('express')
const mysql = require('mysql2') // npm install mysql
const path = require('path') // html 파일을 가리키기 위한 경로 지정을 위해 사용할 모듈
const static = require('serve-static') // 프로그램을 실행하는 동한 현 디렉터리를 제일 상위 디렉터리로 사용하기 위한 모듈


// mysql 과 서버 사이의 연결을 만들어야 서로 통신을 한다.
// 만약 pool 이 없이 서로 계속 connection 만을 하면 서로 통신할 때마다
// 계속 연결점을 만들었다가 지우고를 반복해야 한다.


// ex) 섬에서 섬을 오고가는데 배를 한번 만들고 도착하면 부수고를 반복하는 게 아닌
// 여러개의 배를 만들어 connection이 끊기지 않도록 하는 것이다.

// JSON 파일 불러오기
const dbconfig = require('./config/dbconfig.json')

// DataBase connection pool
const pool = mysql.createPool({
    connectionLimit: 10,  // 연결선의 개수
    // JSON 파일에서 정보 가져오기
    host: dbconfig.host,
    user: dbconfig.user,
    password: dbconfig.password,
    database: dbconfig.database,
    debug:false // debug msg 를 찍지 않는다.
})

const app = express()
// url 안에 인코딩된 정보를 확장된 방법으로 해석할 수 있어야 된다는 환경 설정
app.use(express.urlencoded({extended:true}))
app.use(express.json())
// public 폴더 경로를 설정한다. 
app.use('/public', static(path.join(__dirname, 'public')))


// 사용자 로그인 process/login 부서
app.post('/process/login', (req, res) => {
    console.log('/process/login 호출됨 ' + req)
    
    const paramID = req.body.id
    const paramPassword = req.body.password

    console.log('로그인 요청 ' + paramID + ' ' + paramPassword)

    pool.getConnection((err, conn) => {
        
        // err 가 null 이 아니면 무언가 잘못됨
        if (err) {

            pool.releaseConnection(conn);
            console.log('MySQL getConnection error. aborted')

            res.writeHead('200', {'Content-Type' : 'text/html; charset=utf8'})
            res.write('<h2>DB 서버 연결 실패</h2>')
            res.end()
            return
        }

        // 해당 ID와 name 이 select 로 확인해서 로그인 확인
        conn.query("select `id`, `name` from `users` where `id` =? and `password` =?" ,
                    [paramID, paramPassword],
                    // SQL query 실행 후 아래 callback 실행
                    (err, rows) => {
                        conn.release();
                        console.log('실행된 SQL query : ' + exec.sql);

                        if (err) {
                            console.dir(err)
                            res.writeHead('200', {'Content-Type' : 'text/html; charset=utf8'})
                            res.write('<h2>DB 서버 연결 실패</h2>')
                            res.end()
                            return;
                        }

                        // row 엔 select 된 것들이 row 로 들어간다.
                        // 따라서 rows.length 가 0보다 크면 사용자가 입력한 정보에 해당하는 가입 정보가 존재한다는 뜻
                        if (rows.length > 0) {
                            console.log('아이디 [%s], 패스워드가 일치하는 사용자 [%s] 찾음 ', paramID, rows[0].name) // select로 뽑은 rows[0].name 행의 첫번째의 name
                            res.writeHead('200', {'Content-Type' : 'text/html; charset=utf8'})
                            res.write('<h2>로그인 성공</h2>')
                            res.end()
                            return;
                        }
                        // 입력한 로그인 정보가 없을 때
                        else {
                            console.log('아이디 [%s], 패스워드가 일치하는 것 없음 ', paramID)
                            res.writeHead('200', {'Content-Type' : 'text/html; charset=utf8'})
                            res.write('<h2>로그인 실패. 아이디와 패스워드를 확인하세요.</h2>')
                            res.end()
                            return;
                        }
                    }
        )
    })

})


// 사용자 회원가입 process/adduser 부서
// 웹 브라우저에서 제출 버튼을 눌러서 process/user 로 보낸 request 가 req 로 처리된다.
// 이후 다시 웹 브라우저에 대한 답장을 보내기 위한 res 
app.post('/process/adduser', (req, res) => {
    console.log('/process/adduser 호출됨' + req)

    const paramID = req.body.id // 위의 app.use(express.) 두 문장으로 들어오는 request를 잘 정리해준다.
    const paramName = req.body.name
    const paramAge = req.body.age
    const paramPassword = req.body.password

    // pool 에서 놀고 있는 connection을 가져옴
    // conn 은 실제 DB 랑 연결된 선, err는 연결하지 못할 경우 생긴 에러
    pool.getConnection((err, conn) => {
        
        // err 가 null 이 아니면 무언가 잘못됨
        if (err) {

            pool.releaseConnection(conn);
            console.log('MySQL getConnection error. aborted')

            res.writeHead('200', {'Content-Type' : 'text/html; charset=utf8'})
            res.write('<h2>DB 서버 연결 실패</h2>')
            res.end()
            return
        }

        console.log('데이터베이스 연결 끈 얻었음')
        const exec = conn.query('insert into users(id,name,age,password) values (?,?,?,?);', 
                    [paramID, paramName, paramAge, paramPassword],
                    // ? 에 채운다.

                    // query 를 실행하고 err나 result 값을 준다.
                    (err, result) => {
                        pool.releaseConnection(conn);
                        console.log('실행된 SQL : ' + exec.sql) // 실제로 보낸 값을 볼 수 있다.

                        if (err) {
                            console.log('SQL 실행 시 에러 발생')
                            console.dir(err);


                            res.writeHead('200', {'Content-Type' : 'text/html; charset=utf8'})
                            res.write('<h2>SQL Query 실행 실패</h2>')
                            res.end()
                            return
                        }

                        if (result) {
                            console.dir(result)
                            console.log('Inserted 성공')

                            res.writeHead('200', {'Content-Type' : 'text/html; charset=utf8'})
                            res.write('<h2>사용자 추가 성공</h2>')
                            res.end()
                        }
                        else {
                            console.log('Inserted 실패')

                            res.writeHead('200', {'Content-Type' : 'text/html; charset=utf8'})
                            res.write('<h1>사용자 추가 실패</h1>')
                            res.end()
                        }
                    }
        ) 
    })

})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})