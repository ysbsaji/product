<template>
<div>
  <v-row>
    <v-col cols="12"
    lg="3"
    v-for="(item, index) in productDetail" :key="item.index" style="list-style-type: none"
    >
      <v-card v-show="data">
        <v-card-title>
          <h4>Product Name: {{ item.name }}</h4>
          <img :src="item.url" style="width:100%; height:100px"> 
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <p>Product Code: {{ item.code }}</p> 
        </v-card-text>
        <v-card-text>
          <p>Net Price: {{ item.netPrice }} </p>
        </v-card-text>
        <v-card-text>
          <p>Sale Price:  {{ item.salePrice }}</p>
        </v-card-text>
        <v-card-text>
          <p>Description: {{ item.description }}</p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          <v-tooltip bottom>
          <template v-slot:activator="{ on }">
          <v-btn 
            depressed  
            :disabled="item.carted"
            v-on="on"
            @click="addtocart(index)">
            Add to Cart
          </v-btn>
          </template>
          <span>Add cart item</span>
          </v-tooltip>
        </v-card-text>
      </v-card> 
    </v-col>
  </v-row>
  <v-snackbar
    v-model="snackbar"
  >
   Go to Cart
   <template v-slot:action>
      <v-btn
        color="pink"
        text
        to="/cart"
      >
        Ok
      </v-btn>
   </template>
  </v-snackbar>
  <h1 v-show="!data">There is no Product avaible here</h1>
</div>
</template>
<script>
export default {
  data(){
    return{
      data: false,
      snackbar: false,
      netPrice: '',
      salePrice: '',
      description: '',
      productDetail:[],
      newCart: [],
      editDialog: false,
      updateIndex: ''
    }
  },
  methods:{
    addtocart(index){
      this.newCart.push(this.productDetail[index])
      let index1 = this.newCart.indexOf(this.productDetail[index])
      this.newCart[index1].quantity = 1;
      this.newCart[index1].carted = true
      this.$store.commit('cartDetail', this.newCart[index1])
      this.snackbar = true
    },
    getProductDetails(){
      const getProductDetails = this.$store.state.productDetail
      getProductDetails.forEach(val => { this.productDetail.push(val) })
      if(this.productDetail.length > 0){
        this.data = true
      }
    }
  },
 mounted(){
    this.getProductDetails()
  }
}
</script>

<style>

</style>