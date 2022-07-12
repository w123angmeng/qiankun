<template>
    <div class="page">
        <HeaderComp></HeaderComp>
        <ul class="mainw">
            <li class="subSysItem" v-for="(item, ind) in sysList" :key="ind">
                <router-link :to="item.path">
                    <!-- <img src="" alt=""> -->
                    <i class="img el-icon-picture-outline"></i>
                    <div class="name">{{ item.name }}</div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import {mapState} from "vuex";
// import NavMenu from "@/views/common/NavMenu";
import HeaderComp from "@/views/common/HeaderComp";

export default {
    name: "MainView",
    components: {
        HeaderComp,
        // NavMenu
    },
    data() {
        return {
            sysList: [
                {
                    name: "app1",
                    path: "/app1",
                },
                {
                    name: "app2",
                    path: "/app2",
                },
            ],
        };
    },
    computed: {
        ...mapState({
            moduleList: (state) => state.common.moduleList,
        })
    },
    created() {
        this.initData()
    },
    methods: {
        initData() {
            console.log("moduleList:", this.moduleList)
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
    .subSysItem {
        .img {
            font-size: 66px;
            // width: 66px;
            // height: 66px;
        }
        .name {
            height: 40px;
            line-height: 40px;
            color: #000000;
            font-size: 22px;
        }
    }
}
</style>
