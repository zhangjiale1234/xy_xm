<template>
  <div class="header">
    <div class="head_contain">
      <div class="header_main1">
        <div class="main1_top">
          <p>价格</p>
          <p>0-3000</p>
        </div>
        <div class="main_bottom">
          <el-slider v-model="sliding.price" :max="sliding.max" @change="headleChange" />
        </div>
      </div>
      <div class="header_main">
        <p>住宿等级</p>
        <div class="hotel_grade">
          <el-dropdown size="small">
            <div class="el-dropdown-link select">
              <p>不限</p>
              <i class="el-icon-arrow-down el-icon--right" />
            </div>
            <el-dropdown-menu slot="dropdown" size="medium">
              <el-dropdown-item
                v-for="(item,index) in hotelCondition.levels"
                :key="item.id"
                style="width:120px;"
              >
                <el-checkbox v-model="leves[index]" :label="item.name" style="width:150px;" @change="headleLevelsChange">
                  {{ item.name }}
                </el-checkbox>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="header_main">
        <p>住宿类型</p>
        <div class="hotel_grade">
          <el-dropdown size="small">
            <div class="el-dropdown-link select">
              <p>不限</p>
              <i class="el-icon-arrow-down el-icon--right" />
            </div>
            <el-dropdown-menu slot="dropdown" size="medium">
              <el-dropdown-item
                v-for="item in hotelCondition.types"
                :key="item.id"
                style="width:120px;"
              >
                <el-checkbox v-model="types" :label="item.id" style="width:150px;" @change="headleTypesChange">
                  {{ item.name }}
                </el-checkbox>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="header_main">
        <p>住宿设施</p>
        <div class="hotel_grade">
          <el-dropdown size="small">
            <div class="el-dropdown-link select">
              <p>不限</p>
              <i class="el-icon-arrow-down el-icon--right" />
            </div>
            <el-dropdown-menu slot="dropdown" size="medium">
              <el-dropdown-item
                v-for="item in hotelCondition.assets"
                :key="item.id"
                style="width:120px;"
              >
                <el-checkbox v-model="facilities" :label="item.id" style="width:150px;" @change="headleAssetsChange">
                  {{ item.name }}
                </el-checkbox>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="header_main">
        <p>酒店品牌</p>
        <div class="hotel_grade">
          <el-dropdown size="small">
            <div class="el-dropdown-link select">
              <p>不限</p>
              <i class="el-icon-arrow-down el-icon--right" />
            </div>
            <el-dropdown-menu slot="dropdown" size="medium">
              <div style="height:150px; overflow:auto;">
                <el-dropdown-item
                  v-for="item in hotelCondition.brands"
                  :key="item.id"
                  style="width:120px;"
                >
                  <el-checkbox :label="item.id" style="width:120px;" @change="headlebrandsChange(item.id)">
                    {{ item.name }}
                  </el-checkbox>
                </el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['options'],
  data () {
    return {
      sliding: {
        price: 0,
        max: 3000
      },
      hotelCondition: {
        // 酒店设施
        assets: [],
        // 酒店等级
        levels: [],
        // 酒店类型
        types: [],
        // 酒店品牌
        brands: []
      },
      // 选中的等级状态
      leves: [],
      // 选中的住宿类型
      types: [],
      // 被选中的酒店设施
      facilities: [],
      // 被选中的酒店品牌
      branch: []

    }
  },
  mounted () {
    if (this.options.levels.length === 0) {
      return
    }
    // 到了这边才发起请求

    this.hotelCondition.assets = this.options.assets
    this.hotelCondition.levels = this.options.levels
    this.hotelCondition.types = this.options.types
    this.hotelCondition.brands = this.options.brands
    this.leves = this.hotelCondition.levels.map(v => false)
  },
  methods: {
    headleChange (value) {
      console.log(value)
    },
    headleLevelsChange (value) {
      console.log(value)
    },
    headleTypesChange (value) {
      // 发送被选中的住宿条件给父组件
      this.$emit('headleTypesChange', this.types)
    },
    headleAssetsChange () {
      this.$emit('headleAssetsChange', this.facilities)
    },
    headlebrandsChange (id) {
      const index = this.branch.findIndex(v => v === id)
      const branch = this.branch
      if (index !== -1) {
        branch.splice(index, 1)
      } else {
        branch.push(id)
      }
      console.log(branch)
      this.$emit('headlebrandsChange', branch)
    }
  }
}
</script>

<style lang='less' scoped>
* {
  margin: 0;
  padding: 0;
}
.header {
  .head_contain {
    display: flex;
    border: 1px solid #ccc;
    height: 100px;
    padding: 5px 0px;
    box-sizing: border-box;
    color: #7a7a7a;
    .header_main1 {
      box-sizing: border-box;
      width: 250px;
      border-right: 1px solid #ccc;
      padding: 20px 15px;
      .main1_top {
        display: flex;
        justify-content: space-between;
        font-size: 15px;
      }
    }
    .header_main {
      box-sizing: border-box;
      padding: 20px 15px;
      border-right: 1px solid #ccc;
      flex: 1;
      .hotel_grade {
        .select {
          cursor: pointer;
          width: 150px;
          display: flex;
          justify-content: space-between;
          padding: 8px 0px;
          align-items: center;
        }
      }
    }
  }
}
</style>
