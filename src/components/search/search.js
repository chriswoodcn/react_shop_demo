import React from 'react';
import {withRouter} from 'react-router';
import config from '../../assets/js/conf/config.js';
import {Modal, Toast} from 'antd-mobile';
import Css from './search.module.css';
import {connect} from "react-redux";
import action from '../../store/actions';
import {getHotKeywords} from "../../api";

class SearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bHistory: true,
            aHotKeywords: [],
            keywords: ""
        }
        this.aKeywords = props.state.hk.keywords;
    }

    componentDidMount() {
        if (this.props.state.hk.keywords.length > 0) {
            this.setState({bHistory: true})
        } else {
            this.setState({bHistory: false})
        }
        this.setHotKeywords();
    }

    setHotKeywords() {
        getHotKeywords().then(res => {
            if (res.code === 200) {
                this.setState({aHotKeywords: res.data})
            } else {
                this.setState({aHotKeywords: []})
            }
        })
    }

    clearHistory() {
        Modal.alert('', '确认要删除吗？', [
            {
                text: '取消', onPress: () => {
                }, style: 'default'
            },
            {
                text: '确认', onPress: () => {
                    this.setState({bHistory: false})
                    localStorage.removeItem("hk");
                    this.props.dispatch(action.hk.addHistoryKeywords({keywords: []}));
                    this.aKeywords = [];
                }
            }
        ]);
    }

    addHistoryKeywords() {
        let keywords = this.state.keywords || this.props.keywords;
        if (this.refs['keywords'].value !== "") {
            for (let i = 0; i < this.aKeywords.length; i++) {
                if (this.aKeywords[i] === keywords) {
                    this.aKeywords.splice(i--, 1);
                }
            }
            this.aKeywords.unshift(keywords);
            localStorage['hk'] = JSON.stringify(this.aKeywords);
            this.props.dispatch(action.hk.addHistoryKeywords({keywords: this.aKeywords}));
            this.setState({bHistory: true});
            this.goPage("home/goods/search?keywords=" + keywords, keywords)
        } else {
            Toast.info('请输入宝贝名称', 2);
        }
    }

    goPage(url, keywords) {
        if (this.props.isLocal === '1') {
            this.props.childKeywords(keywords);
        } else {
            this.props.history.push(config.path + url);
        }
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {
        return (
            <div style={this.props.pageStyle} className={Css['page']}>
                {/*头部搜索框*/}
                <div className={Css['search-header']}>
                    <div className={Css['close']} onClick={this.props.childStyle.bind(this, {display: "none"})}/>
                    <div className={Css['search-wrap']}>
                        <div className={Css['search-input-wrap']}>
                            <input type="text" className={Css['search']} placeholder="请输入宝贝名称"
                                   defaultValue={this.props.keywords} onChange={(e) => {
                                this.setState({keywords: e.target.value})
                            }} ref="keywords"/>
                        </div>
                        <button type="button" className={Css['search-btn']}
                                onClick={this.addHistoryKeywords.bind(this)}/>
                    </div>
                </div>
                {/*历史搜索*/}
                <div className={this.state.bHistory ? Css['search-main'] : Css['search-main'] + " hide"}>
                    <div className={Css['search-title-wrap']}>
                        <div className={Css['search-title']}>最近搜索</div>
                        <div className={Css['bin']} onClick={this.clearHistory.bind(this)}/>
                    </div>
                    <div className={Css['search-keywords-wrap']}>
                        {
                            this.props.state.hk.keywords != null ?
                                this.props.state.hk.keywords.map((item, index) => {
                                    return (
                                        <div key={index} className={Css['keywords']}
                                             onClick={this.goPage.bind(this, 'goods/search?keywords=' + item, item)}>{item}</div>
                                    )
                                })
                                : ''
                        }
                    </div>
                </div>
                {/*热门搜索*/}
                <div className={Css['search-main']}>
                    <div className={Css['search-title-wrap']}>
                        <div className={Css['search-title']}>热门搜索</div>
                    </div>
                    <div className={Css['search-keywords-wrap']}>
                        {
                            this.state.aHotKeywords != null ?
                                this.state.aHotKeywords.map((item, index) => {
                                    return (
                                        <div key={index} className={Css['keywords']}
                                             onClick={this.goPage.bind(this, 'goods/search?keywords=' + item.title, item.title)}>{item.title}</div>
                                    )
                                })
                                : ""
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => {
    return {state}
})(withRouter(SearchComponent));
