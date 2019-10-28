<template>
  <div class="tabs">
    <div class="tab_top">
      <div v-for="(item,index) in titles" :key="index" class="tab_search" :class="currentIndex===index?'acitve':''" @click="titleChange(index)">
        {{ item.text }}
      </div>
    </div>
    <div class="serach">
      <input type="text" :placeholder="titles[currentIndex].ph">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      titles: [
        { text: '攻略', ph: '请输入攻略' },
        { text: '酒店', ph: '请输入酒店' },
        { text: '机票', ph: '请输入机票' }
      ],
      currentIndex: 0
    }
  },
  methods: {
    titleChange (index) {
      this.currentIndex = index
      if (index === 2) {
        this.$router.push('/air')
      }
    }
  }
}
</script>

<style lang = 'less' scoped>
.tabs {
  position: relative;
  .tab_top {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .tab_search {
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px 20px;
    border: 1px solid #cccccc;
    color: #eee;
    &.acitve{
        background-color: #ccc;
        color: #000;
    }
  }
  .serach {
    width: 300px;
    position: absolute;
    top: 42px;
    left:0;
    input{
        width: 100%;
        height: 40px;
    }
  }
}
</style>
