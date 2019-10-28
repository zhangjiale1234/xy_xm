<template>
  <div class="index">
    <!-- 轮播图开始 -->
    <div class="index_carousel">
      <el-carousel height="700px">
        <el-carousel-item v-for="(item,index) in swiperList" :key="index">
          <div :style="`background:url(${$axios.defaults.baseURL+item.url}) center center  ;height:700px;`" />
        </el-carousel-item>
      </el-carousel>
      <!-- tab栏开始 -->
      <div class="index_tabs">
        <mytabs />
      </div>
      <!-- tab栏结束 -->
    </div>
    <!-- 轮播图结束 -->
  </div>
</template>

<script>
import { getSwiper } from '@/api/index.js'
import mytabs from '@/components/tabs.vue'
export default {
  components: {
    mytabs
  },
  data () {
    return {
      swiperList: []
    }
  },
  mounted () {
    getSwiper()
      .then((res) => {
        if (res.status === 200) {
          this.swiperList = res.data.data
        }
      })
  }
}
</script>

<style lang = 'less' scoped>
.index_carousel{
  position: relative;
  .index_tabs{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 100;
  }
}
</style>
