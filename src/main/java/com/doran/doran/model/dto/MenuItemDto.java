package com.doran.doran.model.dto;

import com.doran.doran.model.entity.ProductOption;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MenuItemDto extends ItemDto {
    private String categoryName;
    private List<ProductOption> productOptions;
    private String productDesc;
}
