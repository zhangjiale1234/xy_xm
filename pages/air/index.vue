<template>
  <div class="air">
    <div class="contarn">
      <div class="ari_title">
        <span class="iconfont iconfeiji" />
        <p>国内机票</p>
      </div>

      <div class="air_main">
        <div class="main_left">
          <div class="main_header">
            <div :class="currentIndex === 0?'active':''">
              单程
            </div>
            <div>往返</div>
          </div>
          <div class="main_body">
            <div class="body_input">
              <el-form ref="form" label-width="100px" :rules="rules">
                <el-form-item label="出发城市" prop="deparCity">
                  <el-autocomplete
                    v-model="form.deparCity"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="出发城市"
                    @select="handleSelect"
                  />
                  <div class="change">
                    <span @click="headerChange">换</span>
                  </div>
                </el-form-item>
                <el-form-item label="到达城市" prop="destCity">
                  <el-autocomplete
                    v-model="form.destCity"
                    placeholder="到达城市"
                    :fetch-suggestions="querySearchAsync"
                    label="到达城市"
                    @select="handleSelect2"
                  />
                </el-form-item>
                <el-form-item label="活动时间" prop="deparDate">
                  <el-col :span="11">
                    <el-date-picker
                      v-model="form.deparDate"
                      type="date"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                      style="width: 200px;"
                    />
                    <!-- format="yyyy-MM-dd"可以改变显示格式 -->
                  </el-col>
                </el-form-item>
                <!-- <el-form-item style="margin-left:0px"> -->
                <el-button type="primary" style="width:100% " @click="headerSelect">
                  查询
                </el-button>
                <!-- </el-form-item> -->
              </el-form>
            </div>
          </div>
        </div>
        <div class="air_img">
          <img src="http://157.122.54.189:9093/images/pic_sale.jpeg" alt>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCity } from '@/api/air.js'
export default {
  data () {
    return {
      // 搜索城市数组
      restaurants: [],
      form: {
      // 出发城市
        deparCity: '',
        // 出发城市码
        deparCode: '',
        // 目标城市
        destCity: '',
        // 目标城市码
        destCode: '',
        // 日期
        deparDate: ''
      },
      currentIndex: 0,
      // 添加规则
      rules: {
        // deparCity: [
        //   { required: true, message: '请输入出发城市', trigger: 'blur' }
        // ],
        // destCity: [
        //   { required: true, message: '请输入到达城市', trigger: 'blur' }
        // ],
        // deparDate: [
        //   { required: true, message: '请输入出发日期', trigger: 'blur' }
        // ]
      }
    }
  },
  // mounted () {
  //   // this.restaurants = this.loadAll()
  // },
  methods: {
    headerChange () {
      // 点击交换之后将两边的值进行替换，es6语法
      [this.form.deparCity, this.form.deparCode, this.form.destCity, this.form.destCode] =
      [this.form.destCity, this.form.destCode, this.form.deparCity, this.form.deparCode]
    },
    headerSelect () {
      // 点击搜索
      if (this.form.deparCity && this.form.destCity && this.form.deparDate) {
        // 判断是否有值，有值在跳转页面发送请求
        this.$router.push({ path: '/air/airList', query: this.form })
      } else {
        this.$message.warning('请输入正确的机票信息')
        return false
      }
    },
    querySearchAsync (queryString, cb) {
      console.log(queryString)

      if (queryString) {
        // this.$axios.get('/airs/city', { params: { name: queryString } })
        //   .then((res) => {
        // 调用axios
        getCity(queryString)
          .then((res) => {
            console.log(res)
            //     // 让值变成value：值得形式
            res.data.data.forEach((e) => {
              e.value = e.name
            })
            // 赋值给restaurants
            this.restaurants = res.data.data
            // 输入之后调用的回调函数 实现到弹出选项卡的效果，将数组传入
            cb(res.data.data)
          })
      }
    },
    handleSelect (item) {
      // item = 搜索城市的信息对象
      // 点击城市的时候获取出发到城市码

      this.form.deparCode = item.sort
      console.log(item)
    },
    handleSelect2 (item2) {
      // 点击城市的时候获取到到达城市码
      console.log(item2)
      this.form.destCode = item2.sort
      console.log(this.form)
    }
  }
}
</script>

<style lang='less' scoped>
.main_body{
  margin-top: 30px;
}
.air {
  margin: 0 auto;
  .contarn {
    width: 1000px;
    margin: 0 auto;
    .ari_title {
      display: flex;
      font-size: 20px;
      color: orange;
      align-items: center;
    }
    .air_main {
      width: 1000px;
      height: 390px;
      // border: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      .main_left {
        width: 400px;
        height: 348px;
        border: 1px solid #ccc;
        .main_header {
          display: flex;
          justify-content: center;
          align-items: center;
          background: #eee;
          text-align: center;
          > div {
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            flex: 1;
            height: 50px;
            &.active{
              background-color: rgba(255, 165, 0,.6);
            }
          }
        }
      }
      .body_input{
        position: relative;
        margin:10px;
        .change{
          width: 30px;
          height: 64px;
          border: 1px solid #ccc;
          border-left:none;
          position: absolute;
          top: 19px;
          right: 11px;
          span{
            cursor: pointer;
            position: absolute;
            top: 20px;
            left: 21px;
            background-color: #ccc;
            color: #ffffff;
            line-height: 20px;
            width: 20px;
            height: 20px;
            // // line-height: 20px;
            text-align: center;
          }
        }
      }
      .air_img {
        flex: 1;
        width: 100%;
        margin:0 5px;
      }
    }
  }
}
</style>
