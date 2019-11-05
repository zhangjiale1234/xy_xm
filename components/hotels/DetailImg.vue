<template>
  <div class="detailImg">
    <div class="detail_main">
      <div class="img_left">
        <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt>
      </div>
      <div class="img_rigth">
        <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt>
        <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt>
        <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt>
        <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt>
        <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt>
        <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt>
      </div>
    </div>
    <div class="main_block">
      <div class="main_title">
        <p>价格来源</p>
        <p>低价房型</p>
        <p>最低价格/每晚</p>
      </div>
      <div class="main_row">
        <p>携程</p>
        <p>高级大床A</p>
        <p>￥755起&nbsp;&nbsp;></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
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
        padding: 20px 10px;
        color: #90a1c4;
        font-weight: 500;
      }
      .main_row{
            border-bottom: 1px solid #ccc;
            display: flex;
            justify-content: space-between;
            padding: 20px 10px;
        }
    }
}
</style>
