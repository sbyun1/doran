import '../../resources/css/order/confirm.css'
import {useEffect, useRef, useState} from "react";
import axios from "axios";

function OrderConfirm() {

    return (
        <div className="main-container order-confirm-back">
            <ConfirmElement/>
        </div>
    )
}

function ConfirmElement() {
    const dateRef = useRef(null);
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
                    window.location.href = "/order/details";

                } else {
                    alert("조회에 실패하였습니다.");
                }
            })
        }
    }

    useEffect(() => {
        const today = new Date();
        const todayString = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        dateRef.current.value = todayString;
        dateRef.current.max = todayString;
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
                    <input name={"orderDate"} type={"date"} ref={dateRef}/>
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
                    checkForm();
                }}/>
            </div>
        </div>
    )
}

export default OrderConfirm;