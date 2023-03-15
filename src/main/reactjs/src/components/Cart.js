import '../resources/css/cart.css'
import '../resources/css/main.css'
import {useEffect, useState} from "react";

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const calculateAmount = (_cartItems) => {
        let currentAmount = 0;

        _cartItems.forEach(ci => {
            currentAmount += ci.optionQuantity * ci.optionUnitPrice;
        });

        setTotalAmount(currentAmount);
    }

    useEffect(() => {
        // 테스트 데이터 설정
        const data = [{
            productName: '아메리카노',
            optionId: 1,
            optionName: '레귤러 (2샷)',
            optionQuantity: 5,
            optionUnitPrice: 3500
        }, {
            productName: '계절 생과일 주스',
            optionId: 2,
            optionName: '단일옵션',
            optionQuantity: 1,
            optionUnitPrice: 6500
        }];

        setCartItems(data);
        calculateAmount(data);
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
                    cartItems.map(ci => {
                        return (<CartItem cartItem={ci} key={ci.optionId} data-key={ci.optionId}/>)
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
    return (
        <div className="cart-figure">
            <span>{cartItem.productName}</span>
            <span>{cartItem.optionName}</span>
            <div className="cart-figure-quantity">
                <button>-</button>
                <span>{cartItem.optionQuantity}</span>
                <button>+</button>
            </div>
            <span>{cartItem.optionUnitPrice * cartItem.optionQuantity}</span>
            <button>제거</button>
        </div>
    )
}

export default Cart;