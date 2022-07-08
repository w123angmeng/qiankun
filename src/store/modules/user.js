export default {
	namespaced: true,
    state: {
		userInfo: {}, // 患者信息
        token: "", // token
    },
    mutations: {
		setUserInfo(state, data) {
            sessionStorage.setItem("userInfo", JSON.stringify(data));
            state.userInfo =  data
        },
		delUserInfo(state) {
            sessionStorage.removeItem("userInfo")
			state.patientInfo = {}
		},
        setToken(state, data) {
            state.token =  data
        },
        delToken(state) {
            state.token = {}
        }
    },
    actions: {
        // actions一般是处理异步逻辑
        // someAction(context, componentData) {
        //     context.commit('increment', componentData);
        // }
    }
}