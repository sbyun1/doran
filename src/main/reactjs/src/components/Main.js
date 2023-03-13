import {Component, useEffect} from "react";
import '../resources/css/main.css';
import  '../resources/js/main.js';

class Main extends Component {
    render() {
        return (
            <div className="main-container">
                <div className="product-category">
                    <span className="option-selected">전체</span>
                    <span>커피</span>
                    <span>라떼</span>
                    <span>차 & 에이드</span>
                    <span>주스 & 스무디</span>
                    <span>스낵 & 수제디저트</span>
                </div>
                <div className="product-search">
                    <input type="text" name="keyword"/>
                    <input type="button" value="검색"/>
                </div>
                <div className="product-list">
                    <div className="product-figure">
                        <div className="item-info">
                            <input type="hidden" id="item-id" value="1"/>
                            <span>커피</span>
                            <span className="item-name">아메리카노</span>
                            <div className="item-options">
                                <div>
                                    <span>레귤러 (2샷)</span>
                                    <span>3,500</span>
                                    <button>+ Cart</button>
                                </div>
                                <div>
                                    <span>숏 (1샷)</span>
                                    <span>3,000</span>
                                    <button>+ Cart</button>
                                </div>
                            </div>
                        </div>
                        <div className="item-details">
                            <span>아메리카노</span>
                            <span>유럽식 커피에 비해 옅은 농도인 미국식 커피 스타일</span>
                            <span>원산지: OOO</span>
                            <span className="close"></span>
                        </div>
                    </div>
                    <div className="product-figure">
                        <div className="item-info">
                            <input type="hidden" id="item-id" value="2"/>
                            <span>라떼</span>
                            <span>꿀딸기우유</span>
                            <div className="item-options">
                                <div>
                                    <span>Bottle (500ml)</span>
                                    <span>8,500</span>
                                    <button>+ Cart</button>
                                </div>
                                <div>
                                    <span>Cup</span>
                                    <span>6,500</span>
                                    <button>+ Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="product-figure">
                        <div className="item-info">
                            <input type="hidden" id="item-id" value="3"/>
                            <span>차 & 에이드</span>
                            <span>베리머치 (트리플베리)</span>
                            <div className="item-options">
                                <div>
                                    <span>차</span>
                                    <span>5,500</span>
                                    <button>+ Cart</button>
                                </div>
                                <div>
                                    <span>에이드</span>
                                    <span>6,000</span>
                                    <button>+ Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="product-figure">
                        <div className="item-info">
                            <input type="hidden" id="item-id" value="4"/>
                            <span>주스 & 스무디</span>
                            <span>계절 생과일 주스</span>
                            <div className="item-options single">
                                <div>
                                    <span></span>
                                    <span>6,500</span>
                                    <button>+ Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="product-figure">
                        <div className="item-info">
                            <input type="hidden" id="item-id" value="5"/>
                            <span>스낵 & 수제디저트</span>
                            <span>사과 토스트(딸기잼+피넛버터+사과)</span>
                            <div className="item-options">
                                <div>
                                    <span>단품</span>
                                    <span>5,000</span>
                                    <button>+ Cart</button>
                                </div>
                                <div>
                                    <span>세트</span>
                                    <span>8,000</span>
                                    <button>+ Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Main