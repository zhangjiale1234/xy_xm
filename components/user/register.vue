<template>
  <div class="register">
    <el-radio-group size="small" />
    <el-form ref="from" :model="from" :rules="rules">
      <el-form-item prop="username">
        <el-input v-model="from.username" placeholder="手机号" />
      </el-form-item>
      <el-input v-model="from.captcha" placeholder="请输入验证码" style="margin-bottom:20px;">
        <template slot="append">
          <div @click="getCaptcha">
            获取验证码
          </div>
        </template>
      </el-input>
      <el-form-item prop="nickname">
        <el-input v-model="from.nickname" placeholder="昵称" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="from.password" placeholder="密码" />
      </el-form-item>
      <el-form-item prop="password2">
        <el-input v-model="from.password2" placeholder="确认密码" />
      </el-form-item>
      <el-button ref="fromSub" type="primary" class="btn" @click="headerRegister">
        注册
      </el-button>
    </el-form>
  </div>
</template>

<script>
import { getCaptcha } from '@/api/index.js'
export default {

  data () {
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.from.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      from: {
        username: '13800138000',
        nickname: '13800138000',
        captcha: '000000',
        password: '13800138000',
        password2: '13800138000'
      },
      rules: {
        username: [
          { required: true, message: '请输入正确的手机号', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入正确的密码', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请输入正确的昵称', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '请输入正确的昵称', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getCaptcha () {
      getCaptcha(this.from.username)
        .then((res) => {
          console.log(res)
        })
    },
    headerRegister () {
      this.$refs.from.validate((valid) => {
        if (valid) {
          // 过滤掉password2
          const { password2, ...resForm } = this.from
          // register(this.from)
          //   .then((res) => {
          //     console.log(res)
          //   })
          this.$axios.post('/accounts/register', resForm)
            .then(res => console.log(res))
        } else {
          this.$message.warning('请输入合法的用户信息')
          return false
        }
      })
    }
  }

}
</script>

<style lang = 'less' scoped>
.register{
  /* margin: 10px; */
  padding: 10px;
  .btn{
    width: 100%;
  }
}

</style>
