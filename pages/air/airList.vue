<template>
  <div class="flights">
    <div class="flights_main">
      <!-- 筛选模块开始 -->
      <FlightsFilter
        v-if="flightsData.flights.length"
        :options="flightsData.options"
        :info="flightsData.flightsInfo"
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
        :page-sizes="[2,4,6,8]"
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
      2
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
      // 发送筛选数据
      flightsData: {
        flights: [],
        // 筛选信息
        options: {},
        // 飞机的信息
        flightsInfo: {}
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
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
            this.Pagination = this.flightsList.slice(
              ((this.pageIndex - 1) * this.pageSize),
              (this.pageIndex * this.pageSize)
            )
          }
        })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.init()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pageIndex = val
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
  flex: 2;
}
</style>
