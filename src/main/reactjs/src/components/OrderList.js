import '../resources/css/orderList.css'
import {Component, memo, useEffect, useRef, useState} from "react";



function OrderList(){

        return (
            <fragment>
                <h1>주문내역</h1>
                <div className="items">
                    <section id = "orderSum">
                        <h3>진행 중인 주문</h3>
                        <hr></hr>
                        <div className="orderSum">
                            <ul>
                                <li>
                                    <b>새로운 주문</b>
                                    <strong>1</strong>
                                </li>
                                <li>
                                    <b className="tag">조리중</b>
                                    <strong>3</strong>
                                </li>
                                <li>
                                    <b>준비완료</b>
                                    <strong>0</strong>
                                </li>
                                <li>
                                    <b>픽업완료</b>
                                    <strong>0</strong>
                                </li>
                                <li>
                                    <b>취소</b>
                                    <strong>0</strong>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section id = "orderLists">
                        <div className="info">
                            <h3>최근 주문 정보</h3>
                            <div className="searchBox">
                                <div className="search"><input type="search" id="searchInpt"/></div>
                                <div className="search"><input type="button" id="searchBtn" value="검색"/></div>
                            </div>
                            <div className="orderDetail head">
                                <div className="orderNo">주문번호</div>
                                <div className="orderDate">주문일자</div>
                                <div className="totalPrice">결제금액</div>
                                <div className="payment">결제상태</div>
                                <div className="status">주문상태</div>
                            </div>
                            <div className="orderDetail">
                                <div className="orderNo">
                                    <a href="orderDetail.html">#12abcdd123</a>
                                </div>
                                <div className="orderDate">2023.03.09</div>
                                <div className="totalPrice">40,000원</div>
                                <div className="payment">결제완료</div>
                                <div className="status">
                                    <select className="status">
                                        <option value="new" selected disabled>접수중</option>

                                        <option value="prep">조리중</option>
                                        <option value="pickedUp">픽업완료</option>
                                        <option value="cancel">주문취소</option>
                                    </select>
                                </div>
                            </div>
                            <div className="orderDetail">
                                <div className="orderNo">
                                    <a href="#">#12abcdd124</a>
                                </div>
                                <div className="orderDate">2023.03.09</div>
                                <div className="totalPrice">100,000원</div>
                                <div className="payment onSite">현장결제</div>
                                <div className="status">
                                    <select className="status" name="ss">
                                        <option value="new" disabled>접수중</option>
                                        <option value="prep" selected>조리중</option>
                                        <option value="pickedUp">픽업완료</option>
                                        <option value="cancel">주문취소</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </fragment>
        )
}

export default OrderList;