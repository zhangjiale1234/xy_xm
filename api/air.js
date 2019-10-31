import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:1337'
export const getCity = (params) => {
  return axios({
    url: `/airs/city`,
    params: { name: params }
  })
}

export const selectAir = (params) => {
  return axios({
    url: '/airs',
    params
  })
}

export default axios
