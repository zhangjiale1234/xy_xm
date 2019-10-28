<template>
  <div class="login1">
    <el-radio-group size="small" />
    <el-form ref="from" :model="from" :rules="rules">
      <el-form-item prop="username">
        <el-input v-model="from.username" placeholder="手机号" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="from.username" placeholder="密码" />
      </el-form-item>
      <el-button ref="fromSub" type="primary" class="btn" @click="headerRegister">
        登录
      </el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      from: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入正确的手机号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入正确的密码', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
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
