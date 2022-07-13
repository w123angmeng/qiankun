export default {
	namespaced: true,
    state: {
		computerInfo: "", // 电脑信息
        moduleList: [], // 模块
        roleList: [], // 角色
        menuLabel: {}, // 选中模块
        smallIconList: [], // 常用模块
        secondMenuList: [], // 子菜单
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
        // someAction(context, componentData) {
        //     context.commit('increment', componentData);
        // }
    }
}