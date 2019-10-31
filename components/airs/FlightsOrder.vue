<template>
  <div>
    <!-- 1 乘机人 -->
    <div class="fly_people">
      <div class="fly_people_title">
        乘机人
      </div>
      <div class="fly_people_content">
        <el-form
          label-position="top"
          label-width="80px"
        >
          <div class="user_item">
            <el-form-item label="乘机人类型">
              <el-row>
                <el-col :span="6">
                  <el-select
                    value="成人"
                    placeholder=""
                  >
                    <el-option
                      label="成人"
                      value="成人"
                    />
                  </el-select>
                </el-col>
                <el-col :span="18">
                  <el-input />
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item label="证件类型">
              <el-row>
                <el-col :span="6">
                  <el-select
                    value="身份证"
                    placeholder=""
                  >
                    <el-option
                      label="身份证"
                      value="身份证"
                    />
                  </el-select>
                </el-col>
                <el-col :span="18">
                  <el-input />
                </el-col>
              </el-row>
            </el-form-item>
          </div>
          <el-form-item>
            <el-button type="primary">
              添加乘机人
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 1 乘机人 -->
    <!-- 2 保险 -->
    <div class="insurance">
      <div class="insurance_title">
        保险
      </div>
      <div class="insurance_content">
        <div
          class="insurance_row"
        >
          <el-checkbox
            label="备选项1"
            border
          >
            /份×1最高赔付
          </el-checkbox>
        </div>
      </div>
    </div>
    <!-- 2 保险 -->
    <!-- 3 联系人 -->
    <div class="contact">
      <div class="contact_title">
        联系人
      </div>
      <div class="contact_content">
        <el-form label-width="80px">
          <el-form-item label="姓名">
            <el-input />
          </el-form-item>

          <el-form-item label="手机">
            <el-input>
              <template slot="append">
                发送验证码
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input />
          </el-form-item>

          <el-form-item>
            <el-button type="primary">
              立即创建
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 3 联系人 -->
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
.fly_people_title,
.insurance_title,
.contact_title {
  padding: 20px 0;
  font-size: 30px;
}
.insurance_row {
  margin: 10px 0;
}

.user_item{
  position: relative;
}
</style>
