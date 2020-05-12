import {request} from '../assets/js/libs/request.js';
import config from "../assets/js/conf/config";

export function getSwiper() {
    return request(config.baseUrl + "/api/home/index/slide?token=" + config.token)
}

export function getNav() {
    return request(config.baseUrl + "/api/home/index/nav?token=" + config.token)
}

export function getGoodsLevel() {
    return request(config.baseUrl + "/api/home/index/goodsLevel?token=" + config.token)
}

export function getReco() {
    return request(config.baseUrl + "/api/home/index/recom?token=" + config.token)
}

export function getClassifyData() {
    return request(config.baseUrl + "/api/home/category/menu?token=" + config.token)
}

export function getItemData(cid) {
    return request(config.baseUrl + "/api/home/category/show?cid=" + cid + "&token=" + config.token)
}

export function getHotKeywords() {
    return request(config.baseUrl + "/api/home/public/hotwords?token=" + config.token)
}

export function getPageData(params) {
    return request(config.baseUrl + "/api/home/goods/search?" + params + "&page=1&token=" + config.token)
}

export function getScrollPage(params, curPage) {
    return request(config.baseUrl + "/api/home/goods/search?" + params + "&page=" + curPage + "&token=" + config.token)
}

export function getAttrData(keywords) {
    return request(config.baseUrl + "/api/home/goods/param?kwords=" + keywords + "&token=" + config.token)
}

// 获取商品详情的轮播图
export function getGoodsInfo(gid) {
    return request(config.baseUrl + "/api/home/goods/info?gid=" + gid + "&type=details&token=" + config.token)
}

// 获取商品详情的规格属性
export function getGoodsAttr(gid) {
    return request(config.baseUrl + "/api/home/goods/info?gid=" + gid + "&type=spec&token=" + config.token)
}

// 获取商品详情的评论
export function getReviews(gid) {
    return request(config.baseUrl + "/api/home/reviews/index?gid=" + gid + "&token=" + config.token + "&page=1")
}

// 商品加入收藏
export function addFav(uid, gid) {
    return request(config.baseUrl + "/api/goods/fav?uid=" + uid + "&gid=" + gid + "&token=" + config.token)
}

// 获取商品详情的评论的滚动页面
export function getReviewsScrollPage(gid, curPage) {
    return request(config.baseUrl + "/api/home/reviews/index?gid=" + gid + "&token=" + config.token + "&page=" + curPage)
}

// 获取商品详情的详情内容
export function getDetailsContent(gid) {
    return request(config.baseUrl + "/api/home/goods/info?gid=" + gid + "&type=details&token=" + config.token)
}
