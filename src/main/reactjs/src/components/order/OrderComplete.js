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
    /**/
    const codeRef = useRef(null);
    const codeBtnRef = useRef(null);
    /**/
    const validRef = useRef(null);
    /**/
    const [seconds, setSeconds] = useState(180);
    const [isActive, setIsActive] = useState(false);
    const [isValid, setIsValid] = useState(false);

    function reset() {
        setSeconds(180);
        setIsActive(false);
        setIsValid(false);
    }

    function setTimerText(count) {
        let remainder = count % 60;
        return parseInt(count / 60) + ':' + (remainder / 10 >= 1 ? remainder : '0' + remainder);
    }

    function initRef() {
        disableAllInput();
        clearAllInput();
    }

    function disableAllInput() {
        telBtnRef.current.disabled = true;
        codeRef.current.disabled = true;
        codeBtnRef.current.disabled = true;
    }

    function clearAllInput() {
        codeRef.current.value = '';
        validRef.current.innerHTML = '';
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
                validRef.current.innerHTML = '인증번호가 전송되었습니다.';
            }
        });
    }

    function checkToken() {
        if (isActive) {
            const data = {
                orderTel: telRef.current.value,
                tokenNum: codeRef.current.value
            }
            axios.post("/order/checkToken", data)
                .then(response => {
                    if (response.data) {
                        alert("휴대폰 인증이 완료되었습니다.");
                        setIsValid(true);
                    } else {
                        validRef.current.classList.add('incorrect');
                        validRef.current.innerHTML = '인증번호가 일치하지 않습니다.';
                    }
                })
        }
    }

    useEffect(() => {
        initRef();
    }, []);

    useEffect(() => {
        if (isValid) {
            disableAllInput();
            validRef.current.innerHTML = '';
        }
    }, [isValid]);

    const useInterval = (callback, delay) => {
        const intervalRef = useRef();
        const callbackRef = useRef(callback);

        useEffect(() => {
            callbackRef.current = callback;
        }, [callback]);

        useEffect(() => {
            if (typeof delay === "number") {
                intervalRef.current = setInterval(() => {
                    callbackRef.current()
                }, delay);
            }
            return () => clearInterval(intervalRef.current);
        }, [delay]);

        return intervalRef;
    }

    useInterval(() => {
            let prev = seconds;
            setSeconds(prev - 1);
            if (prev === 1) {
                alert("인증시간이 만료되었습니다. 재시도하세요.");
                reset();
            }
        }, isActive && seconds && !isValid > 0 ? 1000 : null
    );

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
                        <input className={"order-additional-input"} inputMode="tel" name={"orderTel"}
                               ref={telRef}
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
                            <input className={"order-additional-input order-code-input"} inputMode="numeric"
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
                            <span className={"order-code-valid"} ref={validRef}></span>
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