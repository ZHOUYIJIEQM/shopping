<template>
  <div v-show="list.length">
    <div class="list-control">
      <div class="list-control-filter">
        <span>品牌：</span>
        <span 
          class="list-control-filter-item"
          :class="{on: item === filterBrand}"
          v-for="item in brands"
          @click="handleFilterBrand(item)"
        >{{item}}</span>
      </div>
      <div class="list-control-filter">
        <span>颜色：</span>
        <span 
          class="list-control-filter-item"
          v-for="item in colors"
          :class="{on: item === filterColor}"
          @click="handleFilterColor(item)"
        >{{item}}</span>
      </div>
      <div class="list-control-order">
        <span>排序：</span>
        <span 
          class="list-control-order-item"
          :class="{on: order === ''}"
          @click="handleOrderDefault"
        >默认</span>
        <span 
          class="list-control-order-item"
          :class="{on: order === 'sales'}"
          @click="handleOrderSales"
        >销量<template v-if="order==='sales'">↓</template>
        </span>
        <span 
          class="list-control-order-item"
          :class="{on: order.indexOf('cost')>-1}"
          @click="handleOrderCost"
        >价格
          <template v-if="order==='cost-desc'">↓</template>
          <template v-if="order==='cost-asc'">↑</template>
        </span>
      </div>
    </div>
    <Product
      v-for="item in filteredAndOrderedList"
      :info="item"
      :key="item.id"
    ></Product>
    <div class="product-not-found" v-show="!filteredAndOrderedList.length">暂无相关商品</div>
  </div>
</template>

<script>
  import Product from '../components/product.vue'
  import { mapState, mapGetters } from 'vuex'

  export default {
    components: {Product},
    data(){
      return {
        filterBrand: '',
        filterColor: '',
        order: '',
      }
    },
    computed: {
      // 获取 vuex 中 一些需要的数据
      ...mapState({
        list: state => state.productList,
      }),
      ...mapGetters({
        brands: 'brands',
        colors: 'colors'
      }),
      filteredAndOrderedList(){
        // 克隆一份list
        let list = [...this.list];
        // 按品牌筛选
        if(this.filterBrand !== ''){
          list = list.filter(item => item.brand === this.filterBrand)
        }
        // 按颜色筛选
        if(this.filterColor !== ''){
          list = list.filter(item => item.color === this.filterColor)
        }
        // 排序
        if(this.order !== ''){
          if(this.order === 'sales'){
            // 按销量降序
            list = list.sort((a, b) => b.sales - a.sales);
          }else if(this.order === 'cost-desc'){
            // 按价格降序
            list = list.sort((a, b) => b.cost - a.cost);
          }else if(this.order === 'cost-asc'){
            // 按价格升序
            list = list.sort((a, b) => a.cost - b.cost);
          }
        }
        return list;
      }
    },
    methods: {
      // 处理点击品牌
      handleFilterBrand(brand){
        if(this.filterBrand === brand){
          this.filterBrand = '';
        }else{
          this.filterBrand = brand;
        }
      },
      // 点击颜色
      handleFilterColor(color){
        if(this.filterColor === color){
          this.filterColor = '';
        }else{
          this.filterColor = color;
        }
      },
      // 默认排序
      handleOrderDefault(){
        this.order = '';
      },
      // 点击销量
      handleOrderSales(){
        this.order = 'sales';
      },
      // 点击价格
      handleOrderCost(){
        if(this.order==='cost-desc'){
          this.order = 'cost-asc';
        }else{
          this.order = 'cost-desc';
        }
      }
    },
    mounted(){
      // 触发action
      this.$store.dispatch('getProductList');
    }
  }

</script>

<style scoped lang="less">
  @prefix-list: list-control;
  .@{prefix-list} {
    background-color: #fff;
    border-radius: 6px;
    margin: 16px;
    padding: 16px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    &-filter{
      margin-bottom: 16px;
    }
    &-filter-item,
    &-order-item{
      cursor: pointer;
      display: inline-block;
      border: 1px solid #e9eaec;
      border-radius: 4px;
      margin-right: 6px;
      padding: 2px 6px;
    }
    &-filter-item.on,
    &-order-item.on{
      background-color: #f2352e;
      border: 1px solid #f2352e;
      color: #fff;
    }
  }
  .product-not-found{
    text-align: center;
    padding: 32px;
  }
</style>