export default module = {
	namespaced: true,
    state: {
		scanInfo: "", // PDA扫码信息
		temperature: "", // PDA体温
        hasNetWork: true, // 是否有网络
    },
    mutations: {
        setScanInfo(state, data) {
            state.scanInfo =  data
        },
		setTemperature(state, data) {
			state.temperature = data
		},
		setNetwork(state, data) {
			state.hasNetWork = data
		}
    },
    actions: {
        // actions一般是处理异步逻辑
        // someAction(context, componentData) {
        //     context.commit('increment', componentData);
        // }
    }
}