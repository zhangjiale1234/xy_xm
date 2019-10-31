<template>
  <div class="flights">
    <div class="flights_main">
      <!-- 筛选模块开始 -->
      <FlightsFilter
        v-if="flightsData.flights.length"
        :options="flightsData.options"
        :info="flightsData.flightsInfo"
        @headleInputChange="headleInputChange"
      />
      <!-- 筛选模块结束 -->
      <!-- 头部开始 -->
      <FlightsHead />
      <!-- 头部结束 -->
      <!-- 机票列表开始 -->
      <div class="air_list">
        <!-- 最终数据要显示分页完毕后的数据 -->
        <FlightsItem v-for="(item,index) in Pagination" :key="index" :flightslist="item" />
      </div>
      <!-- 机票列表结束 -->
      <!-- 分页 -->
      <el-pagination
        :current-page="pageIndex"
        :page-sizes="[2,4,6,50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
      <!-- 分页结束 -->
    </div>
    <!-- 侧边栏 开始 -->
    <div class="flights_aside">
      <div class="contain_history">
        <div class="history_title">
          <p>历史记录</p>
        </div>
        <div v-for="(item,index) in historyList " :key="index" class="history_item">
          <div class="item_left_l">
            <p>{{ item.departCity }}-{{ item.destCity }}</p>
            <p>{{ item.departDate }}</p>
          </div>
          <div class="item_right">
            <span>选择</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 侧边栏 结束 -->
  </div>
</template>

<script>
import FlightsFilter from '@/components/airs/FlightsFilter.vue'
import FlightsItem from '@/components/airs/FlightsItem.vue'
import FlightsHead from '@/components/airs/FlightsHead.vue'
// import { selectAir } from '@/api/air.js'
export default {
  components: {
    FlightsFilter, FlightsItem, FlightsHead
  },
  data () {
    return {
      // 飞机票的总数组
      // 筛选后的
      flightsList: [],
      // 搜索后获得的表单
      form: this.$route.query,

      // 分页开始
      // 分页后存储的数组
      Pagination: [],
      // 当前页码
      pageIndex: 1,
      pageSize: 2,
      total: 1,
      // 分页结束
      // 历史记录
      historyList: [],
      // 发送筛选数据
      flightsData: {
        // 总的
        flights: [],
        // 筛选信息
        options: {},
        // 飞机的信息
        flightsInfo: {}
      }
    }
  },
  mounted () {
    this.init(true)
    const historyStr = localStorage.getItem('historyArr')
    this.historyList = JSON.parse(historyStr)
    console.log(this.historyList)
  },
  methods: {
    init (isFirst) {
      if (isFirst) {
        this.$axios.get('/airs', { params: this.form })
          .then((res) => {
            console.log(res)
            if (res.status === 200) {
              // 总条数
              this.total = res.data.total
              // 发送飞机票信息列表
              this.flightsList = res.data.flights
              // 发送飞机信息
              this.flightsData.flightsInfo = res.data.info
              // 发送筛选数据
              this.flightsData.options = res.data.options
              // 一定要一个flights.判断他长度是否存在 存在才让他显示出来
              this.flightsData.flights = res.data.flights
              // 分页过滤，从第几页，拿多少条数据
              // 飞机票分页后的数组
              this.Pagination = this.flightsData.flights.slice(
                ((this.pageIndex - 1) * this.pageSize),
                (this.pageIndex * this.pageSize)
              )
            }
          })
      } else {
        this.total = this.flightsData.flights.length
        this.Pagination = this.flightsData.flights.slice(
          ((this.pageIndex - 1) * this.pageSize),
          (this.pageIndex * this.pageSize)
        )
      }
    },

    // 每页条数改变事件
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.init()
    },
    // 页码改变事件
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pageIndex = val
      this.init()
    },
    // 接收子组件传送过来的时间
    headleInputChange (optionsInfo) {
      console.log()

      const flightsList = this.flightsData.flights.filter((e) => {
        // 过滤机场信息
        return optionsInfo.airport === '' || optionsInfo.airport === e.org_airport_name
      })
      this.flightsData.flights = flightsList
      this.init()
    }

  }
}
</script>

<style lang="less" scoped>
*{
  margin: 0;
  padding: 0;
}
.flights {
  width: 1000px;
  margin: 0 auto;
  display: flex;
}
.flights_main {
  flex: 5;
}
.flights_aside {
  margin: 5px 15px;
  flex: 2;
        .contain_history{
        margin: 5px 0;
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
          border-bottom: 1px solid #eee;
          p:nth-child(1){
            font-size: 16px;
          }
            p:nth-child(2){
            font-size: 12px;
            color: #ccc;
          }
          .item_right{
            span{
              cursor: pointer;
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
</style>
