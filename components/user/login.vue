<template>
  <div class="login1">
    <el-radio-group size="small" />
    <el-form ref="from" :model="from" :rules="rules">
      <el-form-item prop="username">
        <el-input v-model="from.username" placeholder="手机号" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="from.password" placeholder="密码" />
      </el-form-item>
      <el-button ref="fromSub" type="primary" class="btn" @click="headerLogin">
        登录
      </el-button>
    </el-form>
  </div>
</template>

<script>
// import { login } from '@/api/index.js'
export default {
  data () {
    return {
      from: {
        username: '13800138000',
        password: '13800138000'
      },
      rules: {
        username: [
          { required: true, message: '请输入正确的手机号', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入正确的密码', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    headerLogin () {
      // login(this.from)ss
      //   .then((res) => {
      //     console.log(res)
      //   })
      // 发射一个事件，setUser是一个事件名称
      this.$store.dispatch('user/setUser', this.from)
        .then((res) => {
          // 传过去之后需要用到this.$store来使用
          const token = localStorage.getItem('userinfo')
          // 第一次肯定没有token值啊
          console.log(res)
          if (token) {
            this.$message.success('登录成功')
            this.$router.push('/')
          }
        })
    }
  }
}
</script>

<style lang = 'less' scoped>
.login1{
  /* margin: 10px; */
  padding: 10px;
  .btn{
    width: 100%;
  }
}

</style>
