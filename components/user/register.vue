<template>
  <div class="register">
    <el-radio-group size="small" />
    <el-form ref="from" :model="from" :rules="rules">
      <el-form-item prop="username">
        <el-input v-model="from.username" placeholder="手机号" />
      </el-form-item>
      <el-input v-model="from.captcha" placeholder="请输入验证码" style="margin-bottom:20px;">
        <template slot="append">
          获取验证码
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
export default {
  data () {
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {

      from: {
        username: '',
        nickname: '',
        captcha: '',
        password: '',
        password2: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入正确的手机号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入正确的密码', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请输入正确的昵称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '请输入正确的昵称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    headerRegister () {
      this.$refs.from.validate((valid) => {
        if (valid) {
          console.log('发送请求成功了')
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
