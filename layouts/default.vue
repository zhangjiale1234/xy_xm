
<template>
  <div class="div">
    <Header />
    <nuxt />
    <!-- <footer /> -->
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
export default {
  components: {
    Header, Footer
  }
}
</script>

<style>

</style>
