import '../../resources/css/common.css';

function Header() {
    return (
        <>
            <div className="common top">
                <div className="common-nav">
                    <span className={"common-nav-logo"}>카페 도란</span>
                    <span onClick={() => {
                        window.location.href = '/'
                    }}>메뉴</span>
                    <span onClick={() => {
                        window.location.href = '/event'
                    }}>이벤트</span>
                    <span onClick={() => {
                        window.location.href = '/cart'
                    }}>장바구니</span>
                    <span onClick={() => {
                        window.location.href = '/order/confirm'
                    }}>주문조회</span>
                </div>
            </div>
        </>)
}

export default Header;