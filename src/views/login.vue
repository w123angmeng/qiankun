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
        console.log("====window.globalUrl", window.globalUrl)
    },
    computed: {
        ...mapMutations({
            setToken: "user/setToken",
        }),
    },
    methods: {
        //登录业务
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.is360 = this._mime(
                        "type",
                        "application/vnd.chromium.remoting-viewer"
                    );
                    if (this.isChrome() && this.is360) {
                        // 兼容360浏览器写法
                        let element = document.documentElement;
                        if (element.webkitRequestFullScreen) {
                            element.webkitRequestFullScreen();
                        }
                    }
                    let newObj = Object.assign({}, this.ruleForm);
                    newObj.password = this.$md5(newObj.password);
                    this.$axios
                        .post("upm/login", newObj)
                        .then((res) => {
                            if (res.success) {
                                this.$notify({
                                    type: "success",
                                    message:
                                        "欢迎你," +
                                        this.ruleForm.accountName +
                                        "!",
                                    duration: 1000,
                                });
                                let idUserAccount =
                                    sessionStorage.getItem("idUserAccount")
                                if (idUserAccount == res.data.idUserAccount) {
                                    this.isSameOne = true;
                                } else {
                                    this.isSameOne = false;
                                }
                                sessionStorage.setItem(
                                    "idUserAccount",
                                    res.data.idUserAccount
                                );
                                sessionStorage.setItem("token", res.data.token);
                                sessionStorage.setItem(
                                    "login",
                                    JSON.stringify(res.data)
                                );
                            } else {
                                this.$message({
                                    type: "warning",
                                    message: res.message,
                                    showClose: true,
                                    customClass: "showMessageZIndexFlag",
                                });
                                return false;
                            }
                        })
                        .then((res) => {
                            console.log("res", res);
                        });
                } else {
                    return false;
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