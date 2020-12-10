<template>
<div>
  <h1>Add Product</h1>
  <v-form 
  ref='form'
  v-model="valid"
  >
   <v-container fluid>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="6"
        >
          <v-text-field
            label="Name"
            outlined
            dense
            v-model="name"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="6"
        >
          <v-text-field
            label="NetPrice"
            outlined
            dense
            v-model="netPrice"
            :rules="[rules.required,rules.number]"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="6"
        >
          <v-text-field
            label="SalePrice"
            outlined
            dense
            v-model="salePrice"
            :rules="[rules.required,rules.number]"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="6"
        >
          <v-textarea
            solo
            clearable
            outlined
            rows="3"
            label="Description"
            v-model="description"
            :rules="[rules.required]"
        ></v-textarea>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="6"
          >
          <v-file-input
            label="File input"
            outlined
            :disabled="whileEdit"
            dense
            v-model="file"
          ></v-file-input>
        </v-col>
        <v-col
          cols="12"
          sm="1"
          md="1"
        >
        <v-btn
          color="primary"
          :disabled= "!valid"
          v-show="addBtn"
          @click="addProduct"
          alert = true
         >
          AddProduct
        </v-btn>
        <v-btn
          color="primary"
          v-show="editBtn"
          @click="onEdit"
         >
          Update
        </v-btn>
        </v-col>
          <v-col
          cols="12"
          sm="5"
          md="5"
        >
        <v-btn
          depressed
          color="deep-orange"
          @click="cancel"
         >
          Cancel
        </v-btn>
        </v-col>
        <v-alert
          dense
          text
          type="success"
          v-model="alert"
          transition=" "
        >
          Product has been added successfully
        </v-alert>
      </v-row>
    </v-container>
  </v-form>
  <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            NetPrice
          </th>
          <th class="text-left">
            salePrice
          </th>
          <th class="text-left">
            Description
          </th>
          <th  class="text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item,index) in productDetail"
          :key="item.name"
        >
          <td class="text-left">{{ item.name }}</td>
          <td class="text-left">{{ item.netPrice }}</td>
          <td class="text-left">{{ item.salePrice }}</td>
          <td class="text-left">{{ item.description }}</td>
          <td  class="text-left"><v-btn color="primary" @click="edit(index)" class="mr-2" dense>Edit</v-btn>
          <v-btn color="primary" @click="del(index)" dense>Delete</v-btn></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  <v-row justify="center">
    <v-dialog
      v-model="delDialog"
      max-width="320"
    >
      <v-card>
        <v-card-title>
          Are you sure want to delete ? 
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="confirmDel"
          >
            Yes
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="delDialog = false"
          >
            No
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</div>
</template>
<script>
export default {
  data(){
    return{
      delDialog: false,
      alert:false,
      file: null,                                                                       
      name: '',
      valid: true,
      netPrice: '',
      salePrice: '',
      description: '',
      carted: false,
      addBtn: true,
      editBtn: false,
      updateIndex: '',
      delValue: null,
      productDetail: [],
      delIndex: '',
      whileEdit: false,
      rules: {
          required: value => !!value || 'Required.',
          number: value => !isNaN(value) || 'Invalid input'
          }
    }
  },
  methods: {
    addProduct(){
      this.productDetail.push({
      code: Math.random(),
      name:this.name,
      netPrice:this.netPrice,
      salePrice:this.salePrice,
      description:this.description,
      carted:this.carted,
      price:this.salePrice,
      url:URL.createObjectURL(this.file)
      })
      this.$refs.form.resetValidation();
      this.$refs.form.reset();
      this.alert = true
      setTimeout(() => {
        this.alert = false
      },2000)
      this.$store.commit('productDetail',this.productDetail)
    },
    cancel(){
      this.editBtn = false
      this.addBtn = true
      this.whileEdit = false
      this.$refs.form.reset();
    },
     edit(index){
      this.whileEdit = true
      this.editBtn = true
      this.addBtn = false
      this.updateIndex = index
      this.name = this.productDetail[index].name
      this.netPrice = this.productDetail[index].netPrice
      this.salePrice = this.productDetail[index].salePrice
      this.description = this.productDetail[index].description
    },
    onEdit(){
      this.editBtn = false
      this.addBtn = true
      this.productDetail[this.updateIndex].name = this.name
      this.productDetail[this.updateIndex].description = this.description
      this.productDetail[this.updateIndex].netPrice = this.netPrice
      this.productDetail[this.updateIndex].salePrice = this.salePrice
      this.productDetail[this.updateIndex].description = this.description
      this.$refs.form.resetValidation();
      this.$refs.form.reset();
      this.whileEdit = false
    },
    del(index){
      this.delDialog = true
      this.delIndex = index
    },
    confirmDel(){
      this.delDialog = false
      this.$store.commit('delProductDetail', this.productDetail[this.delIndex])
      this.productDetail.splice(this.delIndex,1)
    }
  },
  created(){
    const getProductDetails = this.$store.state.productDetail
    getProductDetails.forEach(val => { this.productDetail.push(val) })
  }
}
</script>
<style lang="">
  
</style>