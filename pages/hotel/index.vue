<template>
  <div class="hotel_bottom">
    <div>
      <!-- 酒店筛选 -->
      <HoutelBHeader v-if="assets.length" class="hotel_b_header" :options="options" />
    </div>
    <div class="hotel_item">
      <!-- 酒店信息 -->
      <HoutelItem v-if="paging.total!==0" :hotel-info="hotelInfo" />
    </div>
    <!-- 分页 -->
    <div class="paging">
      <el-pagination
        :current-page="paging.pageIndex"
        :page-sizes="[2,4, 6, 10]"
        :page-size="paging.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paging.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import HoutelBHeader from '@/components/hotels/HoutelBHeader.vue'
import HoutelItem from '@/components/hotels/HoutelItem.vue'
export default {
  components: {
    HoutelBHeader, HoutelItem
  },
  data () {
    return {
      hotelInfo: {},
      options: {},
      assets: [],
      paging: {
        // 当前页码
        pageIndex: 1,
        pageSize: 20,
        total: 0
      }
    }
  },
  mounted () {
    this.$axios.get('/hotels/options')
      .then((res) => {
        this.options = res.data.data
        this.assets = res.data.data.assets
        console.log(res)
      })
      // 发送请求拿数据
    const limit = this.paging.pageIndex
    const start = this.paging.pageSize
    this.$axios.get(`/hotels?_start=${limit}&_limit=${start}`).then((res) => {
      // 赋值
      this.hotelInfo = res.data.data
      // 总条数
      this.paging.total = res.data.total
    })
  },
  methods: {
    handleSizeChange (value) {
      console.log(value)
    },
    handleCurrentChange (value) {
      console.log(value)
    }
  }
}
</script>

<style lang = 'less' scoped>
.hotel_bottom{
    width: 1000px;
    margin: 0 auto;
}

</style>
