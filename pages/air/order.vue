<template>
  <div class="order">
    <div class="order_contain">
      <div class="fiy_people">
        <FlightsOrder />
      </div>
      <div class="fiy_info">
        2
      </div>
    </div>
  </div>
</template>

<script>
import FlightsOrder from '@/components/airs/FlightsOrder.vue'
export default {
  components: {
    FlightsOrder
  },
  data () {
    return {
      order_id: {
        // 获取订单id和座位id
        seat_id: this.$route.query.seat_xid,
        id: this.$route.params.id
      }
    }
  },
  mounted () {
    console.log(this.order_id.seat_id, this.order_id.id)
  }
}
</script>

<style lang='less' scoped>
* {
  margin: 0;
  padding: 0;
}
.order {
  .order_contain {
    margin: 0 auto;
    width: 1000px;
    display: flex;
    .fiy_people {
      flex: 5;
    }
    .fiy_info {
      flex: 2;
    }
  }
}
</style>
