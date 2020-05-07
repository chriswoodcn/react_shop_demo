import React, {Component} from 'react'
import {Route} from 'react-router-dom';
import {connect} from 'react-redux'
import Css from '../../../assets/css/home/home/index.module.css';
import config from '../../../assets/js/conf/config.js';
import CacheRoute, {CacheSwitch} from 'react-router-cache-route'
import asyncComponents from '../../../components/async/AsyncComponent';

const IndexComponent = asyncComponents(() => import('../index/index'));
const CartIndex = asyncComponents(() => import('../cart/index'));
const GoodsClassify = asyncComponents(() => import('../goods/classify'));
const UserIndex = asyncComponents(() => import('../../user/center/index'));

class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectHome: false,
            selectCart: false,
            selectGoods: false,
            selectUser: false,
        }
    }

    componentDidMount() {
        this.handleNavStyle(this.props)
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        this.handleNavStyle(nextProps)
    }

    handleNavStyle(props) {
        let path = props.location.pathname
        if (path.startsWith(config.path + "home/index")) {
            this.setState({
                selectHome: true,
                selectCart: false,
                selectGoods: false,
                selectUser: false
            });
        }
        if (path.startsWith(config.path + "home/cart")) {
            this.setState({
                selectHome: false,
                selectCart: true,
                selectGoods: false,
                selectUser: false
            });
        }
        if (path.startsWith(config.path + "home/goods/classify")) {
            this.setState({
                selectHome: false,
                selectCart: false,
                selectGoods: true,
                selectUser: false
            });
        }
        if (path.startsWith(config.path + "home/my")) {
            this.setState({
                selectHome: false,
                selectCart: false,
                selectGoods: false,
                selectUser: true
            });
        }
    }


    goPage(url) {
        this.props.history.push(config.path + url);
    }

    render() {
        return (
            <div>
                <React.Fragment>
                    <CacheSwitch>
                        <CacheRoute path={config.path + "home/index"} component={IndexComponent}
                                    saveScrollPosition={true}/>
                        <Route path={config.path + "home/goods/classify"} component={GoodsClassify}/>
                        <Route path={config.path + "home/cart"} component={CartIndex}/>
                        <Route path={config.path + "home/my"} component={UserIndex}/>
                    </CacheSwitch>
                </React.Fragment>
                <div className={Css['bottom-nav']}>
                    <ul onClick={this.goPage.bind(this, 'home/index')}>
                        <li className={this.state.selectHome ? Css['home'] + " " + Css['active'] + ' iconfont icon-shouye' : Css['home'] + ' iconfont icon-shouye'}/>
                        <li className={this.state.selectHome ? Css['text'] + " " + Css['active'] : Css['text']}>首页</li>
                    </ul>
                    <ul onClick={this.goPage.bind(this, 'home/goods/classify')}>
                        <li className={this.state.selectGoods ? Css['home'] + " " + Css['active'] + ' iconfont icon-fenlei' : Css['home'] + ' iconfont icon-fenlei'}/>
                        <li className={this.state.selectGoods ? Css['text'] + " " + Css['active'] : Css['text']}>分类</li>
                    </ul>
                    <ul onClick={this.goPage.bind(this, 'home/cart')}>
                        <li className={this.state.selectCart ? Css['home'] + " " + Css['active'] + ' iconfont icon-gouwuche' : Css['home'] + ' iconfont icon-gouwuche'}/>
                        <li className={this.state.selectCart ? Css['text'] + " " + Css['active'] : Css['text']}>购物</li>
                        {/*<li className={this.props.state.cart.aCartData.length > 0 ? Css['spot'] : Css['spot'] + " hide"}></li>*/}
                    </ul>
                    <ul onClick={this.goPage.bind(this, 'home/my')}>
                        <li className={this.state.selectUser ? Css['home'] + " " + Css['active'] + ' iconfont icon-wode' : Css['home'] + ' iconfont icon-wode'}/>
                        <li className={this.state.selectUser ? Css['text'] + " " + Css['active'] : Css['text']}>我的</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default connect(state => ({state}))(HomeComponent);
