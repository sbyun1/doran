package com.doran.doran.model.dto;

import com.doran.doran.model.entity.ProductOption;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Getter
@Setter
@SuperBuilder
@RequiredArgsConstructor
public class MenuItemDto extends ItemDto {
    private String categoryName;
    private List<ProductOption> productOptions;
    private String productDesc;

    public MenuItemDto(ItemDtoBuilder<?, ?> b) {
        super(b);
    }
}
