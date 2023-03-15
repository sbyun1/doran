import '../../resources/css/common.css';

function Header() {
    return (
        <div className="common top">
            <div className="common-header">
                <div className="logo">
                    <span onClick={() => {
                        window.location.href = '/'
                    }
                    }>Cafe Doran</span>
                </div>
            </div>
            <div className="common-nav">
                <span onClick={() => {
                    window.location.href = '/'
                }}>Menu</span>
                <span onClick={() => {
                    window.location.href = '/event'
                }}>Event</span>
                <span onClick={() => {
                    window.location.href = '/cart'
                }}>Cart</span>
                <span>Order</span>
            </div>
        </div>
    )
}

export default Header;