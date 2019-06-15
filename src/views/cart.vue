<template>
  <div class="cart">
    <div class="cart-header">
      <div class="cart-header-title">购物车</div>
      <div class="cart-header-main">
        <div class="cart-info">商品信息</div>
        <div class="cart-price">单价</div>
        <div class="cart-count">数量</div>
        <div class="cart-cost">小计</div>
        <div class="cart-delete">删除</div>
      </div>
    </div>
    <div class="cart-content">
      <div class="cart-content-main" v-for="(item, index) in cartList">
        <div class="cart-info">
          <img :src="productDictList[item.id].image">
          <span>{{productDictList[item.id].name}}</span>
        </div>
        <div class="cart-price">￥{{productDictList[item.id].cost}}</div>
        <div class="cart-count">
          <span class="cart-control-minus" @click="handleCount(index, -1)">-</span>
          {{item.count}}
          <span class="cart-control-add" @click="handleCount(index, 1)">+</span>
        </div>
        <div class="cart-cost">￥{{productDictList[item.id].cost * item.count}}</div>
        <div class="cart-delete">
          <span class="cart-control-delete" @click="handleDelete(index)">删除</span>
        </div>
      </div>
      <div class="cart-empty" v-if="!cartList.length">购物车为空</div>
    </div>
    <div class="cart-promotion" v-if="cartList.length">
      <span>使用优惠码：</span>
      <input type="text" v-model="promotionCode" @keyup.enter="handlePromotionCode">
      <span class="cart-control-promotion" @click="handlePromotionCode" >验证</span>
    </div>
    <div class="cart-footer" v-show="cartList.length">
      <div class="cart-footer-desc">
        共计 <span>{{countAll}}</span>件商品
      </div>
      <div class="cart-footer-desc">
        应付总额 <span>￥{{costAll - promotion}}</span>
        <template v-if="promotion">
          (优惠<span>￥ {{promotion}}</span>)
        </template>
      </div>
      <div class="cart-footer-desc">
        <div class="cart-control-order" @click="handleOrder">现在结算</div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    computed: {
      
      // 获得 Vuex cartList
      cartList(){
        return this.$store.state.cartList;
      },
      // 获得 Vuex productList
      productList(){
        return this.$store.state.productList;
      },
      // 复制一份 productList
      productDictList(){
        const dict = {};
        this.productList.forEach(item => {
          dict[item.id] = item;
        });
        return dict;
      },
      // 总计购物车列表数量
      countAll(){
        let count = 0;
        this.cartList.forEach(item => {
          count += item.count;
        });
        return count;
      },
      // 总计购物车列表价格
      costAll(){
        let cost = 0;
        this.cartList.forEach(item => {
          cost += this.productDictList[item.id].cost * item.count;
        })
        return cost;
      }
    },
    data(){
      return {
        // productList: product_data,
        promotionCode: '',
        promotion: 0
      }
    },
    methods: {
      // 处理商品数量
      handleCount(index, count){
        // 传入数量小于0 并且 购物车列表项的数量为1, 退出处理函数
        if(count<0 && this.cartList[index].count === 1) return;
        // 载荷方式，提交mutation
        this.$store.commit('editCartCount', {
          id: this.cartList[index].id,
          count: count
        });
      },
      // 处理删除
      handleDelete(index){
        // 提交mutation 要删除的id
        this.$store.commit('deleteCart', this.cartList[index].id);
      },
      // 验证优惠码
      handlePromotionCode(){
        if(this.promotionCode === ''){
          window.alert('请输入优惠码！')
          return;
        }
        if(this.promotionCode !== 'vue'){
          this.promotion = 0;
          this.promotionCode = '';
          window.alert('优惠码验证失败')
        }else{
          this.promotion = 500;
          this.promotionCode = '';
        }
      },
      // 处理订单
      handleOrder(){
        // 触发 Action
        this.$store.dispatch('buy').then(()=>{
          window.alert('购买成功！');
        })
      }
    }
  }

</script>

<style scoped lang="less">
  @prefix: cart;
  .@{prefix}{
    min-width: 800px;
    margin: 32px 20px 0px;
    background-color: #fff;
    border: 1px solid #dddee1;
    border-radius: 10px;
    overflow: hidden;

    &-header-title{
      padding: 16px 32px;
      border-bottom: 1px solid #dddee1;
      background-color: #f8f8f9;
      border-radius: 10px 10px 0 0;
    }

    &-header-main{
      padding: 8px 32px;
      border-bottom: 1px solid #dddee1;
      background-color: #eee;
      overflow: hidden;

      div{
        float: left;
        text-align: center;
        font-size: 14px;
        width: 12%;
      }

      .cart-info{
        width: 52%;
        text-align: left;
      }
    }

    &-content-main{
      padding: 0 32px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      border-bottom: 1px dashed #e9eaec;
      overflow: hidden;

      div{
        float: left;
        font-size: 14px;
        width: 12%;
      }

      .cart-info{
        width: 52%;
        line-height: 60px;

        img{
          width: 46px;
          margin: 7px 0;
          float: left;
        }
        span{
          margin-left: 15px;
          display: block;
          float: left;
          height: 60px;
          line-height: 60px;
          font-size: 16px;
          font-weight: bold;
        }
      }

      .cart-count{
        span{
          cursor: pointer;
          display: inline-block;
          line-height: 20px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: #f8f8f9;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
        }
      }

      .cart-delete{
        color: #2d8cf0;
        font-size: 16px;
        cursor: pointer;
      }
    }

    .cart-empty{
      margin: 30px;
      text-align: center;
    }

    &-promotion{
      padding: 20px 0 30px 30px;
      
      .cart-control-promotion{
        background-color: #108fbf;
        padding: 2px 10px;
        font-size: 12px;
        color: #fff;
        border-radius: 5px;
        transition: all .2s;
        cursor: pointer;
        &:hover{
          background-color: #4379bd;
        }
      }
    }

    &-footer{
      float: right;
      margin: 10px 20px 20px 0;
      overflow: hidden;

      div{
        height: 50px;
        line-height: 50px;
        float: left;
        margin-right: 20px;
        span{
          color: #f2352e;
          font-size: 20px;
        }
      }
      .cart-control-order{
        background-color: #108fbf;
        color: #fff;
        cursor: pointer;
        height: 30px;
        line-height: 30px;
        padding: 5px 10px;
        border-radius: 5px;
        box-shadow: 1px 2px 3px #387d98;
        transition: all .2s;
        &:hover{
          background-color: #4379bd;
        }
      }
    }

  }

</style>