<template>
  <div class="header">
    <router-link to="/list" class="header-title">电商网页</router-link>
    <div class="header-menu">
      <router-link to="/cart" class="header-menu-cart">
        购物车
        <span v-if="cartList.length">{{cartList.length}}</span>
      </router-link>
    </div>
  </div>
</template>
<script>
  export default {
    computed: {
      cartList(){
        return this.$store.state.cartList;
      }
    }
  }
</script>
<style scoped lang="less">
  @header: header;
  .@{header}{
    min-width: 600px;
    height: 48px;
    line-height: 48px;
    background-color: rgba(0,0,0,.8);
    color: white;
    &-title{
      display: inline-block;
      color: #dcdcdc;
      margin-left: 30px;
      transition: all .2s;
      &:hover{
        color: white;
      }
    }
    &-menu{
      float: right;
      margin-right: 30px;
      .header-menu-cart{
        display: inline-block;
        color: white;
      }
      span{
        display: inline-block;
        width: 16px;
        height: 16px;
        line-height: 16px;
        font-size: 12px;
        background-color: #fd832d;
        border-radius: 50%;
        text-align: center;
      }
    }
  }
</style>
