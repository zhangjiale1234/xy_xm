<template>
  <div class="pay">
    <div class="pay_title">
      <p>支付总金额<span>￥{{ nonce_str }}</span></p>
    </div>
    <div class="pay_main">
      <div class="main_title">
        微信支付
      </div>
      <div class="main_code">
        <div class="code_left">
          <canvas id="canvas" />
          <span>扫一扫二维码支付</span>
        </div>
        <div class="code_fight">
          <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const QRCode = require('qrcode')
export default {
  data () {
    return {
      // 发送请求需要的数据
      order: {
        id: this.$route.query.id,
        nonce_str: 0,
        out_trade_no: ''
      }
    }
  },
  mounted () {
    const token = this.$store.state.user.userinfo.token
    console.log(token)
    this.$axios
      .get('/airorders/' + this.$route.query.id, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        // 成功后获取表单需要的数据
        this.order.nonce_str = res.data.price
        this.order.out_trade_no = res.data.payInfo.order_no
        // 画出二维码
        const canvas = document.getElementById('canvas')
        QRCode.toCanvas(canvas, res.data.payInfo.code_url, function (error) {
          if (error) { console.error(error) }
          console.log('success!')
        })
      })

    setInterval(() => {
      this.$axios.post('/airorders/checkpay', this.order,
        { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          console.log(res)
        })
    }, 3000)
  }
}
</script>

<style lang='less' scoped>
.pay{
  width: 1000px;
  margin: 0 auto;
  .pay_title{
    text-align: right;
    span{
      color: #fd5b0e;
      font-size: 20px;
    }
  }
  .pay_main{
    border-top: 3px solid #fd5b0e;
    .main_title{
      padding: 20px 15px;
      font-size: 20px;
    }
    .main_code{
      display: flex;
      justify-content: space-between;
      padding: 50px;
      .code_left{
        padding: 20px 20px;
        margin: 50px;
        box-sizing: border-box;
      width: 200px;
      height: 300px;
      border: 1px solid #ccc;
      span{
        text-align: center;
        padding-left: 10px;
      }
      }
    }

  }
}

</style>
