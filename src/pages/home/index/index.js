/*eslint-disable*/
import React, {Component} from 'react'
import Swiper from '../../../assets/js/libs/swiper.min.js';
import "../../../assets/css/common/swiper.min.css";
import {connect} from "react-redux";
import {lazyImg, setScrollTop} from '../../../assets/js/utils/util.js';
import {getSwiper, getNav, getGoodsLevel, getReco} from "../../../api";
import Css from '../../../assets/css/home/index/index.module.css';
// import config from '../../../assets/js/conf/config.js';
import SearchComponent from '../../../components/search/search';

class IndexComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aSwiper: [],
            aNav: [],
            aGoods: [],
            aRecoGoods: [],
            bScroll: false,
            pageStyle: {display: "none"}
        }
        // 控制内存溢出
        this.bScroll = true;
        this.swiperRef = React.createRef()

    }

    componentDidMount() {
        // setScrollTop(global.scrollTop.index);
        this.setSwiper()
        this.setNav()
        this.setGoodsLevel()
        this.setReco()
        window.addEventListener("scroll", () => this.eventScroll(), false);
    }

    componentWillUnmount() {
        this.bScroll = false
        window.removeEventListener("scroll", () => this.eventScroll());
    }

    eventScroll() {
        if (this.bScroll) {
            let iScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            // console.log(iScrollTop)
            // 记录页面滚动的位置
            // global.scrollTop.index = iScrollTop;
            if (iScrollTop >= 100) {
                this.setState({bScroll: true})
            } else {
                this.setState({bScroll: false})
            }
        }
    }

    pushPage(url) {
        this.props.history.push(url)
    }

    clickSearch() {
        console.log(1111111)
        this.setState({pageStyle: {display: "block"}})
    }

    setSwiper() {
        getSwiper().then(res => {
            if (res.code === 200) {
                this.setState({aSwiper: res.data}, () => {
                    new Swiper(this.swiperRef.current, {
                        autoplay: 3000,
                        pagination: '.swiper-pagination',
                        loop: true,
                        lazyLoading: true
                    })
                });
            }
        })
    }

    setNav() {
        getNav().then(res => {
            if (res.code === 200) {
                this.setState({aNav: res.data});
            }
        })
    }

    setGoodsLevel() {
        getGoodsLevel().then(res => {
            if (res.code === 200) {
                this.setState({aGoods: res.data}, () => {
                    lazyImg();
                })
            }
        })
    }

    setReco() {
        getReco().then(res => {
            if (res.code === 200) {
                this.setState({aRecoGoods: res.data}, () => {
                    lazyImg();
                })
            }
        })
    }

    getStyle(val) {
        this.setState({pageStyle: val})
    }

    render() {
        return (
            <div className={Css['page']}>
                {/*头部搜索框*/}
                <div
                    className={this.state.bScroll ? Css['search-header'] + " " + Css["red-bg"] : Css['search-header']}>
                    <div className={Css['classify-icon']} onClick={() => this.pushPage("goods/classify/items")}/>
                    <div className={Css['search-wrap']} onClick={() => this.clickSearch()}>
                        <div className={Css['search-icon']}/>
                        <div className={Css['search-text']}>请输入宝贝名称</div>
                    </div>
                    <div className={Css['login-wrap']}>
                        {
                            this.props.state.user.isLogin ?
                                <div className={Css['my']} onClick={this.pushPage.bind(this, "home/my")}/> :
                                <div className={Css['login-text']}
                                     onClick={this.pushPage.bind(this, "login/index")}>登录</div>
                        }
                    </div>
                </div>
                {/*/!*轮播图*!/*/}
                <div ref={this.swiperRef} className={Css['swiper-wrap']}>
                    <div className="swiper-wrapper">
                        {
                            this.state.aSwiper != null ?
                                this.state.aSwiper.map((item, index) => {
                                    return (
                                        <div key={index} className="swiper-slide">
                                            <a href={item.webs} target="_blank" rel="noopener noreferrer">
                                                <img src={item.image} alt={item.title}/></a>
                                        </div>
                                    )
                                }) : ""
                        }
                    </div>
                    <div className="swiper-pagination"/>
                </div>
                {/*/!*快速导航*!/*/}
                <div className={Css['quick-nav']}>
                    {
                        this.state.aNav != null ?
                            this.state.aNav.map((item, index) => {
                                return (
                                    <ul key={index} className={Css['item']}>
                                        <li className={Css['item-img']}>
                                            <img src={item.image} alt={item.title}
                                                 onClick={() => this.pushPage('goods/classify/items?cid=' + item.cid)}/>
                                        </li>
                                        <li className={Css['item-text']}>{item.title}</li>
                                    </ul>
                                )
                            }) : ''
                    }
                </div>
                {/*/!*card部分*!/*/}
                {
                    this.state.aGoods != null ?
                        this.state.aGoods.map((item, index) => {
                            return (
                                <div key={index} className={Css['goods-level-wrap']}>
                                    <div
                                        className={Css['classify-title'] + " " + Css['color' + (index + 1)]}>—— {item.title} ——
                                    </div>
                                    {index % 2 === 1 ?
                                        <div className={Css['goods-level1-wrap']}>
                                            {item.items != null ?
                                                item.items.slice(0, 2).map((item2, index2) => {
                                                    return (
                                                        <div key={index2} className={Css['goods-level1-item0']}
                                                             onClick={this.pushPage.bind(this, 'goods/details/item?gid=' + item2.gid)}>
                                                            <div className={Css['goods-title2']}>{item2.title}</div>
                                                            <div className={Css["goods-text2"]}>火爆开售</div>
                                                            <div className={Css['goods-img2']}><img
                                                                data-echo={item2.image}
                                                                src={require("../../../assets/images/common/lazyImg.jpg")}
                                                                alt={item2.title}/></div>
                                                        </div>
                                                    )
                                                })
                                                : ""}
                                        </div>
                                        : <div className={Css['goods-level1-wrap']}>
                                            <div className={Css['goods-level1-item0']}
                                                 onClick={this.pushPage.bind(this, 'goods/details/item?gid=' + (item.items[0].gid != null ? item.items[0].gid : ''))}>
                                                <div
                                                    className={Css['goods-title']}>{item.items != null ? item.items[0].title : ''}</div>
                                                <div className={Css["goods-text"]}>精品打折</div>
                                                <div
                                                    className={Css['goods-price' + (index + 1)]}>{item.items != null ? item.items[0].price : ''}元
                                                </div>
                                                <div className={Css['goods-img']}><img
                                                    data-echo={item.items != null ? item.items[0].image : ''}
                                                    src={require("../../../assets/images/common/lazyImg.jpg")}
                                                    alt={item.items != null ? item.items[0].title : ''}/></div>
                                            </div>
                                            <div className={Css['goods-level1-item1']}>
                                                {
                                                    item.items != null ?
                                                        item.items.slice(1, 3).map((item2, index2) => {
                                                            return (
                                                                <div key={index2} className={Css['goods-row']}
                                                                     onClick={this.pushPage.bind(this, 'goods/details/item?gid=' + item2.gid)}>
                                                                    <div
                                                                        className={Css['goods-row-title']}>{item2.title}</div>
                                                                    <div className={Css['goods-row-text']}>品质精挑
                                                                    </div>
                                                                    <div className={Css['goods-row-img']}><img
                                                                        src={require("../../../assets/images/common/lazyImg.jpg")}
                                                                        data-echo={item2.image} alt={item2.title}/>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                        : ''
                                                }
                                            </div>
                                        </div>
                                    }
                                    <div className={Css['goods-list-wrap']}>
                                        {
                                            item.items != null ?
                                                item.items.slice(index % 2 === 1 ? 2 : 3).map((item2, index2) => {
                                                    return (
                                                        <div key={index2} className={Css['goods-list']}
                                                             onClick={this.pushPage.bind(this, 'goods/details/item?gid=' + item2.gid)}>
                                                            <div className={Css['title']}>{item2.title}</div>
                                                            <div className={Css['image']}><img
                                                                src={require("../../../assets/images/common/lazyImg.jpg")}
                                                                data-echo={item2.image} alt={item2.title}/></div>
                                                            <div className={Css['price']}>¥{item2.price}</div>
                                                            <div className={Css['unprice']}>¥{item2.price * 2}</div>
                                                        </div>
                                                    )
                                                })
                                                : ''
                                        }
                                    </div>
                                </div>
                            )
                        })
                        : ""
                }
                {/*/!*为您推荐*!/*/}
                <div className={Css['reco-title-wrap']}>
                    <div className={Css["line"]}/>
                    <div className={Css['reco-text-wrap']}>
                        <div className={Css['reco-icon']}/>
                        <div className={Css['reco-text']}>为您推荐</div>
                    </div>
                    <div className={Css["line"]}/>
                </div>
                <div className={Css['reco-item-wrap']}>
                    {
                        this.state.aRecoGoods != null ?
                            this.state.aRecoGoods.map((item, index) => {
                                return (
                                    <div key={index} className={Css['reco-item']}
                                         onClick={this.pushPage.bind(this, 'goods/details/item?gid=' + item.gid)}>
                                        <div className={Css['image']}><img
                                            src={require("../../../assets/images/common/lazyImg.jpg")}
                                            alt={item.title}
                                            data-echo={item.image}/></div>
                                        <div className={Css['title']}>{item.title}</div>
                                        <div className={Css['price']}>¥{item.price}</div>
                                    </div>
                                )
                            })
                            : ''
                    }
                </div>
                {/*搜索*/}
                <SearchComponent pageStyle={this.state.pageStyle} childStyle={() => this.getStyle}/>
            </div>
        );
    }
}

export default connect(state => ({state}))(IndexComponent);
