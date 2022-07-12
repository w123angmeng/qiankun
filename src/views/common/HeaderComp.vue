<template>
  <div class="headerWrap fw">
    <div class="lw">
        <img alt="Vue logo" src="../../assets/logo.png" />医院名称
    </div>
    <div class="rw">
        当前登录科室：微机室 {{userInfo.name}}
        <el-button type="text" @click="btnClickBack"> | 返回首页</el-button>
        <el-button type="text" @click="btnClickLogout"> | 退出登录</el-button>
    </div>
  </div>
</template>

<script>
// import { mapMutations, mapGetters } from "vuex";
import {mapState} from "vuex";
export default {
  name: "HeaderComp",
  components: {
    // HelloWorld,
  },
  computed: {
        ...mapState({
            userInfo: state => state.user.userInfo
        }),
    },
    created(){
        console.log("main this:", this)
    },
  methods: {
    btnClickBack() {
        this.$router.push({
                    path: "/"
                })
    },
    btnClickLogout() {
        this.$router.push({
                path: "/login"
        })
    }
  }
};
</script>
<style lang="scss">
.headerWrap {
    height: 48px;
    line-height: 48px;
    * {
        color: #FFFFFF;
    }
}
.fw {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #005CAB;
    .lw {
        img {
            display: inline-block;
            width: 30px;
            height: 30px;
            line-height: 50px;
            border-radius: 50%;
        }
    }
}
</style>
