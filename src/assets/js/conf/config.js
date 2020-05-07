let prodUrl = "//vueshop.glbuys.com";//生产环境
let devUrl = "/api";//开发者环境
let baseUrl = process.env.NODE_ENV === 'development' ? devUrl : prodUrl;
export default {
    baseUrl: baseUrl,
    path: "/",
    token: "1ec949a15fb709370f"
}
