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

export default ProductOption;