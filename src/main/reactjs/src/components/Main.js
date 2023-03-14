import {useEffect, useState} from "react";
import '../resources/css/main.css';
import '../resources/js/main.js';
import axios from "axios";
import styled from "styled-components";

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

    return (
        <div className="main-container">
            <div className="product-category">
                <span className="option-selected">전체</span>
                {
                    categories.map(category => {
                        return <span key={category.categoryId}>{category.categoryName}</span>
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
                        return <Product key={product.productId} product={product}></Product>
                    })
                }
            </div>
        </div>
    )
}

function Product({product}) {
    if (product.productOptions.length == 1) {
        const singleOptionStyle = {
            'grid-template-columns': 1
        }
    }
    return (
        <div className="product-figure">
            <div className="item-info">
                <span>{product.categoryName}</span>
                <span className="item-name">{product.productName}</span>
                <div className="item-options">
                    {
                        product.productOptions.map(option => {
                            return <ProductOption key={option.id} option={option}></ProductOption>
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
            <input type="hidden" id="option-id" value={option.optionId}/>
            <span>{option.optionName}</span>
            <span>{option.optionPrice}</span>
            <button>+ Cart</button>
        </div>
    )
}

export default Main