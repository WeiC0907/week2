//Vue 初始化
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
createApp({
    data() {
        return {
            temp: {},
            product: [],
            apiUrl: "https://vue3-course-api.hexschool.io/v2",
            apiPath: "wei2330"
        }
    },
    methods: {
        //驗證帳號，若錯誤返回登入頁面
        check() {
            axios.post(`${this.apiUrl}/api/user/check`)
                .then(() => {
                    this.getProductsData()
                })
                .catch((err) => {
                    window.location="login.html"
                })
        },
        //取得產品資訊
        getProductsData() {
            axios.get(`${this.apiUrl}/api/${this.apiPath}/admin/products`)
                .then((res) => {
                    // console.log(res.data.products);
                    this.product = res.data.products;
                })
                .catch((err) => {
                    alert(err.response.data.message);
                })
        },
        //點擊按鈕後將詳細資訊顯示
        details(item){
            this.temp=item;
            // console.log(this.temp);
        }
    },
    mounted() {
        //取出token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;

        //執行 check函式
        this.check()
      }
}).mount("#app")