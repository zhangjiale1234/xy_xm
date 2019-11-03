<template>
  <div class="order">
    <div class="order_contain">
      <div class="fiy_people">
        <FlightsOrder v-if="ticket.length" :ticket="ticket" :ticketinfo="ticketinfo" @priceChange="priceChange" />
      </div>
      <div class="fiy_info">
        <FlightsInfo :newprice="newprice" />
      </div>
    </div>
  </div>
</template>

<script>
import FlightsOrder from '@/components/airs/FlightsOrder.vue'
import FlightsInfo from '@/components/airs/FlightsInfo.vue'
export default {
  components: {
    FlightsOrder, FlightsInfo
  },
  data () {
    return {
      order_id: {
        // 获取订单id和座位id
        seat_id: this.$route.query.seat_xid,
        id: this.$route.params.id
      },
      ticket: [],
      ticketinfo: {},
      newprice: 0
    }
  },
  mounted () {
    console.log(this.order_id.seat_id, this.order_id.id)
    // 发送请求获取订单详情页
    this.$axios.get('/airs/' + this.order_id.id, { params: this.order_id.seat_id })
      .then((res) => {
        console.log(res.data)
        this.ticketinfo = res.data
        this.ticket = res.data.insurances
      })
  },
  methods: {
    priceChange (price) {
      this.newprice = price
    }
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
