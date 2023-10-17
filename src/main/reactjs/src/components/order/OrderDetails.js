import '../../resources/css/order/confirm.css'
import {useEffect, useRef, useState} from "react";
import axios from "axios";

function OrderDetails() {

    return (
        <div className="main-container order-confirm-back">
            <DetailsElement/>
        </div>
    )

}

function DetailsElement() {
    const [orderSeq, setOrderSeq] = useState(0);
    const [orderInfo, setOrderInfo] = useState(null);
    const [orderItems, setOrderItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [orderStatus, setOrderStatus] = useState('');

    const calculate = (_orderItems) => {
        let currentVal = 0;

        _orderItems.forEach(oi => {
            currentVal += oi.optionQuantity * (oi.optionUnitPrice + oi.shotQuantity * 1000);
        });

        setTotalPrice(currentVal);
    }

    const setCurrency = (price) => {
        return price.toLocaleString("ko-KR", {maximumFractionDigits: 0});
    }

    useEffect(() => {
        axios.get('/order/getDetails').then((response) => {
            setOrderSeq(response.data.orderSeq);
            setOrderInfo(response.data.orderInfo);
            setOrderItems(response.data.orderItems);
            calculate(response.data.orderItems);
            setOrderStatus(response.data.orderStatus);
        });
    }, [])


    return (
        <div className={"order-confirm order-confirm-result"}>
            {
                (orderInfo != null && orderItems != null) && <>
                    <div className="order-top">
                        <span>주문정보</span>
                    </div>
                    <div className="order-info">
                        <div className="order-info-id">
                            <span>주문번호</span>
                            <div>
                                <span>{orderSeq}</span>
                            </div>
                        </div>
                        <div className="order-info-id">
                            <span>주문자명</span>
                            <div>
                                <span>{orderInfo.orderName}</span>
                            </div>
                        </div>
                        <div className="order-info-products">
                            <span>주문상품</span>
                            <div className="products-list">
                                <div>
                                    <span>상품명</span>
                                    <span>옵션</span>
                                    <span>수량</span>
                                    <span>가격</span>
                                </div>
                                {
                                    orderItems.map(orderItem => {
                                        return <DetailsItem field={{orderItem: orderItem}}
                                                            method={{setCurrency: setCurrency}}></DetailsItem>
                                    })
                                }
                            </div>
                        </div>
                        <div className="order-info-id">
                            <span>메모</span>
                            <div>
                                <span>{orderInfo.orderMemo}</span>
                            </div>
                        </div>
                    </div>
                    <div className="order-bottom">
                        <span>주문상태</span>
                    </div>
                    <div className="order-status">
                        <div className={`order-state ${(orderStatus === 'received') && 'current'}`}>
                            <span>주문완료</span>
                            <span>주문이 접수되었습니다.</span>
                        </div>
                        <div>
                            <span>→</span>
                        </div>
                        <div className={`order-state ${(orderStatus === 'inProgress') && 'current'}`}>
                            <span>준비중</span>
                            <span>주문된 상품을 준비 중입니다.</span>
                        </div>
                        <div>
                            <span>→</span>
                        </div>
                        <div className={`order-state ${(orderStatus === 'finished') && 'current'}`}>
                            <span>픽업 가능</span>
                            <span>상품이 준비 완료되었습니다.</span>
                        </div>
                    </div>
                    <div>
                        <span>※ 주문과 관련된 직접적인 문의는 카카오톡 채널 또는 전화 문의 부탁드립니다.</span>
                    </div>
                </>
            }
        </div>
    )
}

function DetailsItem({field, method}) {
    const item = field.orderItem;
    return (
        <div>
            <span>{item.productName}</span>
            <div className={"item-details-option"}>
                <span>{item.optionName}</span>
                {(item.shotQuantity > 0) && <span>
                    샷 추가 (+{item.shotQuantity})
                </span>}
            </div>
            <span>{item.optionQuantity}</span>
            <span>{method.setCurrency(item.optionPrice)}</span>
        </div>
    );
}

export default OrderDetails;