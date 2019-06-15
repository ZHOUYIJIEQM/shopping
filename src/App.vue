<template>
  <div id="App">
    <headers></headers>
    <div class="content" ref="content">
      <router-view></router-view>
    </div>
    <footers ref="footer"></footers>
  </div>
</template>

<script>
  import headers from './views/header.vue'
  import footers from './views/footer.vue'
  export default {
    components: { headers, footers },
    mounted(){
      let content = this.$refs.content;
      content.style.minHeight = document.documentElement.clientHeight - 138 +'px';
      window.onresize = () => {
        content.style.minHeight = document.documentElement.clientHeight - 138 +'px';
      }
    }
  }
</script>

<style>
  #App{
    position: relative;
  }
  .content{
    min-width: 600px;
    max-width: 1200px;
    margin: 0 auto;
    overflow: hidden;
  }
</style>
