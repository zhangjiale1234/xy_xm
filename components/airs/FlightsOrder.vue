<template>
  <div>
    <!-- 1 乘机人 -->
    <input type="hidden" :value="price">
    <div class="fly_people">
      <div class="fly_people_title">
        乘机人
      </div>
      <div class="fly_people_content">
        <el-form label-position="top" label-width="80px">
          <div v-for="(item,index) in users" :key="index" class="user_item">
            <!-- 循环显示，为了方便后面的添加和减少联系人 -->
            <el-form-item label="乘机人类型">
              <el-row>
                <el-col :span="6">
                  <el-select value="成人" placeholder>
                    <el-option label="成人" value="成人" />
                  </el-select>
                </el-col>
                <el-col :span="18">
                  <el-input v-model="item.username" />
                </el-col>
              </el-row>
            </el-form-item>
            <div v-if="index>0" class="reduce" @click="headleReduce(index)">
              -
            </div>
            <el-form-item label="证件类型">
              <el-row>
                <el-col :span="6">
                  <el-select value="身份证" placeholder>
                    <el-option label="身份证" value="身份证" />
                  </el-select>
                </el-col>
                <el-col :span="18">
                  <el-input v-model="item.id" />
                </el-col>
              </el-row>
            </el-form-item>
          </div>
          <el-form-item>
            <el-button type="primary">
              <div @click="headleAdd">
                添加乘机人
              </div>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 1 乘机人 -->
    <!-- 2 保险 -->
    <div class="insurance">
      <div class="insurance_title">
        保险
      </div>
      <div class="insurance_content">
        <div class="insurance_row">
          <el-checkbox
            v-for="(item,index) in ticket"
            :key="index"
            label="备选项1"
            border
            @change="headleInsuranceChange(item.id)"
          >
            {{ item.type }}:{{ item.price }}/份×1最高赔付{{ item.compensation }}万
          </el-checkbox>
        </div>
      </div>
    </div>
    <!-- 2 保险 -->
    <!-- 3 联系人 -->
    <div class="contact">
      <div class="contact_title">
        联系人
      </div>
      <div class="contact_content">
        <el-form label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="form.contactName" />
          </el-form-item>

          <el-form-item label="手机">
            <el-input v-model="form.contactPhone">
              <template slot="append">
                <div @click="headleSendCaptcha">
                  发送验证码
                </div>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model="form.captcha" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="headleCreate">
              创建订单
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 3 联系人 -->
  </div>
</template>

<script>
export default {
  props: ['ticket', 'ticketinfo'],
  data () {
    return {
      // 联系人的对象数组
      users: [
        {
          username: '123',
          id: '4563'
        }
      ],
      // form{
      form: {
        // 身份证id
        idNumber: '13800138000',
        // 存放保险id的数组
        insurances: [],
        // 验证码
        captcha: '000000',
        // 联系人名字
        contactName: '13800138000',
        // 联系人电话
        contactPhone: '13800138000',
        // 是否需要发票
        invoice: false,
        // 座位id
        seat_xid: this.$route.query.seat_xid,
        // 航班id
        air: this.$route.params.id
      }
    }
  },
  computed: {
    price () {
      let price = 0
      price += this.ticketinfo.base_price
      // 根据id去保险对象里面里面找价格
      this.form.insurances.forEach((e) => {
        // e===id形式 v.id
        const index = this.ticket.findIndex(v => v.id === e)
        if (index !== -1) {
          const item = this.ticket[index]
          price += item.price
        }
      })
      price *= this.users.length
      // 像父组件发射事件
      this.$emit('priceChange', price)
      return price
    }
  },

  mounted () {
    console.log(this.price)
  },
  methods: {
    headleReduce (index) {
      this.users.splice(index, 1)
    },
    headleAdd () {
      // 点击之后增加一个表单信息
      this.users.push({ username: '', userid: '' })
    },
    headleInsuranceChange (id) {
      // 单选框按钮的id，点击单选框后改变数组里面的值
      const i = this.form.insurances.findIndex(e => e === id)
      if (i !== -1) {
        this.form.insurances.splice(i, 1)
      } else {
        this.form.insurances.push(id)
      }
    },
    // 发送验证码
    headleSendCaptcha () {
      const tel = this.form.contactPhone
      this.$axios.post('/captchas', { tel })
        .then((res) => {
          console.log(res)
        })
    },
    // 创建订单
    headleCreate () {
      // 点击创建 ，验证表单
      // 遍历对象，验证表单
      for (const key in this.form) {
        if (this.form[key] === '') {
          this.$message.warning('请输入合法的值')
        }
      }
      // 获取订单id
      // const id = this.ticketinfo.id
      // 获取token
      const token = this.$store.state.user.userinfo.token
      const form1 = {
        users: this.users,
        insurances: this.form.insurances,
        contactName: this.form.contactName,
        contactPhone: this.form.contactPhone,
        invoice: this.form.invoice,
        seat_xid: this.form.seat_xid,
        air: this.form.air,
        captcha: this.form.captcha
      }
      this.$axios
        .post('/airorders', form1, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((res) => {
          setTimeout(() => {
            this.$message.success('创建订单成功')
            this.$router.push({ path: '/air/pay/', query: { id: res.data.data.id } })
          }, 1000)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.fly_people_title,
.insurance_title,
.contact_title {
  padding: 20px 0;
  font-size: 30px;
}
.insurance_row {
  margin: 10px 0;
}

.user_item {
  position: relative;
  .reduce {
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: #eee;
    border: 1px solid #ccc;
    border-radius: 10px;
    top: 117px;
    right: 0;
    text-align: center;
    line-height: 20px;
    cursor: pointer;
  }
}
</style>
