// 用户相关请求模块
import request from "@/utils/request"
// 用户登录
export const login = data => {
    // data是LoginIndex传递来的this.user
    return request({
        method: "POST",
        url: "/mp/v1_0/authorizations",
        //data用来设置POST请求
        data,
    })
}
// 获取用户信息

// 修改用户信息
