import {useEffect, useRef, useState} from "react";
import axios from "axios";
import '../resources/css/order.css'
import OrderConfirm from "./OrderConfirm";

function Order() {
    return (
        <div className={"main-container"}>
            <div className={"order-container"}>
                <OrderItems/>
                <OrderInfo/>
                <Payment/>
            </div>
        </div>
    )
}

function OrderItems() {
    const [orderItems, setOrderItems] = useState([]);
    const [totalAmounts, setTotalAmounts] = useState(0);

    useEffect(() => {
        axios.get('/cart/selectList').then((response) => {
            setOrderItems(response.data)
        });
    }, [])

    return (
        <div>
            <div className="order-top">
                <span>주문상품정보</span>
            </div>
            <div className={"order-list"}>
                <div className={"order-header"}>
                    <span>상품 정보</span>
                    <span>수량</span>
                    <span>소계</span>
                </div>
                {
                    orderItems.map(orderItem => {
                        return (
                            <OrderItem field={{orderItem: orderItem, totalAmounts: totalAmounts}}
                                       method={{setTotalAmounts: setTotalAmounts}}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

function OrderItem({field, method}) {
    const orderItem = field.orderItem;
    const totalAmounts = field.totalAmounts;
    const priceRef = useRef();

    useEffect(() => {
        method.setTotalAmounts(totalAmounts + priceRef.current.innerHTML)
    }, [])

    return (
        <div className={"order-item-figure"}>
            <div className={"order-item-info"}>
                <span>{orderItem.productName}</span>
                <span>{orderItem.optionName}</span>
                {
                    (orderItem.shotQuantity > 0) && <span>샷 추가(+{orderItem.shotQuantity})</span>
                }
            </div>
            <span>{orderItem.optionQuantity}</span>
            <span
                ref={priceRef}>{orderItem.optionQuantity * orderItem.optionUnitPrice + orderItem.shotQuantity * 1000}</span>
        </div>
    )
}

function OrderInfo() {
    const [orderActive, setOrderActive] = useState(false);

    const nameRef = useRef(null);
    const pwdRef = useRef(null);
    const pwdValidRef = useRef(null);
    const memoRef = useRef(null);

    const isSixDigits = (orderPwd) => {
        return !!orderPwd.match(/^\d{6}$/);
    }

    function checkPwd() {
        pwdValidRef.current.value = null;

        if (isSixDigits(pwdRef.current.value)) {
            pwdValidRef.current.disabled = false;
            pwdValidRef.current.focus();
        } else {
            pwdValidRef.current.disabled = true;
        }
    }

    function checkName(e) {
        if (nameRef.current.value.length > 10) {
            e.preventDefault();
            alert('10자 이하의 이름을 입력하세요.')
        }
    }

    function checkNaN(e) {
        if (isNaN(e.key) || pwdValidRef.current.value.length > 5) {
            e.preventDefault();
        }
    }

    function checkPwdValid() {
        if (pwdRef.current.value == pwdValidRef.current.value) {
            setOrderActive(true);
        } else {
            setOrderActive(false);
        }
    }

    function placeAnOrder() {
        if (pwdRef.current.value != pwdValidRef.current.value) {
            alert('비밀번호가 일치하지 않습니다.')
            return false;
        } else if (nameRef.current.value.trim() == '') {
            alert('주문자명을 올바르게 입력하세요.')
            return false;
        }

        let orderInfo = {
            orderName: nameRef.current.value,
            orderPassword: pwdRef.current.value,
            orderMemo: memoRef.current.value
        }

        axios.post('/order/place', orderInfo)
            .then(response => {
                if (response.data) {
                    window.location.href = "/order/selectPayment";
                } else {
                    alert("주문에 실패하였습니다.");
                }
            })
    }

    return (
        <div>
            <div className="order-top">
                <span>주문고객정보</span>
                <span>* 주문정보는 고객 식별, 구매 및 결제를 위해 사용됩니다.</span>
            </div>
            <div className="order-info">
                <div>
                    <span>주문자명</span><input type="text" name="orderName" ref={nameRef}
                                            onKeyPress={
                                                (e) => {
                                                    checkName(e.nativeEvent)
                                                }
                                            }
                                            placeholder="이름(10자 이하)"/>
                </div>
                <div>
                    <span>비밀번호</span><input type="password" name="orderPassword"
                                            ref={pwdRef}
                                            onChange={() => {
                                                checkPwd()
                                            }}
                                            onKeyPress={(e) => {
                                                checkNaN(e.nativeEvent)
                                            }}
                                            placeholder="비밀번호 숫자 6자리"/>
                </div>
                <div>
                    <span>비밀번호 확인</span><input type="password" name="orderPasswordConfirm"
                                               ref={pwdValidRef} disabled
                                               onChange={() => {
                                                   checkPwdValid()
                                               }}
                                               onKeyPress={(e) => {
                                                   checkNaN(e.nativeEvent)
                                               }}
                                               placeholder="비밀번호 숫자 6자리 확인"/>
                </div>
                <div>
                    <span>메모</span><textarea name="orderMemo" ref={memoRef} placeholder="요청사항 입력"/>
                </div>
            </div>
        </div>
    )
}

function Payment({field, method}) {
    return (
        <div className={"payment-container"}>
            <div className={"payment-top"}>
                <span>결제방식</span>
            </div>
            <div className={"payment-list"}>
                <input type={"button"} value={"카카오페이"}/>
                <input type={"button"} value={"현장결제"}/>
            </div>
            <input type={"button"} value={"결제하기"}/>
        </div>
    )
}

export default Order;