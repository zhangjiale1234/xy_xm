<template>
  <div class="flights_item">
    <div class="item_main" @click="headleShow">
      <div class="item_name">
        {{ flightslist.airline_name }}{{ flightslist.flight_no }}
      </div>
      <div class="item_depart_date">
        <p>{{ flightslist.dep_time }}</p>
        <p>{{ flightslist.org_airport_name }}{{ flightslist.org_airport_quay }}</p>
      </div>
      <div class="duration">
        2时50分
      </div>
      <div class="item_dest_date">
        <p>{{ flightslist.dep_time }}</p>
        <p>{{ flightslist.dst_airport_name }}{{ flightslist.dst_airport_quay }}</p>
      </div>
      <div class="item_price">
        <p>￥<span>{{ flightslist.base_price*0.6 }}</span>起</p>
      </div>
    </div>
    <div v-show="isShow" class="item_info">
      <div class="item_low">
        低价推荐
      </div>
      <div class="item_seat">
        <!-- 循环来 显示  -->
        <div v-for="(item,index) in flightslist.seat_infos" :key="index" class="seat_row">
          <div class="seat_row_name">
            <span>{{ item.name }} </span> | {{ item.supplierName }}
          </div>
          <div class="seat_row_price">
            ￥{{ item.org_settle_price_coupon }}
          </div>
          <div class="seat_row_btns">
            <div>
              <el-button type="warning" size="mini" style="width:60px;height:30px">
                <div @click="headleOrder(index)">
                  选定
                </div>
              </el-button>
              <p>剩余:{{ item.discount }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 父传子 接参数
  props: ['flightslist'],
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    headleShow () {
      this.isShow = !this.isShow
      this.$emit('isShow', this.isShow)
    },
    headleOrder (index) {
      // 点击选定获取id和xid跳转后带过机票详情页面
      console.log(this.flightslist.seat_infos[index])
      const xid = this.flightslist.seat_infos[index].seat_xid
      const id = this.flightslist.id
      this.$router.push({ path: 'order/' + id, query: { seat_xid: xid } })
    }
  }
}
</script>

<style lang="less" scoped>
*{
    margin: 0;
    padding: 0;
}
/* css tree  */
.flights_item {
  border: 1px solid #ccc;
  margin: 10px 0;
  .item_main {
    height: 80px;
    background-color: #fff;
    display: flex;
    position: relative;
    > div {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    .item_name {
      font-size: 13px;
    }

    .item_depart_date,
    .item_dest_date {
      p:nth-child(1) {
        font-size: 25px;
      }
      p:nth-child(2) {
        font-size: 12px;
        color: #666;
      }
    }

    .item_price {
      span {
        color: orange;
        font-size: 20px;
      }
    }
    .duration {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 12px;
      color: #666;
      padding-bottom: 20px;
      border-bottom: 1px solid #ccc;
    }
  }

  .item_info {
    background-color: #f6f6f6;
    display: flex;
    .item_low {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
    }
    .item_seat {
      flex: 5;

      .seat_row {
        height: 70px;
        display: flex;
        border-bottom: 1px solid #000;
        &:last-child{
          border-bottom: none;
        }
        > div {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .seat_row_name {
          flex: 4;
          font-size: 13px;
          span{
            color: green;
          }
        }
        .seat_row_price {
          flex: 1;
          font-size: 18px;
          color: orange;
        }
        .seat_row_btns {
          flex: 1;
          font-size: 13px;
        }
      }
    }
  }
}
</style>
