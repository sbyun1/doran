import {useEffect, useRef, useState} from "react";
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
        <>
            <div className={"order-top"}>
                <span>주문이 완료되었습니다.</span>
            </div>
            <div className={"order-complete top"}>
                <div className={"order-number"}>
                    <span>주문번호</span>
                    <span>1</span>
                </div>
                <div className={"order-complete-desc"}>
                    <div>
                    <span><a title="주문 확인 페이지로 이동"
                             className={"order-confirm-link"}
                             href={"/order/confirm"}>주문 확인 페이지</a>에서 주문 처리 상태를 확인할 수 있습니다.</span>
                    </div>
                    <span>※ 현장 결제의 경우 연락처 미인증 시 접수된 주문이 취소되는 점 유의 바랍니다.</span>
                </div>
            </div>
        </>
    )
}

function OrderBottom() {
    const telRef = useRef(null);
    const telBtnRef = useRef(null);
    const codeRef = useRef(null);
    const codeBtnRef = useRef(null);

    const [seconds, setSeconds] = useState(180);
    const [isActive, setIsActive] = useState(false);

    const [verifiedTel, setVerifiedTel] = useState(false);

    function reset() {
        setSeconds(180);
        setIsActive(false);
    }

    function setTimerText(count) {
        let remainder = count % 60;
        return parseInt(count / 60) + ':' + (remainder / 10 >= 1 ? remainder : '0' + remainder);
    }

    function initRef() {
        telBtnRef.current.disabled = true;
        codeRef.current.disabled = true;
        codeRef.current.value = '';
        codeBtnRef.current.disabled = true;
    }

    function checkNaN(e, limit) {
        if (isNaN(e.key) || e.target.value.length > limit) {
            e.preventDefault();
        }
    }

    function checkNull(e) {
        if (e.keyCode == 32) {
            e.preventDefault();
        }
    }

    function checkTelValid() {
        const orderTel = telRef.current.value;

        if (orderTel.match(/^[0-9]{3}[0-9]{4}[0-9]{4}$/)) {
            telBtnRef.current.disabled = false;
        } else {
            telBtnRef.current.disabled = true;
            reset();
        }
    }

    function checkCodeValid() {
        const orderTelCode = codeRef.current.value;

        if (orderTelCode.match(/^\d{6}$/)) {
            codeBtnRef.current.disabled = false;
        } else {
            codeBtnRef.current.disabled = true;
        }
    }

    function sendMessage() {
        // 세션 서버에 인증 정보가 저장된 후 타이머가 흐르도록 추후 구현
        reset();

        axios.post("/order/sendMessage", {
            orderTel: telRef.current.value
        }).then(response => {
            if (response.data) {
                setIsActive(true);
                codeRef.current.disabled = false;
                codeRef.current.focus();
            }
        });
    }

    function checkToken() {
        const data = {
            orderTel: telRef.current.value,
            tokenNum: codeRef.current.value
        }
        axios.post("/order/checkToken", data)
            .then(response => {
                if (response.data) {
                    alert("인증 성공");
                } else {
                    alert("인증 실패");
                }
            })
    }

    useEffect(() => {
        initRef();
    }, []);

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds - 1);
            }, 1000);
        } else if (!isActive && seconds !== 180) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    return (
        <>
            <div className={"order-bottom"}>
                <span>연락처를 입력하세요 !</span>
                <span>연락처 인증 시 카카오톡 알림톡을 통해 주문 처리 상태를 알림받을 수 있습니다.</span>
            </div>
            <div className={"order-complete bottom"}>
                <div className={"order-additional item-table"}>
                    <div>
                        <span>연락처</span>
                        <input className={"order-additional-input"} type={"tel"} name={"orderTel"} ref={telRef}
                               onKeyPress={(event) => {
                                   checkNaN(event.nativeEvent, 10);
                                   checkNull(event.nativeEvent);
                               }}
                               onChange={() => {
                                   initRef();
                                   checkTelValid();
                               }} placeholder={"'-' 빼고 입력"}/>
                        <input className={"order-additional-input style-button-confirm"} type={"button"} ref={telBtnRef}
                               onClick={() => {
                                   sendMessage();
                               }}
                               value={"인증번호 전송"}/>
                    </div>
                    <div>
                        <span>인증번호</span>
                        <div className={"order-code-container"}>
                            <input className={"order-additional-input order-code-input"} type={"number"}
                                   name={"orderTelCode"}
                                   ref={codeRef}
                                   onChange={() => {
                                       checkCodeValid();
                                   }}
                                   onKeyPress={event => {
                                       checkNaN(event.nativeEvent, 5);
                                       checkNull(event.nativeEvent);
                                   }} placeholder={"인증번호 6자리 입력"}/>
                            <span className={"order-code-timer"}>{setTimerText(seconds)}</span>
                        </div>
                        <input className={"order-additional-input style-button-confirm"} type={"button"}
                               ref={codeBtnRef} value={"번호 확인"}
                               onClick={() => {
                                   checkToken();
                               }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderComplete;