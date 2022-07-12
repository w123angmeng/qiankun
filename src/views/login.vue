<template>
    <div class="login-wrap" :style="{ backgroundImage: 'url(' + bg + ')' }">
        <!-- <div class="login-wrap"> -->
        <!-- 登录 -->
        <div class="ms-login">
            <div class="ms-title">{{ systemTitle }}</div>
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="0px"
                class="ms-content"
            >
                <el-form-item label prop="accountName">
                    <el-input
                        prefix-icon="el-icon-user"
                        v-model.trim="ruleForm.accountName"
                        placeholder="用户名"
                        @keyup.enter.native="enterNext"
                    ></el-input>
                </el-form-item>
                <el-form-item label prop="password">
                    <el-input
                        ref="password"
                        type="password"
                        placeholder="密码"
                        prefix-icon="el-icon-lock"
                        v-model="ruleForm.password"
                        @keyup.enter.native="submitForm('ruleForm')"
                    ></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')"
                        >登录</el-button
                    >
                </div>
            </el-form>
        </div>
        <!-- <copy></copy> -->
    </div>
</template>

<script>
// import * as items from "@/assets/utils.js";
import { mapMutations } from "vuex";
import md5 from "js-md5";
let that = null
// import bus from "@/components/common/bus.js";
// import copy from "@/assets/CommonUtils/component/copyright/copyright.vue"
// import { mixinMedicalExe } from '@/components/page/ChargeManage_WEB/common/mixins/mixinMedicalExe'; // 医保调用exe

// import { mixinWebPrint } from "@/components/page/Common_WEB/mixins/mixinWebPrint.js";
export default {
    data: function () {
        return {
            systemTitle: window.globalUrl.systemTitle, //系统名字
            // thirdSigns: process.env.thirdSign, // 非HIS系统标识, 默认false, 第三方为true
            ruleForm: {
                accountName: "",
                password: "",
            },
            rules: {
                accountName: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur",
                    },
                ],
                password: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur",
                    },
                ],
            },
            modifyForm: {
                oldPwd: "",
                newPwd: "",
                confirmPwd: "",
            },
            isSameOne: true, // 用来判断是否是同一人登陆
            fullscreen: false, // 是否全屏
            is360: false,
            bg: require("@/assets/images/login/login.png"),
            userInfo: {
                idUserAccount: "",
                empName: "",
            },
        };
    },
    // created() {
    //     console.log("====window.globalUrl", window.globalUrl)
    // },
    mounted() {
        that = this
        console.log("====window.globalUrl", that, window.globalUrl);
    },
    methods: {
        ...mapMutations({
            setToken: "user/setToken",
            setUserInfo: "user/setUserInfo",
            setModuleList: "common/setModuleList",
            setRoleList: "common/setRoleList"
        }),
        //登录业务
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let tokenRes = await this.getToken();
                    let userRes = await this.getLoginUser(tokenRes.idUserAccount);
                    //判断用户有哪些权限：只有一个模块还是多个(例：只有门诊，直接到默认路由；多个模块，跳转欢迎页列表)
                    let modulData = userRes.moduleList[0];
                    let roleStr = "";
                    userRes.roleList.map((item) => {
                        roleStr += item.idRole + ",";
                    });
                    let obj = {
                        idSystem: modulData.value, //模块ID
                        idRoles: roleStr, //角色ID
                    };
                    await this.listCommomPage(obj); //查询当前模块的权限页面
                    sessionStorage.setItem(
                        "menuLabel",
                        JSON.stringify(modulData)
                    );
                    await this.getSecondMenuList(obj); //查当前系统下二级菜单列表

                    if (userRes.moduleList.length > 1) {
                        //当前登录医生有多个模块
                        this.$router.push({
                            path: "/"
                        })
                    } else {
                        //当前登录医生只有1个模块
                        let goUrl = modulData.resourceUrl;
                        //当前登录医生只有一个模块权限
                        this.comeRouter({ path: `/${goUrl}` });
                    }
                } else {
                    return false;
                }
            });
        },
        getToken() {
            let newObj = Object.assign({}, this.ruleForm);
            newObj.password = md5(newObj.password);
            return this.$axios.post("upm/login", newObj).then((res) => {
                console.log("res:", res);
                if (res.success) {
                    this.$message({
                        type: "success",
                        message: "欢迎你," + this.ruleForm.accountName + "!",
                        duration: 1000,
                    });
                    // let idUserAccount =
                    //     sessionStorage.getItem("idUserAccount")
                    // if (idUserAccount == res.data.idUserAccount) {
                    //     this.isSameOne = true;
                    // } else {
                    //     this.isSameOne = false;
                    // }
                    // sessionStorage.setItem(
                    //     "idUserAccount",
                    //     res.data.idUserAccount
                    // );

                    this.setToken(res.data.token);
                    return res.data;
                    // sessionStorage.setItem("token", res.data.token);
                    // sessionStorage.setItem(
                    //     "login",
                    //     JSON.stringify(res.data)
                    // );
                } else {
                    this.$message({
                        type: "warning",
                        message: res.message,
                        showClose: true,
                        customClass: "showMessageZIndexFlag",
                    });
                    return false;
                }
            });
        },
        getLoginUser(idUserAccount = "") {
            return this.$axios
                .get("upm/findAccountInfo", {
                    idUserAccount: idUserAccount,
                })
                .then((resp) => {
                    if (resp.success) {
                        // sessionStorage.setItem(
                        //     "moduleList",
                        //     JSON.stringify(resp.data.moduleList)
                        // );
                        // sessionStorage.setItem(
                        //     "roleList",
                        //     JSON.stringify(resp.data.roleList)
                        // );

                        // let user = resp.data;
                        // if (this.thirdSigns) {
                        //     user.thirdSign = "EMR&ND";
                        // }
                        // if (process.env.orgName == "hlws") {
                        //     user.idEmp = user.empCode;
                        // }
                        this.setModuleList(resp.data.moduleList)
                        this.setRoleList(resp.data.roleList)
                        this.setUserInfo(resp.data);
                        return resp.data
                        // sessionStorage.setItem("user", JSON.stringify(user));
                        // this.API.api.user = resp.data;
                        // this.API.api.idOrg = resp.data.idOrg;
                        // bus.$emit("outOfToken", false);
                        // 医保登录

                        // if (user.roleList.length) {
                        //     let isChargeManage = user.roleList.some(
                        //         (v) => v.name == "收费员"
                        //     );
                        //     isChargeManage && this.getMedicalInsFn();
                        // }
                        // let sock = false;
                        // this.findWorkerIdDept(user.idEmp).then(async (data) => {
                        //     for (let i = 0; i < data.length; i++) {
                        //         if (data[i].label == user.deptName) {
                        //             sock = true;
                        //             break;
                        //         }
                        //     }
                        //     // 号源池 人员关联工作组为空可以正常登陆
                        //     if (!sock && data.length) {
                        //         let userParmas = this.getUserStorage();
                        //         userParmas.idDept = data[0].value;
                        //         userParmas.wardCode = data[0].value;
                        //         userParmas.deptName = data[0].label;
                        //         sessionStorage.setItem(
                        //             "user",
                        //             JSON.stringify(userParmas)
                        //         );
                        //     }
                        //     this.SET_TOKENSTATUS(false); // 当用户主动点击时, tokenStaus设置为true, 登录成功时设置为false
                        //     if (
                        //         this.isSameOne &&
                        //         window.location.href.split("#")[1] != "/login"
                        //     ) {
                        //         // this.comeRouter({
                        //         //     path: window.location.href.split("#")[1],
                        //         // });
                        //     } else {
                        //         //判断用户有哪些权限：只有一个模块还是多个(例：只有门诊，直接到默认路由；多个模块，跳转欢迎页列表)
                        //         let modulData = resp.data.moduleList[0];

                        //         let roleStr = "";
                        //         resp.data.roleList.map((item) => {
                        //             roleStr += item.idRole + ",";
                        //         });

                        //         let obj = {
                        //             idSystem: modulData.value, //模块ID
                        //             idRoles: roleStr, //角色ID
                        //         };
                        //         await this.listCommomPage(obj); //查询当前模块的权限页面
                        //         sessionStorage.setItem(
                        //             "menuLabel",
                        //             JSON.stringify(modulData)
                        //         );
                        //         await this.getSecondMenuList(obj); //查当前系统下二级菜单列表

                        //         if (resp.data.moduleList.length > 1) {
                        //             //当前登录医生有多个模块
                        //             this.comeRouter({ path: "/welcome" });
                        //         } else {
                        //             //当前登录医生只有1个模块
                        //             let goUrl = modulData.resourceUrl;
                        //             //当前登录医生只有一个模块权限
                        //             this.comeRouter({ path: `/${goUrl}` });
                        //         }
                        //     }

                            // bus.$emit("reload", true);
                            // 登录完成默认全屏
                            // this.fullScreen();

                            // this.isMCLogin();
                        // });
                    } else {
                        this.$message({
                            message: resp.message,
                            type: "warning",
                        });
                    }
                });
        },

        //查当前模块下常用页面列表
        async listCommomPage(obj) {
            let res = await this.getRouteModuleList(obj);
            if (res.success) {
                console.log("返回的模块列表：", res.data);
                sessionStorage.setItem(
                    "smallIconList",
                    JSON.stringify(res.data)
                );
            } else {
                this.$message({
                    type: "error",
                    message: res.message,
                });
            }
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
        async getSecondMenuList(obj) {
            let data = [];
            // const [err, res] = await this.awaitWrap(this.$axios.get("/upm/listResBySystemWithId", {
            const [res] = await this.awaitWrap(
                this.$axios.get("/upm/listResBySystemWithId", {
                    selCondition: "",
                    idSystem: obj.idSystem,
                    idRoles: obj.idRoles,
                })
            );
            if (res && res.success) {
                data = res.data || [];
            } else if (res && !res.success) {
                this.$message.warning(res.message);
            }
            // 把二级菜单存在缓存里，路由守卫的时候会用对应的id来查按钮权限
            sessionStorage.setItem("secondMenuList", JSON.stringify(data));
        },
        awaitWrap(promise) {
            return promise
                .then(data => [null, data])
                .catch(err => [err, null])
        },
        //查询工作组科室
        async findWorkerIdDept(idEmp) {
            //诊间预约进来的不需要调工作组接口
            if (this.$route.query.accountName) return;
            let vm = this;
            return await vm.$axios
                .get("/org/dept/findWorkGroupDeptByIdEmp", {
                    idEmp: idEmp,
                    flag: "",
                    idDept: "",
                })
                .then((res) => {
                    if (res.success) {
                        return res.data;
                    } else {
                        vm.$message({
                            message: res.message,
                            type: "warning",
                        });
                    }
                });
        },
        //下一步
        enterNext() {
            this.$refs.password.focus();
        },
        // 全屏
        fullScreen() {
            let element = document.documentElement;
            if (!this.fullscreen) {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
        },
        //检测是否是谷歌内核(可排除360及谷歌以外的浏览器)
        isChrome() {
            var ua = navigator.userAgent.toLowerCase(); //检测浏览器内核标识
            return ua.indexOf("chrome") > 1;
        },
        //测试mime
        _mime(option, value) {
            var mimeTypes = navigator.mimeTypes;
            for (var mt in mimeTypes) {
                if (mimeTypes[mt][option] == value) {
                    return true;
                }
            }
            return false;
        },
        // 收费--调用医保平台登陆接口
        async getMedicalInsFn() {
            let TerminalInfo = await this.$axios.get(
                `${window.globalUrl.printUrl}/card`,
                {
                    type: 3,
                }
            );
            let params = {
                AppCode: "001",
                LoginName: JSON.parse(sessionStorage.user).empName,
                TerminalNo: TerminalInfo.ip,
            };
            this.medicalLogin(params);
        },
    },
};
</script>

<style lang="scss" scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center center;
}

.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}

.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}

.ms-content {
    padding: 30px 30px;
}

.login-btn {
    text-align: center;
}

.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
</style>