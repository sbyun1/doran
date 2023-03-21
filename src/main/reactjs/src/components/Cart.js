import '../resources/css/cart.css'
import '../resources/css/main.css'
import {memo, useEffect, useRef, useState} from "react";
import axios from "axios";

function Cart() {
    const [cart, setCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    const calculateAmount = (_cart) => {
        let currentAmount = 0;

        _cart.forEach(ci => {
            currentAmount += ci.optionQuantity * ci.optionUnitPrice + ci.shotQuantity * 1000;
        });

        setTotalAmount(currentAmount);
    }

    const selectList = () => {
        axios.get("/cart/selectList").then(response => {
            setCart(response.data);
            calculateAmount(response.data);
        });
    }

    useEffect(() => {
        selectList();
    }, []);

    const isEmpty = () => {
        if (cart.length == 0) {
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
            <div className="cart-list">
                <div className="cart-header">
                    <span>상품명</span>
                    <span>옵션</span>
                    <span>추가옵션</span>
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
                <div className="cart-total">
                    <span>총 결제 금액</span>
                    <span>{setCurrency(totalAmount)}</span>
                </div>
            </div>
            <div className={"cart-confirm"}>
                <input type={"button"} value={"계속 담기"} onClick={
                    () => {
                        window.location.href = "/"
                    }
                }/>
                <input type={"button"} value={"주문하기"} onClick={
                    () => {
                        if (isEmpty()) {
                            alert("장바구니에 아이템이 없습니다.");
                            return false;
                        }
                        window.location.href = "/order/pay"
                    }
                }/>
            </div>
        </div>
    )
}

function CartItem({method, field}) {
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
            return;
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
        <div className="cart-figure">
            <span>{cartItem.productName}</span>
            <span>{cartItem.optionName}</span>
            <span>{
                (cartItem.shotQuantity > 0) && ('샷추가(+' + cartItem.shotQuantity + ')')
            }</span>
            <div className="cart-figure-quantity">
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
            <span>{method.setCurrency(cartItem.optionUnitPrice * cartItem.optionQuantity + 1000 * cartItem.shotQuantity)}</span>
            <button onClick={() => {
                removeCart(cartItem.orderItemId);
                window.location.reload();
            }
            }>제거
            </button>
        </div>
    )
}

export default Cart;