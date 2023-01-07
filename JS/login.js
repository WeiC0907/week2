//Vue 初始化
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
const url ='https://vue3-course-api.hexschool.io/v2'
createApp({
    data() {
        return {
            user: {
                username: "",
                password: ""
            },
        }
    },
    methods: {
        login() {
            //使用 post驗證帳號密碼
            axios.post(`${url}/admin/signin`, this.user)
                .then((res) => {
                    //定義 token 及時間戳記
                    const { token, expired } = res.data;
                    //儲存cookie
                    document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
                    //正確時轉址至產品頁面
                    window.location = "products.html";
                })
                .catch((err) => {
                    //驗證錯誤時跳出錯誤訊息
                    alert(err.response.data.message);
                })
        }
    }
}).mount("#app")