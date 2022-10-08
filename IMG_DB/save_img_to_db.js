const mysql = require('mysql2')
const fs = require('fs')
const dbconfig = require('./config/dbconfig.json')

// pool 과 달리 하나의 연결선만 뚫음
const connection = mysql.createConnection({
    host : dbconfig.host,
    user : dbconfig.user,
    password : dbconfig.password,
    database : dbconfig.database,
    debug : false
})

// 로컬에서 이미지를 읽어서 DB 에 저장
const dog = {
    // 이미지를 읽을 때 이미지를 다 읽기 전에 다음 단계로 넘어가면 이미지 파일이 제대로 넘어가지 않으므로
    // readFileSync 로 이미지를 완전히 읽은 후에 다음 단계로 넘어가게 한다.
    img : fs.readFileSync('./dog.jpg'),
    name : 'Dog'
}


// insert into values 와 insert into set은 동일한 동작을 한다.
// insert into set 은 table 의 column 과 value 의 값을 한번에 대입 가능
// 아래 코드에서는 key - value 형태인 dog 를 넘겨주면 알아서 column 과 value 형태로 풀어서 저장시켜준다.
const query = connection.query('insert into `animals` set ?', dog, 
    (err, result) => {
        if (err) {
            console.dir(err)
            return
        }
        console.log('이미지를 db 추가 성공 : ')
        // console.log(query.sql)
        console.dir(result)
})

const cat = {
    img : fs.readFileSync('./cat.jpg'),
    name : 'Cat'
}

const query2 = connection.query('insert into `animals` set ?', cat, 
    (err, result) => {
        if (err) {
            console.dir(err)
            return
        }
        console.log('이미지를 db 추가 성공 : ')
        // console.log(query.sql)
        console.dir(result)
})

connection.end()