import '../resources/css/cart.css'
import '../resources/css/main.css'
import {useEffect, useRef, useState} from "react";
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
                    <span>수량</span>
                    <span>가격</span>
                    <span></span>
                </div>
                {
                    isEmpty() && <div><span className="cart-state-empty">장바구니에 상품이 존재하지 않습니다.</span></div>
                }
                {
                    cart.map(ci => {
                        return <CartItem method={{setCurrency: setCurrency}} field={{cartItem: ci}} key={ci.optionId}
                                         data-key={ci.optionId}/>
                    })
                }
                <div className="cart-total">
                    <span>총 금액</span>
                    <span>{setCurrency(totalAmount)}</span>
                </div>
            </div>
            {
                !isEmpty() && <Order/>
            }
        </div>
    )
}

function Order() {
    const pwdRef = useRef(null);
    const pwdValidRef = useRef(null);
    const ordConfirmRef = useRef(null);

    const isSixDigits = (orderPwd) => {
        return !!orderPwd.match(/^\d{6}$/);
    }

    function checkPwd() {
        pwdValidRef.current.value = null;

        if (isSixDigits(pwdRef.current.value)) {
            pwdValidRef.current.disabled = false;
            pwdValidRef.current.focus();
        } else {
            pwdValidRef.current.disabled = true;
        }
    }

    function checkNaN(e) {
        if (isNaN(e.key) || pwdValidRef.current.value.length > 5) {
            e.preventDefault();
        }
    }

    function checkPwdValid() {
        if (pwdRef.current.value == pwdValidRef.current.value) {
            ordConfirmRef.current.disabled = false;
            ordConfirmRef.current.title = '';
        } else {
            ordConfirmRef.current.disabled = true;
            ordConfirmRef.current.title = '비밀번호 확인 후 활성화됩니다.';
        }
    }

    return (
        <>
            <div className="order-top">
                <span>주문정보</span>
                <span>* 주문정보는 고객 식별, 구매 및 결제를 위해 사용됩니다.</span>
            </div>
            <div className="order-info">
                <div>
                    <span>주문자명</span><input type="text" name="orderName" placeholder="이름"/>
                </div>
                <div>
                    <span>비밀번호</span><input type="password" name="orderPassword"
                                            ref={pwdRef}
                                            onChange={() => {
                                                checkPwd()
                                            }}
                                            onKeyPress={(e) => {
                                                checkNaN(e.nativeEvent)
                                            }}
                                            placeholder="비밀번호 숫자 6자리"/>
                </div>
                <div>
                    <span>비밀번호 확인</span><input type="password" name="orderPasswordConfirm"
                                               ref={pwdValidRef} disabled
                                               onChange={() => {
                                                   checkPwdValid()
                                               }}
                                               onKeyPress={(e) => {
                                                   checkNaN(e.nativeEvent)
                                               }}
                                               placeholder="비밀번호 숫자 6자리 확인"/>
                </div>
                <div>
                    <span>메모</span><textarea name="orderMemo" placeholder="요청사항 입력"/>
                </div>
            </div>
            <div className="order-confirm">
                <input type="button" className={`order-confirm-button`}
                       ref={ordConfirmRef} title={"비밀번호 확인 후 활성화됩니다."} disabled value="주문하기">
                </input>
            </div>
        </>
    )
}

function CartItem({method, field}) {
    const cartItem = field.cartItem;
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
            <span>{method.setCurrency(cartItem.optionUnitPrice * cartItem.optionQuantity)}</span>
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