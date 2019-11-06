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
        @hearleChange="hearleChange"
        @headleLevelsChange="headleLevelsChange"
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
        pageSize: 4,
        total: 0
      },
      // 过滤后的数组
      fliterList: [],
      // 被选中的类型id
      selectTypes: [],
      // 被选中的酒店设施
      selectFacilities: [],
      // 选中后的酒店品牌
      selectBranch: [],
      // 选中的酒店登记
      leaves: []
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
    initChange (data) {
      this.$axios
        .get(
          `/hotels?&_start=${this.paging.pageIndex}&_limit=${this.paging.pageSize}`,
          { params: data }
        )
        .then((res) => {
          console.log(res)
          this.paging.total = res.data.total
          this.fliterList = res.data.data
        })
    },
    // 筛选类型的函数
    selectType (data) {
      if (data) {
        // this.selectTypes.forEach((e) => {
        this.$axios
          .get(
            `/hotels?_start=${this.paging.pageIndex}&_limit=${this.paging.pageSize}`,
            { params: data }
          )
          .then((res) => {
            this.paging.total = res.data.total
            this.fliterList = res.data.data
          })
        // })
      } else {
        this.$axios
          .get(
            `/hotels?_start=${this.paging.pageIndex}&_limit=${this.paging.pageSize}`
          )
          .then((res) => {
            this.fliterList = res.data.data
            // 赋值,全部值
            this.hotelInfo = res.data.data
            // 总条数
            this.paging.total = res.data.total
          })
      }
    },
    // 酒店等级
    headleLevelsChange (leves) {
      this.leaves = leves
      leves.forEach((e) => {
        const data = { hotellevel: e }
        this.initChange(data)
      })
      if (leves.length === 0) {
        this.init()
      }
    },
    handleSizeChange (value) {
      this.paging.pageSize = value
      // 筛选类型的函数
      this.selectType()
    },
    handleCurrentChange (value) {
      this.paging.pageIndex = value
      // 点击下一页后要继续发送hoteltype这个参数
      // 分页的时候判断一下是否有data有就拼接 ，没有就直接调用init
      const hotelbrand = this.selectBranch
      if (hotelbrand.length) {
        const data = hotelbrand.map((e) => {
          return { hotelbrand: e }
        })
        data.forEach((v) => {
          this.selectType(v)
        })
      } else {
        this.init()
      }

      // 筛选类型的函数
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
    // 酒店品牌
    headlebrandsChange (branch) {
      this.selectBranch = branch
      branch.forEach((e) => {
        const data = { hotelbrand: e }
        this.initChange(data)
      })
      // 如果类型id数组长度等于0，代表全部都没选中了，重新刷新一下页面
      if (branch.length === 0) {
        this.init()
        this.paging.pageIndex = 1
      }
    },
    headleAssetsChange (facilities) {
      this.selectFacilities = facilities
      facilities.forEach((e) => {
        // 参数
        const data = { hotelasset: e }
        // 调用
        this.initChange(data)
      })
      if (facilities.length === 0) {
        this.init()
      }
    },
    hearleChange (value) {
      const data = { price_lt: value }
      this.initChange(data)
    }
    // 当每一个change改变的时候
    // 循环判断
  }
}
</script>

<style lang = 'less' scoped>
.hotel_bottom {
  width: 1000px;
  margin: 0 auto;
}
</style>
