import '../../resources/css/order/confirm.css'
import {useState} from "react";

function OrderConfirm() {
    const [auth, setAuth] = useState(false);

    return (
        <div className="main-container order-confirm-back">
            <Before/>
        </div>
    )
}

function Before() {
    return (
        <div className={"order-confirm"}>
            <div className={"order-top"}>
                <span>주문 조회</span>
                <span>CAFE DORAN</span>
            </div>
            <div className={"order-check"}>
                <div>
                    <span>주문번호</span>
                    <input name={"orderSeq"} inputMode={"numeric"}/>
                </div>
                <div>
                    <span>주문자명</span>
                    <input name={"orderName"}/>
                </div>
                <div>
                    <span>비밀번호</span>
                    <input name={"orderPassword"} type={"password"} inputMode={"numeric"}/>
                </div>
                <span className={"order-check-desc"}>
                    * 주문 정보 오 입력 시 주문 상태 확인 및 취소가 어려울 수 있으니
                    다시 한번 확인해 주시기 바랍니다.
                </span>
                <input className={"style-button-confirm"} type={"button"} value={"조회하기"}/>
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