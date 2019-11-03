<template>
  <div class="demo">
    <el-cascader
      v-model="selectedOptions2"
      expand-trigger="hover"
      :options="options"
      @change="handleChange"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则'
        }]
      }],
      selectedOptions2: []
    }
  },
  methods: {
    handleChange (value) {
      console.log(value)
    }
  }
}
</script>

<style>

</style>
