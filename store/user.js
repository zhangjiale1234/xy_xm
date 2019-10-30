export const state = () => ({
  // 返回值的对象
  userinfo: {
    token: '',
    user: {}
  }
})

export const mutations = {
  setUser (state, userinfo) {
    state.userinfo = userinfo
  }
}
export const actions = {
  setUser (context, form) {
    this.$axios.post('/accounts/login', form)
      .then((res) => {
        // 调用登录接口之后把值传给mutation
        context.commit('setUser', res.data)
        // 把 用户信息 存入 本地存储中
        localStorage.setItem('userinfo', JSON.stringify(res.data))
      })
  }
}
