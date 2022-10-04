<template>
    <div class="login-container">
        <!--
      el-form 表单组件
      每个表单项都必须使用 el-form-item 组件包裹

      配置Form表单验证:
      1.必须给el-form 组件绑定 model 为表单数据对象
      2.给需要验证的表单项 el-form-item 绑定 prop 属性
        注意：prop 属性需要指定表单对象中的数据名称
        通过 el-form 组件的 rules 属性配置验证规则

    手动触发表单验证：
    1. 给 el-ref 设置 ref 
    2. 通过 ref 获 el-form 组件，调用组件的validate进行验证
     -->
        <el-form class='login-from' :rules="formRules" ref="login-form" :model="user">
            <el-form-item>
                <div class="login-header"></div>
            </el-form-item>
            <el-form-item prop="mobile">
                <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="login-btn" type="primary" @click="onLogin" :loading="loginLoading">登录</el-button>
            </el-form-item>
            <el-form-item prop="agree">
                <el-checkbox v-model="user.agree">
                    我已阅读并同意用户协议和隐私条款
                </el-checkbox>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
// export 导出的按需加载
import { login } from "@/api/user";
export default {
    name: "LoginIndex",
    data() {
        var validate = (rule, value, callback) => {
            // console.log(rule, value);
            // value是true或者false
            if (value) {
                callback(); // 验证通过
            } else {
                // 验证失败
                callback(new Error("请同意用户协议"));
            }
        };
        return {
            user: {
                mobile: "",
                code: "",
                agree: false,
            },
            formRules: {
                mobile: [
                    {
                        required: true,
                        message: "手机号不能为空",
                        trigger: "blur", //失去焦点触发表单验证
                    },
                    {
                        pattern: /^1[3|5|7|8|9]\d{9}$/,
                        message: "请输入正确的号码格式",
                        trigger: "change",
                    },
                ],
                code: [
                    {
                        required: true,
                        message: "验证码不能为空",
                        trigger: "blur",
                    },
                    {
                        pattern: /^\d{6}$/,
                        message: "请输入正确的验证格式",
                        trigger: "change",
                    },
                ],
                agree: [
                    {
                        validator: validate,
                        trigger: "change",
                    },
                ],
            },
            // checked: false, // 是否同意选中状态
            loginLoading: false, // 登录的loading状态
        };
    },
    methods: {
        onLogin() {
            // 获取表单数据 (根据接口要求)
            // const user = this.user;
            // 表单验证  validate方法是异步的
            // console.log(this.$refs["login-form"]); // 得到ref作用的表单组件
            this.$refs["login-form"].validate((valid) => {
                // 如果验证失败，停止请求提交
                if (!valid) {
                    return; // 代码不执行
                }
                // 验证通过，请求登录
                this.login();
            });
        },
        login() {
            // 开启登录中 loading....
            this.loginLoading = true;

            login(this.user) // this.user是传递过去的参数
                .then((res) => {
                    console.log(res);
                    this.$message({
                        message: "恭喜你，这是一条成功消息",
                        type: "success",
                    });
                    // 关闭loading
                    this.loginLoading = false;
                    // 跳转到首页
                    // 方法一：通过路径跳转
                    // this.$router.push("/");
                    // 方法二：通过名字跳转
                    this.$router.push({
                        name: "home",
                    });
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