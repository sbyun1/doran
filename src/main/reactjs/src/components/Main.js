import {useEffect, useRef, useState} from "react";
import '../resources/css/main.css';
import axios from "axios";

function Main() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [currentCategory, setCurrentCategory] = useState(0);
    const [maxSize, setMaxSize] = useState(0);
    const [currentSize, setCurrentSize] = useState(0);

    const searchRef = useRef();

    const initializeSize = (size) => {
        setMaxSize(size);
        if (currentSize > size)
            setCurrentSize(size);
        else
            setCurrentSize(16);
    }

    useEffect(() => {
        axios.get('/menu/init')
            .then(response => {
                setCategories(response.data.categories);
                setProducts(response.data.products);
                initializeSize(response.data.products.length);
            });
    }, []);

    useEffect(() => {
        axios.get('/menu/findByCategory?categoryId=' + currentCategory)
            .then(response => {
                setProducts(response.data);
                initializeSize(response.data.length);
            });
    }, [currentCategory]);

    const isEndpoint = () => {
        return currentSize >= maxSize;
    }

    const clickMore = (event) => {
        if (currentSize + 16 < maxSize) {
            setCurrentSize(currentSize + 16);
        } else {
            setCurrentSize(maxSize);
        }
    }

    const _category_all = {
        categoryId: 0,
        categoryName: '전체'
    }

    // props:category
    const _category = {
        field: (category) => {
            return {
                currentCategory: currentCategory, category: category, searchRef: searchRef
            }
        },
        method: {
            setCurrentCategory: setCurrentCategory,
            setProducts: setProducts,
            initializeSize: initializeSize
        }
    }

    // props:search
    const _search = {
        field: {keyword: keyword, currentCategory: currentCategory, searchRef: searchRef},
        method: {
            setKeyword: setKeyword,
            setProducts: setProducts,
            setCurrentCategory: setCurrentCategory,
            initializeSize: initializeSize
        }
    }

    const isEmptyList = () => {
        if (products.length == 0) {
            return true;
        }
        return false;
    }

    return (
        <div className="main-container">
            <div className="product-category">
                <Category method={_category.method} field={_category.field(_category_all)}/>
                {
                    categories.map(category => {
                        return <Category key={category.categoryId} data-key={category.categoryId}
                                         method={_category.method} field={_category.field(category)}/>
                    })
                }
            </div>
            <div className="product-search">
                <Search method={_search.method} field={_search.field}></Search>
            </div>
            <div className="product-list">
                {
                    isEmptyList() ? (
                        <div className="empty-result">
                            <span>조회된 결과가 없습니다.</span>
                            <span>카테고리 및 검색어를 확인하신 후 다시 조회하세요.</span>
                        </div>
                    ) : (
                        Array.from(products.slice(0, currentSize)).map(product => {
                            return <Product key={product.productId} data-key={product.productId}
                                            product={product}></Product>
                        })
                    )
                }
                <div className={`product-list-end ${isEndpoint() ? "hidden" : null}`}>
                    <button onClick={clickMore}>더 보기</button>
                </div>
            </div>
        </div>
    )
}

function Category({method, field}) {
    const category = field.category;
    const isSelected = (categoryId) => {
        return field.currentCategory == categoryId;
    }
    const clickCategory = (event) => {
        field.searchRef.current.value = '';

        const categoryId = event.target.getAttribute('data-key');
        method.setCurrentCategory(categoryId);
    }

    return <span className={isSelected(category.categoryId) ? "option-selected" : null}
                 key={category.categoryId}
                 data-key={category.categoryId}
                 onClick={clickCategory}>{category.categoryName}</span>
}

function Search({field, method}) {
    const keyword = field.keyword;
    const searchRef = field.searchRef;
    const currentCategory = field.currentCategory;
    const findByKeyword = () => {
        axios.get('/menu/findByKeyword?keyword=' + keyword + '&categoryId=' + currentCategory)
            .then(response => {
                method.setProducts(response.data);
                method.initializeSize(response.data.length);
            });
    }

    return (
        <>
            <input type="text" name="keyword" onChange={e => {
                method.setKeyword(e.target.value);
            }} onKeyPress={e => {
                if (e.key === 'Enter') {
                    findByKeyword();
                }
            }} ref={searchRef}/>
            <input type="button" value="검색" onClick={findByKeyword}/>
        </>
    )
}

function Product({product}) {
    const detailRef = useRef(null);
    const orderRef = useRef(null);
    const confirmRef = useRef(null);
    const [orderQuantity, setOrderQuanity] = useState(0);
    const [shotQuantity, setShotQuantity] = useState(0);
    const [orderOption, setOrderOption] = useState(null);

    const isSingle = (optionLength) => {
        return optionLength === 1;
    }

    const isNotNull = () => {
        return orderOption != null;

    }

    const isCoffee = (categoryName) => {
        return categoryName === '커피';

    }

    const adjustQuantity = (change) => {
        setOrderQuanity(orderQuantity + change);
    }

    const adjustShotQuantity = (change) => {
        setShotQuantity(shotQuantity + change);
    }

    const addCart = (option) => {
        setOrderOption(option);
        setOrderQuanity(1);
        orderRef.current.classList.toggle("shown");
        confirmRef.current.focus();
    }

    const confirmCart = (confirmFlag) => {
        if (confirmFlag) {
            const item = {
                optionId: orderOption.optionId,
                optionQuantity: orderQuantity,
                shotQuantity: shotQuantity
            };

            axios.post('/cart/add', item).then(response => {
                if (response.data) {
                    if (window.confirm('장바구니에 추가되었습니다. 장바구니로 이동하시겠습니까?'))
                        window.location.href = '/cart';
                } else
                    alert('장바구니에 추가하지 못했습니다.')
            });
        }
        setOrderQuanity(0);
        setShotQuantity(0);
        orderRef.current.classList.toggle("shown");
    }

    const handleDetails = () => {
        detailRef.current.classList.toggle('shown');
    }

    return (
        <div className="product-figure">
            <div className="item-info">
                <div className="item-info-product" onClick={() => {
                    handleDetails(product.productId)
                }}>
                    <span>{product.categoryName}</span>
                    <span className="item-name">{product.productName}</span>
                </div>
                <div className={`item-options ${isSingle(product.productOptions.length) ? "single" : null}`}>
                    {
                        product.productOptions.map(option => {
                            return <ProductOption key={option.optionId} data-key={option.optionId}
                                                  option={option} field={{orderOption: orderOption}}
                                                  method={{
                                                      setOrderOption: setOrderOption,
                                                      addCart: addCart
                                                  }}></ProductOption>
                        })
                    }
                </div>
            </div>
            <div className="item-details order" ref={orderRef}>
                <span className={"title"}>장바구니 추가</span>
                {
                    isNotNull() && (
                        <div className="item-order-details">
                            <span>상품명</span><span>{product.productName}</span>
                            <span>옵션명</span><span>{orderOption.optionName}</span>
                            {
                                isCoffee(product.categoryName) && (
                                    <>
                                        <span>샷 추가(+1,000)</span>
                                        <div className="order-quantity-container">
                                            {
                                                (shotQuantity > 0) && <span className="adjust-quantity" onClick={() => {
                                                    adjustShotQuantity(-1)
                                                }}>-</span>
                                            }
                                            <span>
                                                {
                                                    (shotQuantity == 0) ? '없음' : shotQuantity
                                                }
                                            </span>
                                            <span className="adjust-quantity" onClick={() => {
                                                adjustShotQuantity(1)
                                            }}>+</span>
                                        </div>
                                    </>
                                )
                            }
                            <span>수량</span>
                            <div className="order-quantity-container">
                                {
                                    (orderQuantity > 1) && <span className="adjust-quantity" onClick={() => {
                                        adjustQuantity(-1)
                                    }}>-</span>
                                }
                                <span>{orderQuantity}</span>
                                <span className="adjust-quantity" onClick={() => {
                                    adjustQuantity(1)
                                }}>+</span>
                            </div>
                            <span>가격</span>
                            <span>{
                                (orderQuantity * orderOption.optionPrice + 1000 * shotQuantity).toLocaleString("ko-KR", {maximumFractionDigits: 0})
                            }</span>
                        </div>
                    )
                }
                <div className={"item-order-confirm"}>
                    <input type="button" ref={confirmRef} onClick={() => {
                        confirmCart(true)
                    }} value="확인"/>
                    <input type="button" onClick={() => {
                        confirmCart(false)
                    }} value="취소"/>
                </div>
            </div>
            <div className="item-details info" id={product.productId} ref={detailRef}>
                <span>{product.productName}</span>
                <span>{product.productDesc}</span>
                <span className="close" onClick={() => {
                    handleDetails(product.productId)
                }}></span>
            </div>
            <div className="item-add-order"></div>
        </div>
    )
}

function ProductOption({
                           option, field, method
                       }) {
    const orderOption = field.orderOption;
    const setCurrency = (price) => {
        return price.toLocaleString("ko-KR", {maximumFractionDigits: 0});
    }

    return (
        <div>
            <span>{option.optionName}</span>
            <span>{setCurrency(option.optionPrice)}</span>
            <button onClick={() => {
                method.addCart(option)
            }}>+ Cart
            </button>
        </div>
    )
}

export default Main