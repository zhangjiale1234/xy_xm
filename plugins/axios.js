import { Message } from 'element-ui'
export default function ({ $axios, redirect }) {
  // 请求失败的时候 会钻到这里！！
  $axios.onError((error) => {
    // 1 获取失败后的返回值
    const { statusCode, message } = error.response.data
    if (statusCode === 400) {
      // 密码错误
      Message.warning(message)
    }
  })
}
