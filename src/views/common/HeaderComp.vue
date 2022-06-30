<template>
  <div class="headerWrap fw">
    <div class="lw">
        <img alt="Vue logo" src="../../assets/logo.png" />医院名称
    </div>
    <div class="rw">
        当前登录科室：微机室
        <el-button type="text"> | 返回首页</el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: "HeaderComp",
  components: {
    // HelloWorld,
  },
};
</script>
<style lang="scss" scoped>
.headerWrap {
    height: 48px;
    line-height: 48px;
    color: #FFFFFF;
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
