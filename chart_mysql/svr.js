const express = require('express')
const mysql = require('mysql2')
const path = require('path')
const static = require('serve-static')
const dbconfig = require('./config/dbconfig.json')


// database connection pool
const pool = mysql.createPool({
    connectionLimit:10,
    host:dbconfig.host,
    user:dbconfig.user,
    password:dbconfig.password,
    database:dbconfig.database,
    debug:false,
    timezone: '09:00' // 클라이언트에게 해당 지역에 맞는 시간으로 보내기 위해 서버의 timezone을 설정한다.
})

const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/public', static(path.join(__dirname, 'public')))


// building_id 가 주어진 경우를 처리
app.post('/chartdatafromdbwithbid', (req, res) =>{
    console.log('chartdatafromdbwithbid 호출됨')

    const bid = req.body.bid
    console.log('bid is %s', bid)


    pool.getConnection((err, conn) => {
        
        const resData = {}
        resData.result = 'error'
        resData.temp = []
        resData.reg_data = []

        if (err) {
            // 에러가 발생해 DB 에서 데이터는 못가져오지만 web page 에 에러라는 것을 resData 보내줌
            pool.releaseConnection(conn);
            console.log('Mysql getConnection error. aborted')
            res.json(resData)
            return
        }

        // DB 에 데이터를 요청한다.
        const exec = conn.query('select `temperature`, `reg_date` from `building_temperature` where `building_id`=? order by `reg_date` asc;',
        [bid],
        (err, rows) => {
            
            if (err) {
                pool.releaseConnection(conn);
                console.log('Mysql query error. aborted')
                res.json(resData)
                return
            }


            // 에러와 상관없이 내가 select 한 데이터가 없을 수 있으므로 rows 안을 확인
            if (rows[0]) {
                console.log('성공')
                resData.result = 'ok'
                rows.forEach((val) => {
                    resData.temp.push(val.temperature)
                    resData.reg_data.push(val.reg_date)
                })
            }

            // query 는 성공했으나 데이터가 없는 경우
            else {
                resData.result = 'none'
            }

            return res.json(resData)
        }
        )


    })
})


app.post('/chartdatafromdb', (req, res) =>{
    console.log('chartdatafromdb 호출됨')

    pool.getConnection((err, conn) => {
        
        const resData = {}
        resData.result = 'error'
        resData.temp = []
        resData.reg_data = []

        if (err) {
            // 에러가 발생해 DB 에서 데이터는 못가져오지만 web page 에 에러라는 것을 resData 보내줌
            pool.releaseConnection(conn);
            console.log('Mysql getConnection error. aborted')
            res.json(resData)
            return
        }

        // DB 에 데이터를 요청한다.
        const exec = conn.query('select `temperature`, `reg_date` from `building_temperature` order by `reg_date` asc;',
        (err, rows) => {
            
            if (err) {
                pool.releaseConnection(conn);
                console.log('Mysql query error. aborted')
                res.json(resData)
                return
            }


            // 에러와 상관없이 내가 select 한 데이터가 없을 수 있으므로 rows 안을 확인
            if (rows[0]) {
                console.log('성공')
                resData.result = 'ok'
                rows.forEach((val) => {
                    resData.temp.push(val.temperature)
                    resData.reg_data.push(val.reg_date)
                })
            }

            // query 는 성공했으나 데이터가 없는 경우
            else {
                resData.result = 'none'
            }

            return res.json(resData)
        }
        )


    })
})

app.listen(3000, () => {
    console.log('Server started at 3000')
    
})