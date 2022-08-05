export default {
	namespaced: true,
    state: {
		computerInfo: JSON.parse(sessionStorage.getItem('computerInfo')) || "", // 电脑信息
        moduleList: JSON.parse(sessionStorage.getItem('moduleList')) || [], // 模块
        roleList: JSON.parse(sessionStorage.getItem('roleList')) || [], // 角色
        menuLabel: JSON.parse(sessionStorage.getItem('menuLabel')) || {}, // 选中模块
        smallIconList: JSON.parse(sessionStorage.getItem('smallIconList')) || [], // 常用模块
        secondMenuList: JSON.parse(sessionStorage.getItem('secondMenuList')) || [], // 子菜单
    },
    mutations: {
        setComputerInfo(state, data) {
            state.computerInfo =  data
        },
        setModuleList(state, data) {
            sessionStorage.setItem("moduleList", JSON.stringify(data));
            state.moduleList =  data
        },
        setRoleList(state, data) {
            sessionStorage.setItem("roleList", JSON.stringify(data));
            state.roleList =  data
        },
        setMenuLabel(state, data) {
            sessionStorage.setItem("menuLabel", JSON.stringify(data));
            state.menuLabel =  data
        },
        setSmallIconList(state, data) {
            sessionStorage.setItem("smallIconList", JSON.stringify(data));
            state.smallIconList =  data
        },
        setSecondMenuList(state, data) {
            sessionStorage.setItem("secondMenuList", JSON.stringify(data));
            state.secondMenuList =  data
        },
        delComputerInfo(state) {
            state.computerInfo = {}
        },

    },
    actions: {
        // actions一般是处理异步逻辑
        // initDataAction(context, componentData) {
        //     context.commit('increment', componentData);
        //     ...mapMutations({
        //         setToken: "user/setToken",
        //         setUserInfo: "user/setUserInfo",
        //         setModuleList: "common/setModuleList",
        //         setRoleList: "common/setRoleList"
        //     }),
        //     context.commit('setToken', sessionStorage.getItem(''))
        // }
    }
}