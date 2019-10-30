import axios from 'axios'
// let aa=axios.create({
//   baseURL:"1111"
// })

axios.defaults.baseURL = 'http://127.0.0.1:1337'
export const getSwiper = () => {
  return axios({
    url: 'http://localhost:1337/scenics/banners'
  })
}
// export const register = (data) => {
//   return axios({
//     url: 'http://127.0.0.1:1337/accounts/register',
//     method: 'post',
//     data
//   })
// }

export const getCaptcha = (data) => {
  return axios({
    url: 'http://127.0.0.1:1337/captchas',
    data
  })
}
export const login = (data) => {
  return axios({
    method: 'post',
    url: '/accounts/login',
    data
  })
}

export default axios
