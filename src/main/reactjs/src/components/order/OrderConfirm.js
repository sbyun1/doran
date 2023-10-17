import '../../resources/css/order/confirm.css'
import {useEffect, useRef, useState} from "react";
import axios from "axios";

function OrderConfirm() {
    const [auth, setAuth] = useState(false);

    return (
        <div className="main-container order-confirm-back">
            {
                !auth && <Before field={{auth: auth}}
                                 method={{setAuth: setAuth}}/>
            }
            {
                auth && <After field={{auth: auth}}/>
            }

        </div>
    )
}

function Before({field, method}) {
    const dateRef = useRef(null);
    const seqRef = useRef(null);
    const nameRef = useRef(null);
    const pwdRef = useRef(null);
    const confirmRef = useRef(null);

    const ordSeq = field.ordSeq;

    const isSixDigits = (orderPwd) => {
        return !!orderPwd.match(/^\d{6}$/);
    }

    function checkPwd() {
        if (isSixDigits(pwdRef.current.value)) {
            confirmRef.current.disabled = false;
        } else {
            confirmRef.current.disabled = true;
        }
    }

    function checkNaN(e) {
        if (isNaN(e.key) || e.target.value.length > 5) {
            e.preventDefault();
        }
    }

    function checkForm({field, method}) {
        const auth = field.auth;

        const orderDate = dateRef.current.value.trim();
        const orderName = nameRef.current.value.trim();
        const orderSeq = seqRef.current.value.trim();
        const orderPwd = pwdRef.current.value.trim();

        if (orderName === '' || orderSeq === '' || orderPwd === '') {
            return false;
        } else {
            const orderInfo = {
                orderName: orderName,
                orderPassword: orderPwd
            }
            const data = {
                orderInfo: orderInfo,
                orderSeq: orderSeq,
                orderDate: orderDate
            }

            axios.post("/order/checkAuth", data).then(response => {
                if (response.data) {
                    alert("조회에 성공하였습니다.");
                    method.setAuth(true);
                    method.setOrdSeq(orderSeq);

                } else {
                    alert("조회에 실패하였습니다.");
                    method.setAuth(false);
                }
            })
        }
    }

    useEffect(() => {
        dateRef.current.value = new Date().toISOString().split("T")[0];
    }, []);

    return (
        <div className={"order-confirm"}>
            <div className={"order-top"}>
                <span>주문 조회</span>
                <span>CAFE DORAN</span>
            </div>
            <div className={"order-check"}>
                <div>
                    <span>주문날짜</span>
                    <input name={"orderDate"} type={"date"} ref={dateRef} max={new Date().toISOString().split("T")[0]}/>
                </div>
                <div>
                    <span>주문번호</span>
                    <input name={"orderSeq"} inputMode={"numeric"}
                           ref={seqRef} onKeyPress={event => {
                        checkNaN(event.nativeEvent)
                    }}/>
                </div>
                <div>
                    <span>주문자명</span>
                    <input name={"orderName"}
                           ref={nameRef}/>
                </div>
                <div>
                    <span>비밀번호</span>
                    <input name={"orderPassword"} type={"password"}
                           ref={pwdRef}
                           onChange={() => {
                               checkPwd()
                           }}
                           onKeyPress={event => {
                               checkNaN(event.nativeEvent)
                           }}
                           inputMode={"numeric"}/>
                </div>
                <span className={"order-check-desc"}>
            * 주문 정보 오 입력 시 주문 상태 확인 및 취소가 어려울 수 있으니
            다시 한번 확인해 주시기 바랍니다.
            </span>
                <input className={"style-button-confirm"} type={"button"}
                       value={"조회하기"} ref={confirmRef} onClick={() => {
                    checkForm({field, method});
                }}/>
            </div>
        </div>
    )
}

function After({field}) {
    const auth = field.auth;

    return (
        <div className={"order-confirm order-confirm-result"}>
            <div className="order-top">
                <span>주문정보</span>
                <span>주문과 관련된 직접적인 문의는 카카오톡 채널 또는 전화 문의 부탁드립니다.</span>
            </div>
            <div className="order-info">
                <div className="order-info-id">
                    <span>주문번호</span>
                    <div>
                        <span>20230311-001</span>
                    </div>
                </div>
                <div className="order-info-id">
                    <span>주문자명</span>
                    <div>
                        <span>홍길동</span>
                    </div>
                </div>
                <div className="order-info-products">
                    <span>주문상품</span>
                    <div className="products-list">
                        <div>
                            <span>상품명</span>
                            <span>옵션</span>
                            <span>수량</span>
                        </div>
                        <div>
                            <span>아메리카노</span>
                            <span>레귤러 (2샷)</span>
                            <span>1</span>
                        </div>
                        <div>
                            <span>계절 생과일 주스</span>
                            <span></span>
                            <span>1</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="order-bottom">
                <span>주문상태</span>
            </div>
            <div className="order-status">
                <div className="order-state current">
                    <span>주문완료</span>
                    <span>주문이 접수되었습니다.</span>
                </div>
                <div>
                    <span>→</span>
                </div>
                <div className="order-state">
                    <span>준비중</span>
                    <span>주문된 상품을 준비 중입니다.</span>
                </div>
                <div>
                    <span>→</span>
                </div>
                <div className="order-state">
                    <span>픽업 가능</span>
                    <span>상품이 준비 완료되었습니다.</span>
                </div>
            </div>
        </div>
    )
}

export default OrderConfirm;