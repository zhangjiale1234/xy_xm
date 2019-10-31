<template>
  <div class="flights_filter">
    <div class="filter_main">
      <div class="main_path">
        单程: 广州-上海/ 2019-10-28
      </div>
      <div class="main_selects">
        <div class="select_item">
          <el-select v-model="optionsInfo.airport" placeholder="起飞机场" size="mini" @change="headleInputChange">
            <el-option
              v-for="item in optionsFlight.airport"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              @change="headleInputChange"
            />
          </el-select>
        </div>
        <div class="select_item">
          <el-select v-model="optionsInfo.flightTimes" placeholder="起飞时间" size="mini" @change="headleInputChange">
            <el-option
              v-for="item in optionsFlight.airportTime"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="select_item">
          <el-select v-model="optionsInfo.company" placeholder="机场公司" size="mini" @change="headleInputChange">
            <el-option
              v-for="item in optionsFlight.company"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="select_item">
          <el-select v-model="optionsInfo.sizes" placeholder="机型" size="mini" @change="headleInputChange">
            <el-option
              v-for="item in optionsFlight.sizes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
    </div>
    <div class="filters_btns">
      筛选:
      <el-button type="primary" round size="mini">
        撤销
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['options', 'info'],
  data () {
    return {
      optionsInfo: {
        // 起飞机场
        airport: '',
        flightTimes: '',
        company: ''
      }
    }
  },
  computed: {
    optionsFlight () {
      // 出发机场
      const airport = this.options.airport.map((e) => {
        return { value: e, label: e }
      })
      // 机场公司
      const company = this.options.company.map((e) => {
        return { value: e, label: e }
      })
      // 机型
      const sizes = [
        { value: 'L', label: 'L' },
        { value: 'M', label: 'M' },
        { value: 'S', label: 'S' }
      ]
      // 时间
      const airportTime = this.options.flightTimes.map(e => ({
        // 因为后期的需要 ，所以要过滤时间
        value: `${e.from}|${e.to}`,
        label: `${e.from}:00---${e.to}:00`
      }))
      return { airport, company, sizes, airportTime }
    }
  },
  methods: {
    headleInputChange () {
      this.$emit('headleInputChange', this.optionsInfo)
    }
  }
}
</script>
<style lang="less" scoped>
.flights_filter {
  .filter_main {
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .main_path {
      font-size: 13px;
    }
    .main_selects {
      display: flex;

      .select_item {
        width: 120px;
        margin-left: 5px;
      }
    }
  }
  .filters_btns {
    padding: 10px 0;
  }
}
</style>
