<template>
  <div class="airList">
    <div class="contain">
      <div class="contain_left">
        <div class="main_nav">
          <div class="nav_select">
            <div class="item_path">
              单程：上海-广州/2019-10-31
            </div>
            <div class="select_item">
              <el-select placeholder="请选择" size="mini">
                <el-option
                  v-for="item in [{ value: '起飞机场', label: '黄金糕' }]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div class="select_item">
              <el-select placeholder="请选择" size="mini">
                <el-option
                  v-for="item in [{ value: '起飞时间', label: '黄金糕' }]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div class="select_item">
              <el-select placeholder="请选择" size="mini">
                <el-option
                  v-for="item in [{ value: '航空公司', label: '黄金糕' }]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div class="select_item">
              <el-select placeholder="请选择" size="mini">
                <el-option
                  v-for="item in [{ value: '机型', label: '黄金糕' }]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <div class="nav_select2">
            筛选：
            <el-button type="primary" round size="mini">
              撤销
            </el-button>
          </div>
        </div>
        <div class="main">
          <div class="main_title">
            <span>航空信息</span>
            <span>起飞时间</span>
            <span>到达时间</span>
            <span>价格</span>
          </div>
          <div class="main_body">
            <div class="body_item">
              <span>东航mu5316</span>
              <div class="item_date">
                <p>20:30</p>
                <p>白云机场</p>
              </div>
              <div class="item_date">
                <p>22:30</p>
                <p>虹桥机场</p>
              </div>
              <span>
                ￥
                <span class="price">810</span>起
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="contain_right">
        <div class="contain_call">
          <div class="call_icon">
            <!-- 图标 -->
            <div class="icon_item">
              <span class="iconfont iconweibiaoti-_huabanfuben" style="color:#409eff" />
              <span>航协认证</span>
            </div>
            <div class="icon_item">
              <span class="iconfont iconbaozheng" style="color:#008000" />
              <span>出行认账</span>
            </div>
            <div class="icon_item">
              <span class="iconfont icondianhua" style="color:#409eff" />
              <span>7x24</span>
            </div>
          </div>
          <!-- 客服电话 -->
          <p>免费客服电话：123456789</p>
        </div>
        <div class="contain_history">
          <div class="history_title">
            <p>历史记录</p>
          </div>
          <div class="history_item">
            <div class="item_left_l">
              <p>广州-上海</p>
              <p>2019-10-31</p>
            </div>
            <div class="item_right">
              <span>选择</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      airList: []
    }
  },
  mounted () {
    console.log(this.$route)
  }
}
</script>

<style lang='less' scoped>
*{
  margin: 0;
  padding: 0;
}
.airList {
  .contain {
    width: 1000px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .contain_left {
      margin: 10px 0;
      flex: 6;
      .main_nav {
        .nav_select {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .select_item {
            margin: 0 3px;
            width: 120px;
          }
        }
        .nav_select2 {
          margin: 10px 0;
        }
      }
      .main {
        .main_title {
          display: flex;
          justify-content: center;
          text-align: center;
          justify-content: space-around;
          border: 1px solid #ccc;
          color: #ccc;
          background-color: #f6f6f6;
          height: 40px;
          align-items: center;
          margin: 20px 0;
          font-size: 12px;
        }
      }
      .main_body {
        .body_item {
          width: 100%;
          // height: 60px;
          border: 1px solid #eee;
          display: flex;
          justify-content: space-around;
          align-items: center;
          margin: 12px 0;
          .item_date {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100px;
            justify-content: center;
            // .item_left{
            //   display: flex;
            //   flex-direction: column;
            //   justify-content: center;
              p:nth-child(1) {
                font-size: 25px;
              }
              p:nth-child(2) {
                font-size: 13px;
                margin-top: 5px;
                color: #ccc;
              }
            // }
          }
              .price{
                font-size: 20px;
                color: orange;
              }
        }
      }
    }
    .contain_right {
      margin:10px 20px;
      flex: 2;
      .contain_call{
        border: 1px solid #eee;
        .call_icon{
          display: flex;
          justify-content: space-around;
          .icon_item{
            padding: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            span:nth-child(1){
              font-size: 40px;
              color: blue;
            }
            span:nth-child(2){
              font-size: 12px;
              text-align: center;
            }
          }
        }
        p{
          width: 100%;
          height: 40px;
          background-color: #eee;
          line-height: 40px;
          padding: 0 3px;
          font-size: 14px;
          box-sizing: border-box;
          }
      }
      .contain_history{
        margin: 10px 0;
        border: 1px solid #ccc;
        .history_title{
          height: 30px;
          line-height: 30px;
          border-bottom: 1px solid #eee;
          padding: 4px;
        }
        .history_item{
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 10px;
          box-sizing: border-box;
          p:nth-child(1){
            font-size: 16px;
          }
            p:nth-child(2){
            font-size: 12px;
            color: #ccc;
          }
          .item_right{
            span{
              display: block;
              font-size: 12px;
              color: #fff;
              background-color:orange;
              text-align: center;
              height: 24px;
              width: 50px;
              line-height: 24px;
              border-radius: 5px;
            }
          }
        }
      }
    }
  }
}
</style>
