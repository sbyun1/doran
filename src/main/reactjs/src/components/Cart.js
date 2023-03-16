import '../resources/css/cart.css'
import '../resources/css/main.css'
import {useEffect, useState} from "react";
import axios from "axios";

function Cart() {
    const [cart, setCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [verifiedTel, setVerifiedTel] = useState(0);
    const [verifiedPwd, setVerifiedPwd] = useState(0);

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
            <div className="order-top">
                <span>주문정보</span>
                <span>* 주문정보는 고객 식별, 구매 및 결제를 위해 사용됩니다.</span>
            </div>
            <div className="order-info">
                <div>
                    <span>주문자명</span><input type="text" name="orderName" placeholder="이름"/>
                </div>
                <div>
                    <span>연락처</span>
                    <div className="order-info-validation">
                        <input type="tel" className="input-valid" name="orderTel" onChange={
                            (event) => {
                                const data = event.target.value;
                                if (data.match(/^[010]{3}[0-9]{4}[0-9]{4}$/) == null) {
                                    /*
                                    * 0 : 입력 없음
                                    * 1 : 입력 올바름
                                    * 2 : 입력 틀림
                                    */
                                    setVerifiedTel(2);
                                } else {
                                    setVerifiedTel(1);
                                }
                            }
                        }/>
                        <input type="button" className="disabled" value="인증요청"/>
                    </div>
                    <span>* 주문처리 상태가 카카오톡을 통해 전송되니 정확한 정보를 기입해주세요.</span>
                </div>
                <div>

                    <span>인증번호</span>
                    <div className="order-info-validation">
                        <input type="number" className="input-valid" name="orderTelValid"/>
                        <input type="button" className="disabled" value="인증"/>
                    </div>
                </div>
                <div>
                    <span>비밀번호</span><input type="password" name="orderPwd" placeholder="비밀번호 숫자 4자리"/>
                </div>
                <div>
                    <span>비밀번호</span><input type="password" name="orderPwdValid" placeholder="비밀번호 숫자 4자리 확인"/>
                </div>
                <div>
                    <span>메모</span><textarea name="orderMemo" placeholder="요청사항 입력"/>
                </div>
            </div>
            <div className="order-confirm">
                <button>주문하기</button>
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