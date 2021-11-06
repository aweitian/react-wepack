import axios from 'axios';
import { Message, Loading } from 'element-ui'

let loading;
let loadingNum=0;

function startLoading() {    
    if(loadingNum==0){
        loading = Loading.service({
          lock: true,
          text: '加载中...',
          background:'rgba(255,255,255,0.5)',
        })
    }
    //请求数量加1
    loadingNum++;
}
function endLoading() {
    //请求数量减1
    loadingNum--
    if(loadingNum<=0){
        loading.close()
    }
}


// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
axios.interceptors.request.use(
    config => {
        startLoading();
        // 这个是 取消重点
        //config.cancelToken = new CancelToken((cancel) => {
        //  CancelStore._axiosPromiseCancel.push(cancel);
        //});

        // let url = config.url.replace(config.baseURL, '');
        // let code = config.code;
        // config.headers = getHeader() // 让每个请求携带自定义签名
        let token = localStorage.getItem('token') === null ? "" : localStorage.getItem('token');
        if (token) {
            config.headers['x-token'] = token;
        }
        return config
    },
    error => {
        console.log(error) // for debug 11
        Promise.reject(error)
    }
)

axios.interceptors.response.use(
    response => {
        endLoading();
        console.log(response);
        //这里的传递到回调都会少一层data ，原因暂时没查
        // console.log("in my mind");
        if (response.config.responseType == 'blob') {
            if (response.status == 200) {
                return response;
            } else {
                return Promise.reject(error);
            }
        } else {
            // console.log(response);
            const res = response.data;
            if (res.code === 200) {
                return response.data
            } else if (res.code === 407) {
                // console.log("Token失效跳转登陆页面");
                // sessionStorage.clear();
                // location.href="/ecloud-sp/logout";
            } else {
                if(!response.config.restrain) {
                    Message({
                        message: res.message,
                        type: 'error',
                        duration: 5 * 1000
                    })
                }
                return Promise.reject(res);
            }
        }

    },
    error => {
        Message({
            message: 'error >>> ' + error.message,
            type: 'error',
            duration: 5 * 1000
        })
        // console.log('err' + error) // for debug
        return Promise.reject(error);
        // if (axios.isCancel(error)) {
        //   // 为了终结promise链 就是实际请求 不会走到.catch(rej=>{});这样就不会触发错误提示之类了。
        //   return new Promise(() => {});
        // } else {

            return new Promise(function(a,b){
                b(res);
            });

            // return Promise.reject(error).catch(function(a){
            //     console.log('error in promise',a);
            //     Message({
            //         message: 'error >>> '+res.message,
            //         type: 'error',
            //         duration: 5 * 1000
            //     })
            // });
        // }

    }
)

export default {
    'get' : axios.get,
    'put' : axios.put,
    'delete' : axios.delete,
    'post' : axios.post
}