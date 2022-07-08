export default {
	namespaced: true,
    state: {
		computerInfo: "", // 电脑信息
    },
    mutations: {
        setComputerInfo(state, data) {
            state.computerInfo =  data
        },
        delComputerInfo(state) {
            state.computerInfo = {}
        }
    },
    actions: {
        // actions一般是处理异步逻辑
        // someAction(context, componentData) {
        //     context.commit('increment', componentData);
        // }
    }
}