<template>
    <div class="navWrap">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu
            default-active="1-4-1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
        >
            <el-submenu index="1" v-for="(item, ind) in menuList" :key="ind">
                <template slot="title">
                    <!-- <router-link :to="item.path"> -->
                        <i class="el-icon-location"></i>
                        <span slot="title">{{item.name}}</span>
                    <!-- </router-link> -->
                </template>
                <el-menu-item-group v-for="(cItem, cInd) in item.children" :key="`${ind}-${cInd}`">
                    <router-link :to="cItem.path">
                        <el-menu-item :index="`${ind}-${cInd}`">{{cItem.name}}</el-menu-item>
                    </router-link>
                    
                </el-menu-item-group>
            </el-submenu>
            <!-- <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
                <i class="el-icon-document"></i>
                <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">导航四</span>
            </el-menu-item> -->
        </el-menu>
    </div>
</template>
<script>
// import { mapMutations, mapGetters } from "vuex";
export default {
    name: "NavMenu",
    components: {
        // HelloWorld,
    },
    data() {
        return {
           isCollapse: true,
           menuList: [] 
        }
    },
    created() {
        console.log("当前路由：", this.$route.path)
        switch(this.$route.path) {
            case "/app1":
                this.menuList = [
                    {
                        name: "项目一",
                        children: [
                            {
                                path: "/app1/demo1",
                                name: "子项目一",
                            },
                            {
                                path: "/app1/demo2",
                                name: "子项目二",
                            }
                        ]
                    },
                    {
                        path: "/app1/demo2",
                        name: "项目二",
                        children: [
                            {
                                path: "/app1/demo2",
                                name: "子项目二",
                            }
                        ]
                    }
                ]
                break;
            case "/app2":
                this.menuList = [
                    {
                        name: "项目一",
                        children: [
                            {
                                path: "/app2/demo1",
                                name: "子项目一",
                            },
                            {
                                path: "/app2/demo2",
                                name: "子项目二",
                            }
                        ]
                    },
                    {
                        path: "/app2/demo2",
                        name: "项目二",
                        children: [
                            {
                                path: "/app2/demo2",
                                name: "子项目二",
                            }
                        ]
                    }
                ]
                break;
            default:
                break;
        }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
};
</script>
<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>