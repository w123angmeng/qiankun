<template>
    <div class="page">
        <HeaderComp></HeaderComp>
        <div class="mainw">
            <div class="lw">
                <NavMenu></NavMenu>
            </div>
            <div class="rw" id="container">
                <!-- <router-view /> -->
            </div>
        </div>
        <!-- 患者列表 -->
        <div @click="drawer = true">患者列表</div>
        <el-drawer
            title="患者列表"
            :visible.sync="drawer"
            direction="ltr"
        >
            <el-table :data="tableData" style="width: 100%" @row-click="selectRow">
                <el-table-column prop="name" label="患者姓名" width="180">
                </el-table-column>
                <el-table-column prop="age" label="年龄" width="180">
                </el-table-column>
                <el-table-column prop="sex" label="性别"> </el-table-column>
            </el-table>
        </el-drawer>
    </div>
</template>

<script>
import NavMenu from "@/views/common/NavMenu";
import HeaderComp from "@/views/common/HeaderComp"
import { start } from 'qiankun';
import { mapMutations } from "vuex";
export default {
  name: "mainView",
  components: {
    HeaderComp,
    NavMenu
  },
  data(){
    return {
        drawer: false,
        tableData: [{
            age: '23岁',
            name: '王小虎',
            sex: '女'
          }, {
            age: '24岁',
            name: '王二虎',
            sex: '男'
          }, {
            age: '24岁',
            name: '王大虎',
            sex: '未知'
          }]
    }
  },
  mounted() {
    if (!window.qiankunStarted) {
      window.qiankunStarted = true;
      start();
    }
  },
  methods:{ 
    ...mapMutations({
        setPatientInfo: "patient/setPatientInfo",
    }),
    selectRow(row) {
        console.log("点击选中当前行：", row)
        this.setPatientInfo(row)
        this.$global.setGlobalState(true)
    }
  }
};
</script>
<style lang="scss" scoped>
.page {
    width: 100%;
    height: 100%;
}
.mainw {
    display: flex;
    .lw {
        width: 180px;
    }
    .rw {
        flex: 1;
    }
}
</style>
