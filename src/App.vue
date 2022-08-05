<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/app">About</router-link> |
      <router-link to="/otherApp">Other</router-link>
    </nav> -->
    <router-view />
    <!-- <div id="container1"></div>
    <div id="container2"></div> -->
  </div>
</template>

<script>
// import { mapState, mapMutations } from "vuex";
// import store from '@/store';
export default {
    // computed: {
    //     ...mapState({
    //         token: state => state.user.token
    //     }),
    // },
    // mounted() {
    //     console.log("app 页面mouted", window)
    //     // window.addEventListener("beforeunload", e => {
    //     //     console.log("刷新页面", e)
    //     //     this.initData()
    //     // });
    //     window.addEventListener("unload", e => {
    //         console.log("刷新页面", e)
    //         this.initData()
    //     });
    // },
    // destroyed() {
    //     // window.removeEventListener("beforeunload", e => {
    //     //     console.log("页面卸载", e)
    //     // });
    //     window.removeEventListener("unload", e => {
    //         console.log("页面卸载", e)
    //     });
    // },
    beforeCreate() {
    },
    methods: {
        // ...mapMutations({
        //     setToken: "user/setToken",
        //     setUserInfo: "user/setUserInfo",
        //     setModuleList: "common/setModuleList",
        //     setRoleList: "common/setRoleList",
        //     setMenuLabel: "common/setMenuLabel",
        //     setSmallIconList: "common/setSmallIconList",
        //     setSecondMenuList: "common/setSecondMenuList"
        // }),
        // initData() {
        //     console.log("beforeCreate:", sessionStorage.getItem('token'))
        //     this.setToken(sessionStorage.getItem('token'))
        //     console.log("是否能取到token值:", this.token)
        //     console.log("是否能取到token值2:", store.state.user.token)
        //     this.setUserInfo(sessionStorage.getItem('userInfo'))
        //     this.setModuleList(sessionStorage.getItem('moduleList'))
        //     this.setRoleList(sessionStorage.getItem('roleList'))
        //     this.setMenuLabel(sessionStorage.getItem('menuLabel'))
        //     this.setSmallIconList(sessionStorage.getItem('smallIconList'))
        //     this.setSecondMenuList(sessionStorage.getItem('secondMenuList'))
        // }
    }
}
</script>

<style>

</style>

<style lang="scss" scoped>
#app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
    width: 100vw;
    height: 100vh;
    color: #FFFFFF;
    overflow: hidden;
}

// nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
<style lang="scss" 
  src="./assets/css/common.scss">
</style>