# vue+vuex+vue-router 一个电商网页
## [在线查看](http://63.209.32.7:3003)
## 项目内容主要包括：
使用了路由跳转，vuex状态管理  
包含有商品列表，商品介绍，购物车
商品列表按价格排序，按销量排序   
商品按品牌，颜色过滤   
购物车的优惠码验证处理 

## 项目总结
项目是基于Vue开发的电商网站，使用技术栈vue-cli+ Vue + Vuex + vue-router+less。  
在商品展示页，实现商品列表按价格或销量排序，按品牌和颜色过滤，购物车结算及优惠码验证等功能。  
因为多组件共享商品列表的数据，所以将其存储在vuex，而不单独放在组件内。  
在此项目中很多数据需要在它依赖的数据发生变化时，也跟随改变，此时最好用是在计算属性中处理；  
而当数据变化时，需要执行异步操作或大开销操作，则在侦听器中操作。  

## 下载运行
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

预览：  
![运行后](https://github.com/ZHOUYIJIEQM/shopping/blob/master/preview/prev.png)  
![运行后](https://github.com/ZHOUYIJIEQM/shopping/blob/master/preview/prev2.png)  
![运行后](https://github.com/ZHOUYIJIEQM/shopping/blob/master/preview/prev1.png)  

> 代码参考《Vue.js实战》
