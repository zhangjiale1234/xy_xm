<template>
  <div class="hotelMap">
    <div id="container" />
  </div>
</template>

<script>
export default {
  mounted () {
    window.onLoad = function () {
      // eslint-disable-next-line no-undef
      const map = new AMap.Map('container', {
        zoom: 12,
        // 初始化以这个为中心
        center: [113.27591426455703, 23.11620128356685]
      })
      // eslint-disable-next-line no-undef
      const toolbar = new AMap.ToolBar()
      map.addControl(toolbar)
      // 创建一个点标记
      // 创建一个 Marker 实例：
      // eslint-disable-next-line no-undef

      // eslint-disable-next-line no-undef
      const marker = new AMap.Marker({
        // eslint-disable-next-line no-undef
        position: new AMap.LngLat(113.27591426455703, 23.11620128356685), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: '越秀'
      })
      // 将创建的点标记添加到已有的地图实例：
      map.add(marker)
      // 自定义点标记
    }

    const url = 'https://webapi.amap.com/maps?v=1.4.15&key=ede0e3db76feda1de3a439a35962ae2c&callback=onLoad&plugin=AMap.ToolBar'
    const jsapi = document.createElement('script')
    jsapi.charset = 'utf-8'
    jsapi.src = url
    document.head.appendChild(jsapi)
    // 使用插件
  }

}
</script>

<style lang='less' scooped>
#container {
  width: 600px;
  height: 350px;
}
</style>
