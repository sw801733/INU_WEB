'use strict';

// typescript는 javascript 의 유연함을 방지하고자 타입을 정확히 지정해주기 위해 만든 언어

// http 는 Web server 와 Web browser 사이의 network 를 위한 명령어의 집합

// * 동기식 request
// 코드가 씌여진 순서에 따라 진행

// let request = new XMLHttpRequest();
// // WEB server 에서 달라고 요청하기 위한 GET 명령어, 1_helloworld.html 을 요청
// request.open('GET', 'http://127.0.0.1:3000/HTML_CSS/1_helloworld.html', false);
// // 127.0.0.1, 나 자신, 즉 Web server 와 Web browser 가 같은 컴퓨터에 있을 때 사용하는 고유 주소
// request.send(null);

// // server 로 부터 받은 답장이 status 에 나타나고
// // 받은 문자는 responseText 에 저장
// // 보낸 GET 에 대한 응답을 받은 경우
// if (request.status === 200) {
//     console.log(request.responseText);
// }



// for (let i = 0; i < 10; i++) {
//     console.log(i);
// }
// // 위의 반복문은 request 로 인한 network 과정과 무관한 일이지만 위의 처리가 모두 끝내고
// // 반복문이 실행된다. 이는 비효율적일 수 있다. ==> 동기(synchronous) request
// // 이를 위해 비동기(asynchronous) request 처리




// * Promise
// const a = new Promise((resolove, reject) => {
//     //-----------------해야 할 일 지정
//     console.log('hello');

//     // 해야할 일이 끝나면 resolve를 호출
//     // 실패하면 reject 호출
//     // resolove('ended');
//     setTimeout(() => {
//         resolove('ended');
//     }, 3000);
//     // 3초 뒤에 resolve 를 호출해 Promise 를 끝냄
// }); 

// // Promise에서 할 일을 끝내고 resolve 를 호출받으면 다음 then 을 실행
// // v 에는 resolve에서의 인자가 들어가게 된다. 여기서는 ended
// a
// .then((v)=> {
//     console.log(`then received : ${v}`);
// });

// for (let i = 0; i < 10; i++) {
//     console.log(i);
// }
// 동기 방식에서는 for 문은 위의 과정이 모두 끝난 뒤 처리되지만
// 비동기 방식은 Promise 에서 resolve 는 3초 뒤에 호출되므로 a.then 은 실행되지 않고 기다리고
// 그와 관련없는 for 문은 실행된다. 따라서 실행 순서가 hello, 0,1,2..9, ended 로 된다.




// * 비동기식 XMLHttpRequest
// 코드가 씌여진 순서와는 상관없이 진행

// let request = new XMLHttpRequest();

// // 서버로부터 응답이 왔을 때 실행할 코드를 지정 === 이벤트 핸들러를 지정

// 응답을 처리
// .onload : 요청에 대한 응답이 loading 될 때, 비동기식이므로 응답이 왔을 때 arrow function 을 실행한다.
// open 으로 보내기 전에 미리 처리할 핸들러를 지정해놔야한다. 보내고 지정하면 놓칠 수도 있다.
// request.onload = () => {
//     if (request.status === 200) {
//         console.log('응답이 제대로 왔음');
//         console.log(request.responseText);
//     }
//     else {
//         console.log('응답이 제대로 오지 않았음');
//     }
// };

// // open 의 세번째 인자는 비동기식인지 물어보는 것, false === 동기식 true === 비동기식
// request.open('GET', 'http://127.0.0.1:3000/HTML_CSS/1_helloworld.html', true);
// request.send(null);


// for (let i = 0; i < 10; i++) {
//     console.log(i);
// }

// 비동기식으로 for문이 먼저 실행되고 응답이 돌아왔을 때 onload 실행


// XMLHttpRequest : Event handler ---> 비동기 처리
// Promise : fetch ---> Promise


// * Promise 를 이용한 비동기 서버 요청
// fetch : 가져오다, 서버로부터 web page 를 가져오다.
// a 는 Promise 가 된다.

// // 변수로 받지 않고도 가능
// fetch('http://127.0.0.1:3000/HTML_CSS/1_helloworld.html') // 반환값이 Promise
// // fetch 로 제대로 가져오면 then 그렇지 않으면 catch

// .then((response) => { // fetch 가 성공하여 서버로부터 응답이 제대로 왔을 때 실행
//     console.log(`서버 응답 도착`);
//     return response.text(); // 반환값이 문자열이 아닌 또 다른 Promise
// })
// .then((data) => { // 또 다른 Promise 인 response.text() 가 성공적으로 resolve 호출될 경우 응답을 문자열로 넘겨준다.
//     console.log(`문자열로 바꾼 응답 : ${data}`);
// })
// .catch((err) => {
//     console.log(`서버 응답 에러 : ${err}`);
// }); 

// // XMLHttpRequest 와 달리 then, catch 등이 순서대로 나열되기 때문에 더 직관적으로 코드를 볼 수 있다.

// // for 문을 넣는 이유 : 비동기 요청과 상관없는 부분이 별도로 실행되는 지 확인하기 위해서
// for (let i = 0; i < 10; i++) {
//     console.log(i);
// }






// * async : syntactic sugar for promise
// promise 를 쓰기 어려우니 이를 ({문법적으로 쉽게 쓰기 위한 방법} : syntactic sugar)
// ex) c 언어에서 if 문 대신 삼항연산자를 사용하는 것

// syntactic sugar 사용하지 않은 Promise 사용

// function fetchUser() {
//     return new Promise((resolve, reject) => {
//         console.log('Promise 실행');
//         resolve('실헹 끝');
//     });
// }

// const a = fetchUser();

// a
// .then((v) => {
//     console.log(`fetchUser result : ${v}`);
// }); 


// async로 Promise 에 대한 syntactic sugar 사용
// 위에서는 fetchUser 함수 안에서 Promise 를 생성해 반환하지만
// async 를 사용하면 함수는 Promise 가 된다.

// async function fetchUser(a) {
//     console.log('Promise 실행');

    
//     if (a >= 0) {
//         return '실행 끝' // resolve에 해당
//     }
//     else {
//         throw new Error('음수') // reject 에 해당
//     }
    
// }


// // ------ 아래는 변하지 않음
// const a = fetchUser(10);

// a
// .then((v) => {
//     console.log(`fetchUser result : ${v}`);
// })
// .catch((error) => {
//     console.log(`에러 발생 : ${error}`);
// })
// .finally(() => {
//     // resolve 나 reject 에 상관없이 
//     // Promise 가 종료되면서 공통적으로 실행되야 되는 부분
//     console.log('Promise 끝 from finally')
// })



// * await
// await 는 async 함수 내에서만 다른 promise의 종료를 기다릴 때 사용 가능

function B() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('B가 실행됨');
            resolve(45);
        }, 3000);
    });
}

async function fetchUser(a) {
    console.log('Promise 실행');

    const k = await B();
    // await 로 B 의 Promise 가 끝나기를 기다려
    // B의 Promise 의 결과를 확인 없이 실행되는 것을 방지

    if (k >= 0) {
        return '실행 끝' // resolve에 해당
    }
    else {
        throw new Error('음수') // reject 에 해당
    }
    
}

const a = fetchUser(10);

a
.then((v) => {
    console.log(`fetchUser result : ${v}`);
})
.catch((error) => {
    console.log(`에러 발생 : ${error}`);
})
.finally(() => {
    // resolve 나 reject 에 상관없이 
    // Promise 가 종료되면서 공통적으로 실행되야 되는 부분
    console.log('Promise 끝 from finally')
})