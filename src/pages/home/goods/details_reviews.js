import React from 'react';
import {getReviews, getReviewsScrollPage} from "../../../api";
import {lazyImg, localParam} from '../../../assets/js/utils/util.js';
import Css from '../../../assets/css/home/goods/details_reviews.module.css';
import UpRefresh from "../../../assets/js/libs/uprefresh";

export default class DetailsReviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aReviews: [],
            iReviewTotal: 0,
            gid: props.location.search !== '' ? localParam(props.location.search).search.gid : ''
        }
        this.oUpRefresh = null;
        this.curPage = 1;
        this.maxPage = 0;
        this.offsetBottom = 100;
    }

    componentDidMount() {
        this.setReviews();
    }

    setReviews() {
        getReviews(this.state.gid).then((res) => {
            if (res.code === 200) {
                this.setState({aReviews: res.data, iReviewTotal: res.pageinfo.total}, () => {
                    lazyImg();
                });
                this.maxPage = res.pageinfo.pagenum;
                this.setScrollPage();
            } else {
                this.setState({aReviews: []})
            }
        });
    }

    setScrollPage() {
        this.oUpRefresh = new UpRefresh({
            "curPage": this.curPage,
            "maxPage": this.maxPage,
            "offsetBottom": this.offsetBottom
        }, curPage => {
            getReviewsScrollPage(this.state.gid, curPage).then((res) => {
                if (res.code === 200) {
                    if (res.data.length > 0) {
                        let aReviews = this.state.aReviews;
                        for (let i = 0; i < res.data.length; i++) {
                            aReviews.push(res.data[i]);
                        }
                        this.setState({aReviews: aReviews}, () => {
                            lazyImg();
                        });
                    }
                }
            });
        });
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {
        return (
            <div className={Css['page']}>
                <div className={Css['reviews-main']}>
                    <div className={Css["reviews-title"]}>商品评价（{this.state.iReviewTotal}）</div>
                    <div className={Css['reviews-wrap']}>
                        {
                            this.state.aReviews.length > 0 ?
                                this.state.aReviews.map((item, index) => {
                                    return (
                                        <div className={Css['reviews-list']} key={index}>
                                            <div className={Css['uinfo']}>
                                                <div className={Css['head']}><img alt={item.nickname}
                                                                                  data-echo={item.head}
                                                                                  src={require("../../../assets/images/common/lazyImg.jpg")}/>
                                                </div>
                                                <div className={Css['nickname']}>{item.nickname}</div>
                                            </div>
                                            <div className={Css['reviews-content']}>{item.content}</div>
                                            <div className={Css['reviews-date']}>{item.times}</div>
                                        </div>
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
