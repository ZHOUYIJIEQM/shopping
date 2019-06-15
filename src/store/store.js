import Vue from 'vue';
import Vuex from 'vuex';

import product_data from './product.js';

Vue.use(Vuex);

// 排除重复
function getFilterArray(array) {
  const res = [];
  const json = {};
  for (let i = 0; i < array.length; i++) {
    const _self = array[i];
    if (!json[_self]) {
      res.push(_self);
      json[_self] = 1;
    }
  }
  return res;
}

const store = new Vuex.Store({
  state: {
    productList: [],
    cartList: []
  },
  getters: {
    // 提取品牌
    brands: state => {
      const brands = state.productList.map(item => item.brand);
      return getFilterArray(brands);
    },
    // 提取颜色
    colors: state => {
      const colors = state.productList.map(item => item.color);
      return getFilterArray(colors);
    }
  },
  mutations: {
    // 添加商品列表
    setProductList(state, data){
      state.productList = data;
    },
    // 添加购物车
    addCart(state, id){
      const isAdded = state.cartList.find(item => item.id === id);
      if(isAdded){
        isAdded.count++;
      }else{
        state.cartList.push({
          id: id,
          count: 1
        })
      }
    },
    // 修改商品数量
    editCartCount(state, payload){
      const product = state.cartList.find(item => item.id === payload.id);
      product.count += payload.count;
    },
    // 删除商品
    deleteCart(state, id){
      const index = state.cartList.findIndex(item => item.id === id);
      state.cartList.splice(index, 1);
    },
    // 清空购物车
    emptyCart(state){
      state.cartList = [];
    }
  },
  actions: {
    // 请求商品列表
    getProductList(context){
      // 真实环境通过ajax获取,这里异步模拟
      setTimeout(()=>{
        context.commit('setProductList', product_data)
      }, 500)
    },
    // 购买
    buy(context){
      return new Promise(resolve=>{
        setTimeout(()=>{
          context.commit('emptyCart');
          resolve();
        }, 500)
      });
    }
  }
});

export default store