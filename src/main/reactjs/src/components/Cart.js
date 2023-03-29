import '../resources/css/cart.css'
import '../resources/css/main.css'
import {Component, memo, useEffect, useRef, useState} from "react";
import axios from "axios";
import * as PropTypes from "prop-types";

function Cart() {
    const [mode, setMode] = useState(0);
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const calculateAmount = (_cart) => {
        let currentAmount = 0;

        _cart.forEach(ci => {
            currentAmount += ci.optionQuantity * ci.optionUnitPrice + ci.shotQuantity * 1000;
        });

        setTotalPrice(currentAmount);
    }

    const selectList = () => {
        axios.get("/cart/selectList").then(response => {
            setCart(response.data);
            calculateAmount(response.data);
            setMode(1);
        });
    }

    useEffect(() => {
        selectList();
    }, []);

    const isEmpty = () => {
        if (cart.length == 0 && mode == 1) {
            return true;
        }
        return false;
    }
    const setCurrency = (price) => {
        return price.toLocaleString("ko-KR", {maximumFractionDigits: 0});
    }

    return (
        <div className="main-container">
            <div className="cart-top">
                <span>장바구니</span>
            </div>
            <div className="cart-list item-table">
                <div className="cart-header item-table-header">
                    <span>상품 정보</span>
                    <span>수량</span>
                    <span>소계</span>
                    <span></span>
                </div>
                {
                    isEmpty() && <div><span className="cart-state-empty">장바구니에 상품이 존재하지 않습니다.</span></div>
                }
                {
                    cart.map(ci => {
                        return <CartItem method={{setCurrency: setCurrency}}
                                         field={{cartItem: ci}} key={ci.optionId}
                                         data-key={ci.optionId}/>
                    })
                }
                <div className="cart-total item-table-footer">
                    <span>총 결제 금액</span>
                    <span>{setCurrency(totalPrice)}원</span>
                </div>
            </div>
            <div className={"cart-confirm"}>
                <input className={"style-button-confirm"} type={"button"} value={"계속 담기"} onClick={
                    () => {
                        window.location.href = "/"
                    }
                }/>
                <input className={"style-button-confirm"} type={"button"} value={"주문하기"} onClick={
                    () => {
                        if (isEmpty()) {
                            alert("장바구니에 아이템이 없습니다.");
                            return false;
                        }
                        window.location.href = "/order/list"
                    }
                }/>
            </div>
        </div>
    )
}

class CartItem extends Component {
    render() {
        let {method, field} = this.props;
        const cartItem = field.cartItem;
        const removeCart = (orderItemId) => {
            if (window.confirm("상품을 제거하시겠습니까?")) {
                axios.get('/cart/remove?orderItemId=' + orderItemId)
                    .then(response => {
                        if (response)
                            alert("상품이 제거되었습니다.");
                        else
                            alert("상품이 제거되지 않았습니다.");
                    });
            } else {
                return false;
            }
        }

        const setQuantity = (change, cartItem) => {
            let newItem = cartItem;
            newItem.optionQuantity += change;

            axios.post('/cart/setQuantity', newItem).then(response => {
                if (response.data)
                    window.location.reload();
            })
        }

        return (
            <div className="cart-item">
                <div className={"cart-item-detail"}>
                    <span>{cartItem.productName}</span>
                </div>
                <div className={"cart-item-option"}>
                    <div>
                        <span className={"item-option-label"}>옵션</span>
                        <span>{cartItem.optionName}</span>
                        <span>{method.setCurrency(cartItem.optionUnitPrice)}원</span>
                    </div>
                    {
                        (cartItem.shotQuantity > 0)
                        &&
                        (
                            <div>
                                <span className={"item-option-label"}>추가</span>
                                <span>샷 추가 (+{cartItem.shotQuantity})</span>
                                <span>{method.setCurrency(cartItem.shotQuantity * 1000)}원</span>
                            </div>
                        )
                    }
                </div>
                <div className="cart-item-quantity">
                    {
                        (cartItem.optionQuantity > 1) ?
                            (
                                <span className="adjust-quantity" onClick={() => {
                                    setQuantity(-1, cartItem)
                                }}>-</span>
                            )
                            :
                            (
                                <span></span>
                            )
                    }
                    <span>{cartItem.optionQuantity}</span>
                    <span className="adjust-quantity" onClick={() => {
                        setQuantity(+1, cartItem)
                    }}>+</span>
                </div>
                <span>{method.setCurrency(cartItem.optionQuantity * (cartItem.optionUnitPrice + 1000 * cartItem.shotQuantity))}원</span>
                <div className={"cart-item-discard"} onClick={() => {
                    removeCart(cartItem.orderItemId);
                    window.location.reload();
                }}/>
            </div>
        )
    }
}

CartItem.propTypes = {
    method: PropTypes.any,
    field: PropTypes.any
}

export default Cart;