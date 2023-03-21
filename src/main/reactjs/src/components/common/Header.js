import '../../resources/css/common.css';

function Header() {
    return (
        <>
            <div className="common top">
                <div className="common-nav">
                    <span className={"common-nav-logo"}>카페 도란</span>
                    <span onClick={() => {
                        window.location.href = '/'
                    }}>Menu</span>
                    <span onClick={() => {
                        window.location.href = '/event'
                    }}>Event</span>
                    <span onClick={() => {
                        window.location.href = '/cart'
                    }}>Cart</span>
                    <span onClick={() => {
                        window.location.href = '/order/confirm'
                    }}>Order</span>
                </div>
            </div>
        </>)
}

export default Header;