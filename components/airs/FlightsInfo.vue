<template>
  <div class="flightsInfo">
    <div class="info_row">
      <p>订单总价</p>
      <p>金额</p>
      <p>数量</p>
    </div>
    <div class="info_row">
      <p>成人机票</p>
      <p>￥12333</p>
      <p>x1</p>
    </div>
    <div class="info_row">
      <p>燃油+机建</p>
      <p>￥/人/单程</p>
      <p>x1</p>
    </div>
    <div class="info_row">
      <p>应付总额</p>
      <p class="price">
        {{ newprice }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['newprice'],
  mounted () {
    console.log(this.newprice)
  }
}
</script>

<style lang='less' scoped>
.flightsInfo{
    width: 350px;
    border: 1px solid #ccc;
    margin: 10px;
    .info_row{
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        border-bottom: 1px dashed #ccc;
        align-items: center;
        text-align: center;
        font-size: 14px;
        color: #666666;
        .price{
            font-size: 20px;
            color: orange;
        }

    }
}

</style>
