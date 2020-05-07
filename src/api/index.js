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
