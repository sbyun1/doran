import {useEffect, useRef, useState} from "react";
import axios from "axios";
import '../resources/css/order.css'

function Order() {
    const [paymentType, setPaymentType] = useState(null);
    const [orderActive, setOrderActive] = useState(false);
    const [orderInfo, setOrderInfo] = useState(null);

    useEffect(() => {
        const initialInfo = {
            orderName: '',
            orderPassword: '',
            orderMemo: ''
        }

        setOrderInfo(initialInfo);
    }, []);

    function placeAnOrder() {
        if (paymentType != null && orderActive) {
            const data = {
                orderInfo: orderInfo,
                paymentType: paymentType
            }
            axios.post('/order/place', data, {"Content-Type": 'application/json'}).then(
                response => {
                    if (response.data) {
                        window.location.href = '/order/confirm';
                    }
                }
            )
        } else {
            alert('[필수 입력 사항] 및 [결제 방식]을 확인하신 후 다시 시도하세요.');
        }
    }

    function checkOrder() {
        axios.get('/order/check').then(response => {
            const data = response.data;
            if (data.orderState) {
                alert('주문이 완료되었습니다.');
            }
        });
    }

    return (
        <div className={"main-container"}>
            <div className={"order-container"}>
                <OrderItems/>
                <OrderInfo field={{orderInfo: orderInfo, orderActive: orderActive}}
                           method={{setOrderInfo: setOrderInfo, setOrderActive: setOrderActive}}/>
                <Payment field={{paymentType: paymentType}} method={{setPaymentType: setPaymentType}}/>
                <div className={"cart-confirm"}>
                    <input type={"button"} value={"장바구니"} onClick={
                        () => {
                            window.history.back();
                        }
                    }/>
                    <input type={"button"} value={"결제하기"} onClick={
                        () => {
                            placeAnOrder();
                        }
                    }/>
                </div>
            </div>
        </div>
    )
}

function OrderItems() {
    const [orderItems, setOrderItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const setCurrency = (price) => {
        return price.toLocaleString("ko-KR", {maximumFractionDigits: 0});
    }

    const calculate = (_orderItems) => {
        let currentVal = 0;

        _orderItems.forEach(oi => {
            currentVal += oi.optionQuantity * oi.optionUnitPrice + oi.shotQuantity * 1000;
        });

        setTotalPrice(currentVal);
    }

    useEffect(() => {
        axios.get('/cart/selectList').then((response) => {
            setOrderItems(response.data);
            calculate(response.data);
        });
    }, [])

    return (
        <div>
            <div className="order-top">
                <span>주문상품 정보</span>
            </div>
            <div className={"order-list item-table"}>
                <div className={"order-header item-table-header"}>
                    <span>상품 정보</span>
                    <span>수량</span>
                    <span>소계</span>
                </div>
                {
                    orderItems.map(orderItem => {
                        return (
                            <OrderItem key={orderItem.orderItemId}
                                       data-key={orderItem.orderItemId}
                                       field={{orderItem: orderItem}}
                                       method={{setCurrency: setCurrency}}/>
                        )
                    })
                }
                <div className={"order-total item-table-footer"}>
                    <span>총 결제 금액</span>
                    <span>{setCurrency(totalPrice)}원</span>
                </div>
            </div>
        </div>
    )
}

function OrderItem({field, method}) {
    const orderItem = field.orderItem;
    const orderPrice = orderItem.optionQuantity * orderItem.optionUnitPrice + orderItem.shotQuantity * 1000;

    return (
        <div className={"order-item-figure"}>
            <div className={"order-item-info"}>
                <span>{orderItem.productName}</span>
                <div className={"order-item-option"}>
                    <div>
                        <span className={"item-option-label"}>옵션</span>
                        <span>{orderItem.optionName}</span>
                    </div>
                    {
                        (orderItem.shotQuantity > 0) &&
                        <div>
                            <span className={"item-option-label"}>추가</span>
                            <span>샷 추가(+{orderItem.shotQuantity})</span>
                        </div>
                    }
                </div>
            </div>
            <span>{orderItem.optionQuantity}</span>
            <span>{method.setCurrency(orderPrice)}</span>
        </div>
    )
}

function OrderInfo({field, method}) {
    const orderActive = field.orderActive;
    const orderInfo = field.orderInfo;

    const nameRef = useRef(null);
    const pwdRef = useRef(null);
    const pwdValidRef = useRef(null);

    const pwdValidDescRef = useRef(null);

    const isSixDigits = (orderPwd) => {
        return !!orderPwd.match(/^\d{6}$/);
    }

    function setProperty(currentValue, propertyName) {
        let currentInfo = orderInfo;
        if (propertyName == 'orderName') {
            currentInfo.orderName = currentValue.trim();
        } else if (propertyName == 'orderPassword') {
            currentInfo.orderPassword = currentValue.trim();
        } else if (propertyName == 'orderMemo') {
            currentInfo.orderMemo = currentValue.trim();
        }
        method.setOrderInfo(currentInfo);
    }

    function checkName() {
        const currentName = nameRef.current.value;
        if (currentName.length > 10) {
            nameRef.current.value = currentName.substring(0, 10);
            alert('10자 이하의 문자를 입력하세요.');
        } else {
            setProperty(currentName, 'orderName');
        }
    }

    function checkPwd() {
        pwdValidRef.current.value = null;
        pwdValidDescRef.current.classList.add('hidden');

        if (isSixDigits(pwdRef.current.value)) {
            pwdValidRef.current.disabled = false;
            pwdValidRef.current.focus();
        } else {
            pwdValidRef.current.disabled = true;
        }
    }

    function checkNaN(e) {
        if (isNaN(e.key) || e.target.value.length > 5) {
            e.preventDefault();
        }
    }

    function checkNull(e) {
        if (e.keyCode == 32) {
            e.preventDefault();
        }
    }

    function checkOrderValid() {
        const currentPassword = pwdRef.current.value;
        const currentName = nameRef.current.value.trim();

        if (currentName != '' && currentPassword.length == 6) {
            method.setOrderActive(true);
        } else {
            method.setOrderActive(false);
        }
    }

    function checkPwdValid() {
        const currentPassword = pwdRef.current.value;
        const currentPasswordValid = pwdValidRef.current.value;


        if (currentPassword == currentPasswordValid) {
            setProperty(currentPassword, 'orderPassword');
            pwdValidDescRef.current.classList.add('valid');
            pwdValidDescRef.current.innerHTML = '* 비밀번호가 일치합니다.';

        } else {
            method.setOrderActive(false);
            pwdValidDescRef.current.classList.remove('valid');
            pwdValidDescRef.current.classList.remove('hidden');
            pwdValidDescRef.current.innerHTML = '* 비밀번호가 일치하지 않습니다.';
        }
    }

    return (
        <div className={"order-customer-container"}>
            <div className="order-top">
                <span>주문고객 정보</span>
                <span>고객 식별, 구매 및 결제를 위해 사용됩니다.</span>
            </div>
            <div className="order-customer item-table">
                <div>
                    <span>주문자명 *</span><input type="text" name="orderName"
                                              ref={nameRef}
                                              onChange={() => {
                                                  checkName()
                                                  checkOrderValid()
                                              }}
                                              onKeyPress={(e) => {
                                                  checkNull(e.nativeEvent)
                                              }}
                                              placeholder="이름(10자 이하)"/>
                </div>
                <div>
                    <span>비밀번호 *</span><input type="password" name="orderPassword"
                                              ref={pwdRef}
                                              onChange={() => {
                                                  checkPwd()
                                              }}
                                              onKeyPress={(e) => {
                                                  checkNaN(e.nativeEvent)
                                                  checkNull(e.nativeEvent)
                                              }}
                                              placeholder="비밀번호 숫자 6자리"/>
                    <span></span>
                </div>
                <div>
                    <span>비밀번호 확인 *</span><input type="password" name="orderPasswordConfirm"
                                                 ref={pwdValidRef} disabled
                                                 onChange={() => {
                                                     checkPwdValid()
                                                     checkOrderValid()
                                                 }}
                                                 onKeyPress={(e) => {
                                                     checkNaN(e.nativeEvent)
                                                     checkNull(e.nativeEvent)
                                                 }}
                                                 placeholder="비밀번호 숫자 6자리 확인"/>
                    <span ref={pwdValidDescRef} className={"order-validation hidden"}></span>
                </div>
                <div>
                    <span>메모</span><textarea name="orderMemo"
                                             onChange={(event) => {
                                                 setProperty(event.currentTarget.value, 'orderMemo');
                                             }}
                                             placeholder="요청사항 입력"/>
                </div>
            </div>
            <span className={"order-info-desc"}>'*' 표시된 부분은 필수 입력 사항입니다.</span>
        </div>
    )
}

function Payment({field, method}) {
    const paymentType = field.paymentType;
    const checkRef = [useRef(null), useRef(null)];

    const selectPaymentType = (event) => {
        const target = event.target;

        checkRef.forEach(checkbox => {
            if (checkbox.current.value == target.value) {
                if (checkbox.current.checked)
                    method.setPaymentType(checkbox.current.value);
                else {
                    method.setPaymentType(null);
                }
            } else {
                checkbox.current.checked = false;
            }
        })
    }

    return (
        <div className={"payment-container"}>
            <div className={"payment-top"}>
                <span>결제방식</span>
            </div>
            <div className={"payment-list item-table"}>
                <div className={"payment-type simple"}>
                    <span>간편결제</span>
                    <div>
                        <label>
                            <input className={"payment-checkbox"}
                                   ref={checkRef[0]} type={"checkbox"}
                                   name={"paymentType"}
                                   onClick={(event) => {
                                       selectPaymentType(event);
                                   }}
                                   value={"kakaoPay"}/>
                            카카오 페이
                        </label>
                    </div>
                </div>
                <div className={"payment-type normal"}>
                    <span>일반결제</span>
                    <div>
                        <label>
                            <input className={"payment-checkbox"}
                                   ref={checkRef[1]} type={"checkbox"}
                                   name={"paymentType"}
                                   onClick={(event) => {
                                       selectPaymentType(event);
                                   }}
                                   value={"onSite"}/>
                            현장 결제
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order;