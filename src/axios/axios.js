import axios from "axios";
import router from "../router";
import { ElMessage } from 'element-plus'

// 创建 axios 实例
const request = axios.create({
    timeout: 5000,
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    }
});

// 响应拦截器
request.interceptors.response.use(
    response => {
        const res = response.data; // 假设后端的响应格式是 { code: 200, data: ..., msg: ... }

        if (res.code === 200) {
            return res; // 请求成功，返回数据
        } else {
            // 处理非 200 的响应
            handleError(res.msg || "系统异常"); // 统一处理错误信息
            return Promise.reject(new Error(res.msg || "系统异常")); // 返回错误信息
        }
    },
    error => {
        // 处理请求失败的情况
        let errorMessage = "请求失败"; // 默认错误信息

        if (error.response && error.response.data) {
            errorMessage = error.response.data.msg; // 如果后端有返回错误信息
        } else if (error.response) {
            errorMessage = `错误状态码: ${error.response.status}`; // 处理其他状态码
        }

        if (error.response && error.response.status === 401) {
            router.push("/login"); // 如果未授权，跳转到登录页
        }

        handleError(errorMessage); // 统一处理错误信息
        return Promise.reject(error); // 返回错误信息
    }
);

// 统一处理错误信息的函数
const handleError = (message) => {
    ElMessage.error(message, { duration: 3000 }); // 显示错误信息
};

// 正确导出 axios 实例
export default request;
