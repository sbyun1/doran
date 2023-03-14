import ProductOption from "./ProductOption.js";

function Product({product}) {
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

export default Product;