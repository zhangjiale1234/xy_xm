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
        center: [116.39, 39.9]

      })
      console.log(map)
    }

    const url = 'https://webapi.amap.com/maps?v=1.4.15&key=ede0e3db76feda1de3a439a35962ae2c&callback=onLoad'
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
