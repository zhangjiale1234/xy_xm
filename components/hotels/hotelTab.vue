<template>
  <div class="hotel_tab">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="风景" name="first">
        风景
      </el-tab-pane>
      <el-tab-pane label="交通" name="second">
        交通
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  props: ['city'],
  data () {
    return {
      activeName: 'first'
    }
  },
  mounted () {
    // 获取城市景点id
    console.log(this.city.id)

    const id = this.city.id
    this.$axios.get('/hotels?scenic=' + id)
      .then((res) => {
        console.log(res)
      })
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }

}
</script>

<style>

</style>
