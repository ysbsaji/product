import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    newCart: [],
    productDetail: [{code:Math.random(),name:'Samsung',netPrice:25000,salePrice:22000,description:'A good Product in the world',url:'https://www.xda-developers.com/files/2016/10/samsung-viv.jpg'}],
  },
  mutations: {
    productDetail(state, payload){
      state.productDetail = []
      payload.forEach(val => { state.productDetail.push(val) })
    },
    cartDetail(state, payload){
     state.newCart.push(payload)
    },
    delCartItem(state, payload){
      state.newCart.find((val,index) => {
        if(val == payload){
          state.newCart.splice(index,1)
        }
      })
    },
    delProductDetail(state, payload){
      state.productDetail.find((val,index) => {
        if(val == payload){
          state.productDetail.splice(index,1)
        }
      })
      state.newCart.find((val,index) => {
        if(val == payload){
          state.newCart.splice(index,1)
        }
      })
    }
  },
  actions: {
  },
  modules: {
  }
})
