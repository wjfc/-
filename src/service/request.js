import axios from 'axios'

const request = axios.create({});

// // 响应拦截
// request.interceptors.response.use(
//   response => {
//     const {
//       headers,
//       data = {}
//     } = response;
//    console.log(headers)
//    console.log(data)
//     return response;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// )

export default request;