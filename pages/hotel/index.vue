<template>
  <div class="hotel_bottom">
    <div>
      <!-- 酒店筛选 -->
      <HoutelBHeader
        v-if="assets.length"
        class="hotel_b_header"
        :options="options"
        @headleTypesChange="headleTypesChange"
        @headlebrandsChange="headlebrandsChange"
        @headleAssetsChange="headleAssetsChange"
      />
    </div>
    <div class="hotel_item">
      <!-- 酒店信息 -->
      <HoutelItem v-if="paging.total!==0" :hotel-info="fliterList" />
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
    HoutelBHeader,
    HoutelItem
  },
  data () {
    return {
      // 酒店信息
      hotelInfo: {},
      // 传给hotelitem的值
      options: {},
      assets: [],
      // 分页开始
      paging: {
        // 当前页码
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      // 过滤后的数组
      fliterList: [],
      // 被选中的类型id
      selectTypes: [],
      // 被选中的酒店设施
      selectFacilities: [],
      // 选中后的酒店品牌
      selectBranch: []
    }
  },
  mounted () {
    this.$axios.get('/hotels/options').then((res) => {
      this.options = res.data.data
      this.assets = res.data.data.assets
      console.log(res)
    })
    // 发送请求拿数据
    this.init()
  },
  methods: {
    // limit  拿多少条
    // start从第几条开始拿
    init () {
      this.$axios
        .get(
          `/hotels?_start=${this.paging.pageIndex}&_limit=${this.paging.pageSize}`
        )
        .then((res) => {
          this.fliterList = res.data.data
          console.log(res)
          // 赋值,全部值
          this.hotelInfo = res.data.data
          // 总条数
          this.paging.total = res.data.total
        })
    },
    // 筛选类型的函数
    selectType () {
      this.selectTypes.forEach((e) => {
        this.$axios
          .get(
            `/hotels?_start=${this.paging.pageIndex}&_limit=${this.paging.pageSize}`,
            { params: { hoteltype: e } }
          )
          .then((res) => {
            this.paging.total = res.data.total
            this.fliterList = res.data.data
          })
      })
    },
    handleSizeChange (value) {
      this.paging.pageSize = value
      // 筛选类型的函数
      this.selectType()
      // console.log(value)
    },
    handleCurrentChange (value) {
      this.paging.pageIndex = value
      // 点击下一页后要继续发送hoteltype这个参数
      // 筛选类型的函数
      this.selectType()
    },
    headleTypesChange (types) {
      // 存储被选中的类型的id数组
      this.selectTypes = types
      // 循环发送请求
      types.forEach((e) => {
        this.$axios
          .get(
            `/hotels?_start=${this.paging.pageIndex}&_limit=${this.paging.pageSize}`,
            { params: { hoteltype: e } }
          )
          .then((res) => {
            this.paging.total = res.data.total
            this.fliterList = res.data.data
          })
      })
    },
    headlebrandsChange (branch) {
      this.selectBranch = branch
      branch.forEach((e) => {
        this.$axios
          .get(
            `/hotels?&_start=${this.paging.pageIndex}&_limit=${this.paging.pageSize}`,
            { params: { hotelbrand: e } }
          )
          .then((res) => {
            this.paging.total = res.data.total
            this.fliterList = res.data.data
          })
      })
      // 如果类型id数组长度等于0，代表全部都没选中了，重新刷新一下页面
      if (branch.length === 0) {
        this.init()
      }
    },
    headleAssetsChange (facilities) {
      facilities.forEach((e) => {
        this.$axios
          .get(
            `/hotels?&_start=${this.paging.pageIndex}&_limit=${this.paging.pageSize}`,
            { params: { hotelasset: e } }
          )
          .then((res) => {
            console.log(res)
            this.paging.total = res.data.total
            this.fliterList = res.data.data
          })
      })
    }
  }
}
</script>

<style lang = 'less' scoped>
.hotel_bottom {
  width: 1000px;
  margin: 0 auto;
}
</style>
