// 기본적으로 함수는 존재하는 파일 내에서만 유효하지만
// 이를 다른 파일들에서도 사용하고 싶은 경우 모듈로 만들어서 사용한다.
// JS에서 .js 파일은 이미 모듈이므로 함수를 다른 곳에서 사용가능 하도록 설정만 하면 된다.


function showLogMessage(msg) {
    console.log('--------------------------------------')
    console.log(`로그 메세지는 : ${msg}`)
    console.log('--------------------------------------')
}

function showLogMessage2(msg) {
    console.log('======================================')
    console.log(`로그 메세지2는 : ${msg}`)
    console.log('======================================')
}

const precious_value = 78

// 다른 파일에서도 사용가능 하도록 설정
// .exports 이후 다른 파일에서 사용할 이름을 설정하고 넘겨줄 것을 값으로 지정한다.
module.exports.showLogMessage = showLogMessage
module.exports.secondLog = showLogMessage2
module.exports.pvalue = precious_value
