import {useEffect, useState} from "react";
import '../resources/css/main.css';
import '../resources/js/main.js';
import axios from "axios";
import {string} from "bfj/src/events";

function Main() {
    const [products, setProducts] = useState([]);
    const [categories, setCategroies] = useState([]);

    useEffect(() => {
        axios.get('/menu/init')
            .then(response => {
                setCategroies(response.data.categories);
                setProducts(response.data.products);
            });
    }, []);

    const clickCategory = (event) => {
        const categoryId = event.target.getAttribute('data-key');

        axios.get('/menu/findByCategory?categoryId=' + categoryId)
            .then(response => {
                setProducts(response.data);
            });
    }

    return (
        <div className="main-container">
            <div className="product-category">
                <span className="option-selected" data-key="0"
                      onClick={clickCategory}>전체</span>
                {
                    categories.map(category => {
                        return <span key={category.categoryId} data-key={category.categoryId}
                                     onClick={clickCategory}>{category.categoryName}</span>
                    })
                }
            </div>
            <div className="product-search">
                <input type="text" name="keyword"/>
                <input type="button" value="검색"/>
            </div>
            <div className="product-list">
                {
                    products.map(product => {
                        return <Product key={product.productId} data-key={product.productId}
                                        product={product}></Product>
                    })
                }
            </div>
        </div>
    )
}

function Product({product}) {
    return (
        <div className="product-figure">
            <div className="item-info">
                <span>{product.categoryName}</span>
                <span className="item-name">{product.productName}</span>
                <div className="item-options">
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