import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux'
import Css from '../../../assets/css/home/home/index.css';
import config from '../../../assets/js/conf/config.js';

import asyncComponents from '../../../components/async/AsyncComponent';

const IndexComponent = asyncComponents(() => import('../index/index'));
const CartIndex = asyncComponents(() => import('../cart/index'));
const GoodsClassify = asyncComponents(() => import('../goods/classify'));
const UserIndex = asyncComponents(() => import('../../user/center/index'));

class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectHome: true,
            selectCart: false,
            selectGoods: false,
            selectUser: false
        }
    }

    componentDidMount() {
        this.handleNavStyle(this.props)
    }

    handleNavStyle(props) {
        switch (props.location.pathname) {
            case config.path + "home/index":
                this.setState({
                    selectHome: true,
                    selectCart: false,
                    selectGoods: false,
                    selectUser: false
                });
                break;
            case config.path + "home/cart":
                this.setState({
                    selectHome: false,
                    selectCart: true,
                    selectGoods: false,
                    selectUser: false
                });
                break;
            case config.path + "goods/classify":
                this.setState({
                    selectHome: false,
                    selectCart: false,
                    selectGoods: true,
                    selectUser: false
                });
                break;
            case config.path + "home/my":
                this.setState({
                    selectHome: false,
                    selectCart: false,
                    selectGoods: false,
                    selectUser: true
                });
                break;
            default:
                break;
        }
    }

    goPage(pUrl) {
        this.props.history.push(config.path + pUrl);
    }

    render() {
        console.log(Css)
        return (
            <div>
                <React.Fragment>
                    <Switch>
                        <Route path={config.path + "home/index"} component={IndexComponent}/>
                        <Route path={config.path + "home/classify"} component={GoodsClassify}/>
                        <Route path={config.path + "home/cart"} component={CartIndex}/>
                        <Route path={config.path + "home/my"} component={UserIndex}/>
                    </Switch>
                </React.Fragment>
                <div className={Css['bottom-nav']}>
                    <ul onClick={this.goPage.bind(this, 'home/index')}>
                        <li className={this.state.selectHome ? Css['home'] + " " + Css['active'] : Css['home']}/>
                        <li className={this.state.selectHome ? Css['text'] + " " + Css['active'] : Css['text']}>首页</li>
                    </ul>
                    <ul onClick={this.goPage.bind(this, 'home/classify')}>
                        <li className={this.state.selectHome ? Css['classify'] + " " + Css['active'] : Css['classify']}/>
                        <li className={this.state.selectHome ? Css['text'] + " " + Css['active'] : Css['text']}>分类</li>
                    </ul>
                    <ul onClick={this.goPage.bind(this, 'home/cart')}>
                        <li className={this.state.selectCart ? Css['cart'] + " " + Css['active'] : Css['cart']}/>
                        <li className={this.state.selectCart ? Css['text'] + " " + Css['active'] : Css['text']}>购物车</li>
                        {/*<li className={this.props.state.cart.aCartData.length > 0 ? Css['spot'] : Css['spot'] + " hide"}></li>*/}
                    </ul>
                    <ul onClick={this.goPage.bind(this, 'home/my')}>
                        <li className={this.state.selectUser ? Css['my'] + " " + Css['active'] : Css['my']}/>
                        <li className={this.state.selectUser ? Css['text'] + " " + Css['active'] : Css['text']}>我的</li>
                    </ul>
                </div>
            </div>
        )
    }
}

// export default connect(state => ({state}))(HomeComponent);
export default HomeComponent;
