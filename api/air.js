import axios from 'axios'

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
