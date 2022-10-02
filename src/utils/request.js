// 基于 axios 封装的请求模块
import axios from "axios"

// 创建一个 axios 实例 说白了就是复制了一个 axios
// 通过这个实例去发请求，把需要的配置配置给这个实例来处理
const request = axios.create({
    baseURL: "http://big-event-vue-api-t.itheima.net",
})

export default request
