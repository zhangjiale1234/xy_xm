<template>
  <div class="detailImg">
    <div class="detail_main">
      <div class="img_left">
        <img :src="pics" alt>
      </div>
      <div class="img_rigth">
        <img v-for="(item,index) in imgList" :key="index" :src="item" alt @click="headleImgChange(index)">
      </div>
    </div>
    <div class="main_block">
      <div class="main_title">
        <p>价格来源</p>
        <p>低价房型</p>
        <p>最低价格/每晚</p>
      </div>
      <div v-for=" item in infolist.products" :key="item.id" class="main_row">
        <p>{{ item.name }}</p>
        <p>{{ item.bestType }}</p>
        <p><span>￥{{ item.price }}</span>起&nbsp;&nbsp;></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['infolist'],
  data () {
    return {
      imgList: [
        'http://157.122.54.189:9093/images/hotel-pics/1.jpeg',
        'http://157.122.54.189:9093/images/hotel-pics/2.jpeg',
        'http://157.122.54.189:9093/images/hotel-pics/3.jpeg',
        'http://157.122.54.189:9093/images/hotel-pics/4.jpeg',
        'http://157.122.54.189:9093/images/hotel-pics/5.jpeg',
        'http://157.122.54.189:9093/images/hotel-pics/6.jpeg'
      ],
      pics: '' || 'http://157.122.54.189:9093/images/hotel-pics/1.jpeg'
    }
  },
  mounted () {
    console.log(this.infolist)
  },
  methods: {
    headleImgChange (index) {
      this.pics = this.imgList[index]
    }
  }
}
</script>

<style lang='less'>
*{
    margin: 0;
    padding: 0;
}
.detailImg {
  .detail_main {
    display: flex;
    .img_left {
      width: 800px;
      padding: 20px 0;
      img {
        width: 100%;
        height: 100%;
        padding-top: 8px;
      }
    }
    .img_rigth {
      width: 500px;
      height: 150px;
      padding: 20px 10px;
      img {
        width: 180px;
        padding: 10px 0;
      }
    }
  }
   .main_block {
      .main_title {
        border-bottom: 1px solid #ccc;
        display: flex;
        justify-content: space-between;
        padding: 20px 20px;
        color: #90a1c4;
        font-weight: 500;
        box-sizing: border-box;
      }
      .main_row{
            border-bottom: 1px solid #ccc;
            display: flex;
            justify-content: space-between;
            padding: 20px 20px;
            font-size: 14px;
            color: #606296;
            span{
                font-size:16px;
                color: #fab830;
            }
        }
    }
}
</style>
