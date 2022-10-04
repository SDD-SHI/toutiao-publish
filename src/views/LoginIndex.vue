<template>
    <div class="login-container">
        <!--
      el-form 表单组件
      每个表单项都必须使用 el-form-item 组件包裹
     -->
        <!-- <div class="login-header"></div> -->
        <el-form class='login-from' ref="form" :model="user">
            <el-form-item>
                <div class="login-header"></div>
            </el-form-item>
            <el-form-item>
                <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="login-btn" type="primary" @click="onLogin" :loading="loginLoading">登录</el-button>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="checked">
                    我已阅读并同意用户协议和隐私条款
                </el-checkbox>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import request from "@/utils/request";
export default {
    name: "LoginIndex",
    data() {
        return {
            user: {
                mobile: "",
                code: "",
            },
            checked: false, // 是否同意选中状态
            loginLoading: false, // 登录的loading状态
        };
    },
    methods: {
        onLogin() {
            // 获取表单数据 (根据接口要求)
            const user = this.user;
            // 表单验证
            // 验证通过，提交登录

            // 开启登录中 loading....
            this.loginLoading = true;
            request({
                method: "POST",
                url: "/mp/v1_0/authorizations",
                //data用来设置POST请求
                data: user,
            })
                .then((res) => {
                    console.log(res);
                    this.$message({
                        message: "恭喜你，这是一条成功消息",
                        type: "success",
                    });
                    // 关闭loading
                    this.loginLoading = false;
                })
                .catch((err) => {
                    console.log("登录失败", err);
                    this.$message.error("登录失败，手机号或验证码错误");
                    // 关闭loading
                    this.loginLoading = false;
                });
            // 处理后端响应结果 成功：XXX  失败：XXX
        },
    },
};
</script>

<style lang="less" scoped>
.login-container {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url("@/assets/login_bg.jpg") no-repeat;
    background-size: cover;
    .login-header {
        width: 100%;
        height: 57px;
        background: url("@/assets/logo_index.png") no-repeat;
    }
    .login-from {
        background-color: #fff;
        padding: 50px;
        min-width: 300px;
    }
    .login-btn {
        width: 100%;
    }
}
</style>