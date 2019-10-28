import axios from 'axios'

export const getSwiper = () => {
  return axios({
    url: 'http://localhost:1337/scenics/banners'
  })
}

export default axios
