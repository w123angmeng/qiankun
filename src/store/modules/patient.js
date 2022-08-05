export default {
	namespaced: true,
    state: {
		patientInfo: JSON.parse(sessionStorage.getItem('patientInfo')) || null, // 患者信息
    },
    mutations: {
		setPatientInfo(state, data) {
			sessionStorage.setItem("patientInfo", JSON.stringify(data));
            state.patientInfo =  data
        },
		delPatientInfo(state) {
            sessionStorage.removeItem("patientInfo")
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