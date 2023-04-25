import '../../resources/css/order/confirm.css'
import {useRef, useState} from "react";
import axios from "axios";

function OrderConfirm() {
    const [auth, setAuth] = useState(false);

    return (
        <div className="main-container order-confirm-back">
            <Before/>
        </div>
    )
}

function Before() {
    const seqRef = useRef(null);
    const nameRef = useRef(null);
    const pwdRef = useRef(null);
    const confirmRef = useRef(null);

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

    function checkForm() {
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
                orderSeq: orderSeq
            }

            axios.post("/order/checkStatus", data).then(response => {
                if (response.data) {
                    alert("조회 성공")
                } else {
                    alert("조회 실패");
                }
            })
        }
    }

    return (
        <div className={"order-confirm"}>
            <div className={"order-top"}>
                <span>주문 조회</span>
                <span>CAFE DORAN</span>
            </div>
            <div className={"order-check"}>
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
                    checkForm();
                }}/>
            </div>
        </div>
    )
}

function After() {
    return (
        <>
            <div className="order-top">
                <span>주문정보</span>
            </div>
            <div className="order-info">
                <div className="order-info-id">
                    <span>주문번호</span>
                    <div>
                        <span>20230311-001</span>
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
        </>
    )
}

export default OrderConfirm;