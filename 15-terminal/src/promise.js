// 最近复习promise 对象的时候，发现promise链式编程时then返回值不太懂的问题，查阅资料后，总结如下：

// then()的返回值：

// 1.回调函数return 任意数值    或者 不返回数据（返回ndefined） 时，then()方法返回的是一个状态为Fulfilled状态的promise对象

// 2.回调函数return promise*  返回一个promise*对象时， then()方法返回的是这个promise对象  （状态由这个promise*决定  可能是Fulfilled  也可能是Rejected）

// 3.回调函数throw error  抛出错误， then()方法返回的是一个状态为Rejected的promise对象

// 4.then()方法没有执行里面的任何一个回调函数时，返回当前这个promise对象




// Promise.reject(1).then(function() {
//     // not called
//   }, function(error) {
//     console.error(error); // Stacktrace
//     return Promise.resolve(1)
//   });


// var promise = new Promise(function(resolve, reject) {
//     // 异步处理
//     // 处理结束后、调用resolve 或 reject
// });

// let http = new Promise(function(o,e){
//     let v = e('cccc')
//     console.log(v);
//     return 11
// });

// http.then(function(dd){
//     console.log(dd)
//     return 22;
// }).then(function(x){
//     console.log(x)
// }).catch(function(e){
//     console.log(e)
//     return e;
// });


// var example = new Promise((fulfill, reject)=>{
//     let i = 1;
//     reject(i);
// })
// example
// .catch(()=>{console.log('我是第一个catch的回调函数'); return 1;})
// .then(() =>{console.log('我是第一个then的回调函数');})
// .catch(()=>{console.log('我是第二个catch1的回调函数')})
// .catch(()=>{console.log('我是第二个catch2的回调函数')})
// .then(() => {console.log('我是第二个then的回调函数')})

var example = new Promise((fulfill, reject)=>{
    let i = 1;
    console.log(reject.toString());
})
example
.catch(function (){console.log('我是第一个catch的回调函数'); return 1;})