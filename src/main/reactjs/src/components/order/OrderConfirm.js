import '../../resources/css/order/confirm.css'

function OrderConfirm() {
    return (
        <div className="main-container">
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
        </div>
    )
}

export default OrderConfirm;