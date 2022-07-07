export default module = {
	namespaced: true,
    state: {
		userInfo: {}, // 患者信息
    },
    mutations: {
		setUserInfo(state, data) {
            sessionStorage.setItem("userInfo", JSON.stringify(data));
            state.userInfo =  data
        },
		delUserInfo(state, data) {
            sessionStorage.removeItem("userInfo")
			state.patientInfo = {}
		}
    },
    actions: {
        // actions一般是处理异步逻辑
        // someAction(context, componentData) {
        //     context.commit('increment', componentData);
        // }
    }
}