import {useEffect, useState} from "react";
import axios from "axios";
import '../../resources/css/order/complete.css'

function OrderComplete() {
    const [orderId, setOrderId] = useState();
    const [certState, setCertState] = useState();

    useEffect(() => {
        axios.get('/order/check').then(response => {
            const orderStatus = response.data;
            if (orderStatus) {
                console.log('주문 완료');
            }
        });
    }, []);

    return (
        <div className="main-container">
            <div className={"order-container"}>
                <OrderTop/>
                <OrderBottom/>
            </div>
        </div>
    )
}

function OrderTop() {
    return (
        <div className={"order-complete-top"}>
            <span>주문이 완료되었습니다.</span>
            <div>
                <span>주문번호</span>
                <span>001</span>
            </div>
            <span>현장 결제의 경우 연락처 미인증 시 주문이 취소되는 점 유의 바랍니다.</span>
        </div>
    )
}

function OrderBottom() {
    return (
        <div className={"order-complete-bottom"}>
            <span>추가 정보 입력</span>
            <span>연락처 인증 시 카카오톡 알림톡으로 주문 처리 상태를 알려드립니다.</span>
            <div>

            </div>
        </div>
    )
}

export default OrderComplete;