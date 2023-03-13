import {Component, Fragment} from "react";
import '../../resources/css/common.css';

class Header extends Component {
    render() {
        return (
            <div className="common top">
                <div className="common-header">
                    <div className="logo">
                        <span>Cafe Doran</span>
                    </div>
                </div>
                <div className="common-nav">
                    <span>Menu</span>
                    <span>Event</span>
                    <span>Cart</span>
                    <span>Order</span>
                </div>
            </div>
        )
    }
}

export default Header;