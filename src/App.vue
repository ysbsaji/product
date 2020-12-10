<template>
  <v-app>
    <v-navigation-drawer app>
    <v-img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjS6Ame8jzD7KIWlICp1t9wUxXg-JCVkhqVA&usqp=CAU"></v-img>
    <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-toolbar-title>  Process Drive  </v-toolbar-title>
      <v-spacer></v-spacer>
      <div style="border: 2px solid brown; width: 1100px"></div> 
    </v-app-bar>
    <v-main app>
    <v-container fluid>
      <transition :name="transitionName">
  <router-view></router-view>
</transition>
      <!-- <router-view></router-view> -->
    </v-container>
    </v-main>
    <v-footer app>
    <!-- -->
    </v-footer>
    
  </v-app>
</template>

<script>
export default {
  data(){
    return{
      transitionName:'scale-transition',
      drawer: false,
      items:[
        { title: 'ProductManagement', icon: 'mdi-account-circle', link:'/productManagement' },
        { title: 'Products', icon: 'mdi-dolly', link:'/' },
        { title: 'CartItems', icon: 'mdi-cart-check', link:'/cart' },
        { title: 'Calendar', icon: 'mdi-calendar',link:'/calender' },
        { title: 'Add User', icon: 'mdi-account-plus-outline',link:'/user' },
      ],
    }
  },
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
