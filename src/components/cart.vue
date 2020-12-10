<template>
  <div>
    <h1>Your Cart</h1>
    <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Net Price
          </th>
          <th class="text-left">
            Sale Price
          </th>
          <th class="text-left">
            Quantity
          </th>
           <th class="text-left">
            Price
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in newCart"
          :key="item.name"
        >
          <td class="text-left">{{ item.name }}</td>
          <td class="text-left">{{ item.netPrice }}</td>
          <td class="text-left">{{ item.salePrice }}</td>
          <td class="text-left">
            <v-btn
              max-width="40px"
              max-height="40px"
              fab
              dark
              color="indigo"
              @click="addquantity(index)"
            >
            <v-icon dark>
               mdi-plus
            </v-icon>
            </v-btn>
          {{ item.quantity }}
          <v-btn
              max-width="40px"
              max-height="40px"
              fab
              dark
              color="indigo"
              @click="minusquantity(index)"
            >
            <v-icon>
               mdi-minus
            </v-icon>
            </v-btn>
          </td>
          <td class="text-left">{{ item.salePrice * item.quantity }}</td>
          <td>    
             <v-btn 
              depressed
              @click="del(index)">
              Remove
            </v-btn>
          </td>
        </tr>
      </tbody>

    </template>
  </v-simple-table>
  </div>
</template>

<script>

export default {
  data(){
    return{
    newCart: [],
    productDetail:[]
    }
  },
methods:{
  del(index){
    this.productDetail[this.productDetail.indexOf(this.newCart[index])].carted = false
    this.$store.commit('delCartItem',this.newCart[index])
    this.newCart.splice(index,1)
  },
  addquantity(index){
    let value = this.newCart[index];
    value.quantity++
    this.$set(this.newCart,index,value)
  },
  minusquantity(index){
    let value = this.newCart[index];
    if(value.quantity <= 1){
      this.newCart[index].quantity = 1
    }else{
      value.quantity--
    }
    this.$set(this.newCart,index,value)
  },
  getCartItems(){
    const getCartItem = this.$store.state.newCart
    getCartItem.forEach(val => { this.newCart.push(val) })
    const getProductDetails = this.$store.state.productDetail
    getProductDetails.forEach(val => { this.productDetail.push(val) })
  }
},
mounted(){
  this.getCartItems()
}
}
</script>

<style>

</style>