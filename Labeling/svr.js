const express = require('express')
const mysql = require('mysql2')
const path = require('path')
const static = require('serve-static')
const dbconfig = require('./config/dbconfig.json')

const pool = mysql.createPool({
    host : dbconfig.host,
    user : dbconfig.user,
    password : dbconfig.password,
    database : dbconfig.database,
    debug : false
})

const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/public', static(path.join(__dirname,'public')))


// test_3.html 에서 이미지 가져오기 버튼을 눌렀을 때, 답변하는 부분으로
// 이미지를 보내주는 부분
app.post('/getimgfromdbbyname', (req, res) => {

    console.log('getimgfromdbbyname 호출됨')
    const imgname = req.body.imgname
    console.log(`imgname = ${imgname}`)

    const reply = {
        'status' : 'not ok'
    }
    pool.getConnection((err, conn) => {
        if (err) {
            console.log('pool.getConnection 에러 발생')
            console.dir(err)
            reply['status'] = 'not ok db pool error'
            res.json(reply)
            return
        }

        const query_str = 'select `img` from Animals where `name` =?'
        conn.query(query_str, [imgname], (error, rows, fields) => {
            if(error) { // db query 실패
                conn.release()
                console.dir(error)
                reply['status'] = 'not ok query error'
                res.json(reply)
                return

            }

            // rows 에 select 로 뽑은 이미지들이 들어간다
            conn.release()
            
            if (rows.length > 0) {
                reply['status'] = 'ok'
                reply['rows'] = rows
                console.log('이미지 전달 성공')
            }
            else {
                reply['status'] = 'not ok no result'
                console.log('사진 이름과 매치되는 사진 없음')
            }
            res.json(reply)
        })
    })

})

app.post('/saveBbox', (req, res) => {
    console.log('saveBbox 호출됨')
    
    const imgname = req.body.imgname
    const coordstxt = req.body.coords
    
    console.log(`imgname is ${imgname}`)
    console.log(`coords is ${coordstxt}`)
    
    const reply = {
        'status' : 'not ok'
    }
    
    pool.getConnection((err, conn) => {
        if (err) {
            console.log('pool.getConnection 에러 발생')
            console.dir(err)
            reply['status'] = 'not ok db pool error'
            res.json(reply)
            return
        }
        
        const query_str = 'update Animals set `coord` =? where `name` =?'
        conn.query(query_str, [coordstxt, imgname], (error, rows, fields) => {
            if (error) {
                conn.release()
                console.dir(error)
                reply['status'] = 'not ok query error'
                res.json(reply)
                return
            }
            conn.release()
            reply['status'] = 'ok'
            res.json(reply)
            console.log('coords 저장 성공, 대상 이미지 ', imgname)
        })
    })

})

app.listen(3000, () => {
    console.log('Server started at 3000')
})