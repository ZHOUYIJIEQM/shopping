<template>
  <div v-if="product">
    <div class="product">
      <div class="product-image" :style="'background-image: url('+product.image+')'"></div>
      <div class="product-info">
        <h1 class="product-name">{{product.name}}</h1>
        <div class="product-cost">￥{{product.cost}}</div>
        <div class="product-add-cart" @click="handleAddToCart">加入购物车</div>
      </div>
    </div>
    <div class="product-descript">
      <h2>产品介绍</h2>
      <img v-for="src in product.descript" :src="src">
    </div>
  </div>
</template>

<script>
  import product_data from '../store/product.js'
  export default {
    data(){
      return {
        // 获取路由参数
        id: parseInt(this.$route.params.id),
        product: null
      }
    },
    methods: {
      getProduct(){
        // 真实环境通过ajax获取数据，这里用异步模拟
        setTimeout(()=>{
          this.product = product_data.find(item => item.id === this.id);
        }, 500)
      },
      // 加入购物车
      handleAddToCart(){
        this.$store.commit('addCart', this.id);
      }
    },
    mounted(){
      this.getProduct();
    }
  }

</script>

<style scoped lang="less">
  @prefix: product;
  .@{prefix}{
    margin: 32px;
    padding: 32px;
    border: 1px solid #dddee1;
    border-radius: 10px;
    overflow: hidden;
    background-color: #fff;

    &-image{
      width: 65%;
      height: 550px;
      float: left;
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;

      img{
        height: 100%;
      }
    }

    &-info{
      width: 35%;
      margin-top: 180px;
      height: 150px;
      float: left;
      text-align: center;
    }

    &-cost{
      color: #f2352e;
      margin: 8px 0;
      font-weight: bold;
    }

    &-add-cart{
      display: inline-block;
      padding: 8px 64px;
      margin: 8px 0;
      background: #2d8cf0;
      color: #fff;
      border-radius: 4px;
      cursor: pointer;
    }
    
    &-descript{
      background-color: #fff;
      margin: 32px;
      padding: 32px;
      border: 1px solid #dddee1;
      border-radius: 10px;
      text-align: center;

      h2{
        margin-bottom: 25px;
      }

      img {
        display: block;
        width: 80%;
        margin: 0px auto;
      }
    }
  }
</style>