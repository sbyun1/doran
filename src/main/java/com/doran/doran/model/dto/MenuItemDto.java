package com.doran.doran.model.dto;

import com.doran.doran.model.entity.ProductOption;

import java.util.List;

public class MenuItemDto extends ItemDto {
    private String categoryName;
    private List<ProductOption> productOptions;
    private String productDesc;

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public List<ProductOption> getProductOptions() {
        return productOptions;
    }

    public void setProductOptions(List<ProductOption> productOptions) {
        this.productOptions = productOptions;
    }

    public String getProductDesc() {
        return productDesc;
    }

    public void setProductDesc(String productDesc) {
        this.productDesc = productDesc;
    }
}
