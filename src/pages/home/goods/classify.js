import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import asyncComponents from '../../../components/async/AsyncComponent';
import config from '../../../assets/js/conf/config.js';
import IScroll from '../../../assets/js/libs/iscroll.js';
import Css from '../../../assets/css/home/goods/classify.module.css';
import {localParam, isSystem, setScrollTop} from "../../../assets/js/utils/util";
import {getClassifyData} from "../../../api";
import SearchComponent from '../../../components/search/search';

const GoodsItems = asyncComponents(() => import('./items'));
export default class GoodsClassify extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aClassify: [],
            pageStyle: {display: "none"}
        };
        this.myScroll = null;
        this.aTempClassify = [];
        this.cid = props.location.search ? localParam(props.location.search).search.cid : '492';
        this.scrollRef = React.createRef()
    }

    componentDidMount() {
        setScrollTop()
        this.setClassifyData();
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    replacePage(pUrl) {
        this.props.history.replace(config.path + pUrl);
    }

    goBack() {
        this.props.history.go(-1);
    }

    eventScroll() {
        let scrollClassify = this.scrollRef.current;
        scrollClassify.addEventListener('touchmove', function (e) {
            e.preventDefault();
        }, false);
        this.myScroll = new IScroll(scrollClassify, {
            scrollX: false,
            scrollY: true,
            preventDefault: false
        });
    }

    setClassifyData() {
        getClassifyData().then(res => {
            if (res.code === 200) {
                this.aTempClassify = res.data;
                // 左侧菜单数据添加bActive属性
                for (let i = 0; i < this.aTempClassify.length; i++) {
                    this.aTempClassify[i].bActive = false;
                }
                this.setState({aClassify: this.aTempClassify}, () => {
                    // 异步
                    this.eventScroll();
                    this.defaultClassifyStyle();
                })
            }
        });
    }

    changeStyle(url, index) {
        if (this.aTempClassify.length > 0) {
            for (let i = 0; i < this.aTempClassify.length; i++) {
                this.aTempClassify[i].bActive = false;
            }
        }
        this.aTempClassify[index].bActive = true;
        this.handleScroll(index);
        this.replacePage(url);
    }

    handleScroll(index) {
        let oScrollClassify = this.scrollRef.current
        // 单位高度
        let unitHeight = this.refs['item-0'].offsetHeight
        // 距顶高度(留3个item)
        let topHeight = Math.round(unitHeight * (index - 3));
        // 总高度1/3
        let halfHeight = Math.round(oScrollClassify.offsetHeight / 4);
        // 距底高度
        let bottomHeight = oScrollClassify.scrollHeight - topHeight;
        // 如果距顶高度超过了1/3并且距底高度超过盒子的显示高度,则滚动到顶部
        if (topHeight > halfHeight && bottomHeight > oScrollClassify.offsetHeight) {
            this.myScroll.scrollTo(0, -topHeight, 1000, IScroll.utils.ease.circular);
        }
        // 如果距底高度小于盒子的显示高度,则滚动到底部
        if (bottomHeight < oScrollClassify.offsetHeight) {
            this.myScroll.scrollTo(0, -(oScrollClassify.scrollHeight - oScrollClassify.offsetHeight), 1000, IScroll.utils.ease.circular)
        }
    }

    defaultClassifyStyle() {
        if (this.aTempClassify.length > 0) {
            for (let i = 0; i < this.aTempClassify.length; i++) {
                if (this.aTempClassify[i].cid === this.cid) {
                    this.aTempClassify[i].bActive = true;
                    break;
                }
            }
            this.setState({aClassify: this.aTempClassify});
        }
    }

    getStyle(val) {
        this.setState({pageStyle: val})
    }

    changeSearch() {
        this.setState({pageStyle: {display: "block"}})
    }


    render() {
        return (
            <div>
                <div className={Css['search-header']}>
                    <div className={Css['back']} onClick={() => this.goBack()}/>
                    <div className={Css['search']} onClick={() => this.changeSearch()}>请输入宝贝名称</div>
                </div>
                <div className={Css['goods-main']}>
                    <div ref={this.scrollRef} className={Css['classify-wrap']}>
                        <div>
                            {
                                this.state.aClassify != null ?
                                    this.state.aClassify.map((item, index) => {
                                        return (
                                            <div ref={"item-" + index}
                                                 className={item.bActive ? Css['classify-item'] + " " + Css['active'] : Css['classify-item']}
                                                 key={index}
                                                 onClick={this.changeStyle.bind(this, 'home/goods/classify/items?cid=' + item.cid + '', index)}>{item.title}</div>
                                        )
                                    })
                                    : ""
                            }
                            {
                                isSystem() === 1 ? <div style={{width: '100%', height: '1.5rem'}}/> :
                                    <div style={{width: '100%', height: '0.8rem'}}/>
                            }
                        </div>
                    </div>
                    <div className={Css['goods-content']}>
                        <Switch>
                            <Route path={config.path + "home/goods/classify/items"} component={GoodsItems}/>
                            <Redirect to={config.path + "home/goods/classify/items?cid=" + this.cid}
                                      component={GoodsItems}/>
                        </Switch>
                    </div>
                </div>
                <SearchComponent pageStyle={this.state.pageStyle}
                                 childStyle={this.getStyle.bind(this)}/>
            </div>
        );
    }
}
