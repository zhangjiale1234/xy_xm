<template>
  <div class="hotelDetail">
    <div class="contain">
      <!-- 面包屑 -->
      <div class="detail_nav">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/hotel' }">
            首页
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/hotel' }">
            南京酒店
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/hotel' }">
            南京世贸江滨希尔酒店
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 头标题 -->
      <div class="detailHeader">
        <p>南京世贸江滨希尔酒店<span class="iconfont iconhuangguan" style="color:#ff9900" /></p>
        <p>nan jing shi mao bin jiang xi er dun hotel</p>
        <p><span class="iconfont iconlocation" />淮滨路一路(近南通路，世贸江滨新城)</p>
      </div>
      <!-- 头标题 -->
      <div class="detail_main">
        <DetailImg />
      </div>
    </div>
  </div>
</template>

<script>
import DetailImg from '@/components/hotels/DetailImg'
export default {
  components: {
    DetailImg
  },
  data () {
    return {
      id: this.$route.query.id
    }
  },
  mounted () {
    const id = this.id
    this.$axios.get('/hotels?id=' + id).then((res) => {
      console.log(res)
    })
  }
}
</script>

<style lang='less' scoped>
* {
  margin: 0;
  padding: 0;
}
.hotelDetail {
  .contain {
    width: 1000px;
    margin: 0 auto;
    .detail_nav {
      padding: 10px 0;
    }
    .detailHeader {
      p:nth-child(1) {
        font-size: 25px;
        font-weight: 500;
        span{
            padding: 0px 5px;
        }
      }
        p:nth-child(2){
            font-size: 14px;
            color: #666666;
        }
        p:nth-child(3){
            color: #666666;
        }
    }
  }
}
</style>
