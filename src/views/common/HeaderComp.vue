<template>
  <div class="headerWrap fw">
    <div class="lw">
        <img alt="Vue logo" src="../../assets/logo.png" />医院名称
        <span>{{patientInfo ? `${patientInfo.name}-${patientInfo.sex}-${patientInfo.age}` : ''}}</span>
        <span>全局状态{{$global}}</span>
    </div>
    <div class="rw">
        当前登录科室：微机室 {{userInfo.name}}
        <el-button type="text" @click="btnClickBack"> | 返回首页</el-button>
        <el-button type="text" @click="btnClickLogout"> | 退出登录</el-button>
        <el-button type="text" @click="btnClickOpen"> | 点击弹窗</el-button>
    </div>
    <!-- 公共组件 -->
    <!-- <CommonDialog :dialogData="dialogData" @handleClose="handleClose"></CommonDialog> -->
  </div>
</template>

<script>
// import { mapMutations, mapGetters } from "vuex";
import {mapState} from "vuex";
export default {
  name: "HeaderComp",
  data(){
    return {
        dialogData: {
            visible: false,
            content: "这是父组件-调用公共组件"
        },
    }
  },
  components: {
    // HelloWorld,
    // CommonDialog: () => import('lib_remote/CommonDialog'),
  },
  computed: {
        ...mapState({
            userInfo: state => state.user.userInfo,
            patientInfo: state => state.patient.patientInfo
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
    },
    btnClickOpen() {
        this.dialogData.visible = true
    },
    handleClose(data) {
        console.log("父监听到弹窗关闭", data)
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
