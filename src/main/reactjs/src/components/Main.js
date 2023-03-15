import {useEffect, useState} from "react";
import '../resources/css/main.css';
import '../resources/js/main.js';
import axios from "axios";

function Main() {
    const [products, setProducts] = useState([]);
    const [categories, setCategroies] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [currentCategory, setCurrentCategory] = useState(0);
    const [maxSize, setMaxSize] = useState(0);
    const [currentSize, setCurrentSize] = useState(0);
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
                setCategroies(response.data.categories);
                setProducts(response.data.products);
                initializeSize(response.data.products.length);
            });
    }, []);

    const clickCategory = (event) => {
        const categoryId = event.target.getAttribute('data-key');
        setCurrentCategory(categoryId);

        axios.get('/menu/findByCategory?categoryId=' + categoryId)
            .then(response => {
                setProducts(response.data);
                initializeSize(response.data.length);
            });
    }

    const clickMoreButton = (event) => {
        if (currentSize + 16 < maxSize) {
            setCurrentSize(currentSize + 16);
        } else {
            setCurrentSize(maxSize);
        }
    }

    const findByKeyword = () => {
        axios.get('/menu/findByKeyword?keyword=' + keyword)
            .then(response => {
                setProducts(response.data);
                initializeSize(response.data.length);
            });
    }

    const isSelected = (categoryId) => {
        return currentCategory == categoryId;
    }
    const isEndpoint = () => {
        return currentSize >= maxSize;
    }

    return (
        <div className="main-container">
            <div className="product-category">
                <span className={isSelected(0) ? "option-selected" : null}
                      data-key="0"
                      onClick={clickCategory}>전체</span>
                {
                    categories.map(category => {
                        return <span className={isSelected(category.categoryId) ? "option-selected" : null}
                                     key={category.categoryId}
                                     data-key={category.categoryId}
                                     onClick={clickCategory}>{category.categoryName}</span>
                    })
                }
            </div>
            <div className="product-search">
                <input type="text" name="keyword" onChange={e => {
                    setKeyword(e.target.value);
                }
                } onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        findByKeyword();
                    }
                }
                }/>
                <input type="button" value="검색" onClick={findByKeyword}/>
            </div>
            <div className="product-list">
                {
                    Array.from(products.slice(0, currentSize)).map(product => {
                        return <Product key={product.productId} data-key={product.productId}
                                        product={product}></Product>
                    })
                }
                <div className={`product-list-end ${isEndpoint() ? "hidden" : null}`}>
                    <button onClick={clickMoreButton}>더 보기</button>
                </div>
            </div>
        </div>
    )
}

function Product({product}) {
    const isSingle = (optionLength) => {
        return optionLength === 1;
    }

    return (
        <div className="product-figure">
            <div className="item-info">
                <span>{product.categoryName}</span>
                <span className="item-name">{product.productName}</span>
                <div className={`item-options ${isSingle(product.productOptions.length) ? "single" : null}`}>
                    {
                        product.productOptions.map(option => {
                            return <ProductOption key={option.optionId} data-key={option.optionId}
                                                  option={option}></ProductOption>
                        })
                    }
                </div>
            </div>
            <div className="item-details">
                <span>{product.productName}</span>
                <span>{product.productDesc}</span>
                <span className="close"></span>
            </div>
        </div>
    )
}

function ProductOption({option}) {
    return (
        <div>
            <span>{option.optionName}</span>
            <span>{option.optionPrice}</span>
            <button>+ Cart</button>
        </div>
    )
}

export default Main