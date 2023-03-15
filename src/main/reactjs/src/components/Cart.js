import '../resources/css/cart.css'
import '../resources/css/main.css'
import {useEffect, useState} from "react";
import axios from "axios";

function Cart() {
    const [cart, setCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const calculateAmount = (_cart) => {
        let currentAmount = 0;

        _cart.forEach(ci => {
            currentAmount += ci.optionQuantity * ci.optionUnitPrice;
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
        selectList()
    }, []);

    return (
        <div className="main-container">
            <div className="cart-top">
                <span>장바구니</span>
            </div>
            <div className="cart-list">
                <div className="cart-header">
                    <span>상품명</span>
                    <span>옵션</span>
                    <span>수량</span>
                    <span>가격</span>
                    <span></span>
                </div>
                {
                    cart.map(ci => {
                        return <CartItem cartItem={ci} key={ci.optionId} data-key={ci.optionId}/>
                    })
                }
                <div className="cart-total">
                    <span>총 금액</span>
                    <span>{totalAmount}</span>
                </div>
            </div>
            <div className="payment-top">
                <span>결제하기</span>
            </div>
            <div className="payment-option">
                <button>카카오페이</button>
                <button>현장결제</button>
            </div>
        </div>
    )
}

function CartItem({cartItem}) {
    const removeCart = (optionId) => {
        if (window.confirm("상품을 제거하시겠습니까?")) {
            axios.get('/cart/remove?optionId=' + optionId)
                .then(response => {
                    if (response)
                        alert("상품이 제거되었습니다.");
                    else
                        alert("상품이 제거되지 않았습니다.");
                });
        }
    }

    const setQuantity = (change, optionId, optionQuantity) => {
        let changedValue = change + Number(optionQuantity);
        if (changedValue <= 0) {
            return;
        }

        axios.get('/cart/setQuantity?optionId=' + optionId + '&optionQuantity=' + changedValue)
            .then(response => {
                if (response)
                    window.location.reload();
            });
    }

    return (
        <div className="cart-figure">
            <span>{cartItem.productName}</span>
            <span>{cartItem.optionName}</span>
            <div className="cart-figure-quantity">
                <button onClick={() => {
                    setQuantity(-1, cartItem.optionId, cartItem.optionQuantity)
                }}>➖
                </button>
                <span>{cartItem.optionQuantity}</span>
                <button onClick={() => {
                    setQuantity(1, cartItem.optionId, cartItem.optionQuantity)
                }}>➕
                </button>
            </div>
            <span>{cartItem.optionUnitPrice * cartItem.optionQuantity}</span>
            <button onClick={() => {
                removeCart(cartItem.optionId);
                window.location.reload();
            }
            }>제거
            </button>
        </div>
    )
}

export default Cart;