<template>
    <div class="page">
        <HeaderComp></HeaderComp>
        <ul class="mainw">
            <li class="subSysItem" v-for="item in moduleList" :key="item.value" @click="selectSysItem(item)">
                <!-- <router-link :to="item.resourceUrl"> -->
                    <!-- <img src="" alt=""> -->
                    <i class="img el-icon-picture-outline"></i>
                    <div class="name">{{ item.label }}</div>
                <!-- </router-link> -->
            </li>
        </ul>
    </div>
</template>

<script>
import {mapState, mapMutations} from "vuex";
// import NavMenu from "@/views/common/NavMenu";
import HeaderComp from "@/views/common/HeaderComp";

export default {
    name: "MainView",
    components: {
        HeaderComp,
        // NavMenu
    },
    computed: {
        ...mapState({
            moduleList: state => state.common.moduleList,
            roleList: state => state.common.roleList,
        }),
    },
    data() {
        return {
            // sysList: [
            //     {
            //         label: "app1",
            //         path: "/app1",
            //     },
            //     {
            //         label: "app2",
            //         path: "/app2",
            //     },
            // ],
        };
    },
    created() {
        this.initData()
    },
    methods: {
        ...mapMutations({
            setMenuLabel: "common/setMenuLabel",
            setSmallIconList: "common/setSmallIconList",
            setSecondMenuList: "common/setSecondMenuList"
        }),
        initData() {
            console.log("moduleList:", this.moduleList)
        },
        async selectSysItem(item) {
            if(item.label == 'app2') {
                this.setSecondMenuList([{
                    id: "6969dac00000090a12",
                    index: "demo1",
                    name: "demo1",
                },{
                    id: "6969dac00000090a13",
                    index: "demo2",
                    name: "demo2",
                },
                ])
                this.$router.push({
                    path: `/app2/${item.resourceUrl}`
                })
                return
            }
            this.setMenuLabel(item)
            let obj = {
                idSystem:item.value,//模块ID
                idRoles: this.roleList.map(v=>v.idRole).join(',') //角色ID
            }
            // 常用模块
            let comRes = await this.getRouteModuleList(obj);
            this.setSmallIconList(comRes.data)

            // 查当前系统下二级菜单列表
            let [err, res] = await this.getSecondMenuList(obj);
            let subData = res.data
            console.log("二级菜单：", subData,err)
            this.setSecondMenuList(subData)
            this.$router.push({
                path: `/outpNurse/${item.resourceUrl}`
            })
        },
        getRouteModuleList(obj){
            // return this.$axios.post('/upm/resource/listCommomPage', obj);
            return this.$axios.post('/upm/resource/listCommomPage', obj).then(res=>{
                if(res.success && res.data && res.data.length){ //添加字段index，用于处理小导航高亮
                    res.data.forEach(item=>{
                        item.index = item.resourceUrl;
                        if(item.otherSystemSign == this.CONSTANT.IS_OTHER_SYSTEM_SIGN){
                            item.index = item.idResource;
                        }
                    })
                }
                return res;
            })
        },
    
        //查当前系统下二级菜单列表
        async getSecondMenuList(obj){
            // let data = [];
            return await this.awaitWrap(this.$axios.get("/upm/listResBySystemWithId", {
                selCondition: '',
                idSystem: obj.idSystem,
                idRoles: obj.idRoles
            }));
            // console.log("===res:", res)
            // if(res && res.success){
            //     console.log("listResBySystemWithId:", res)
            //     return res.data || [];
            // }else if(res && !res.success){
            //     this.$message.warning(res.message);
            // }
        },
        awaitWrap(promise) {
            return promise
                .then(data => [null, data])
                .catch(err => [err, null])
        },
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
