package com.doran.doran.model.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@RequiredArgsConstructor
public class OrderItemDto extends ItemDto {
    private int orderItemId;
    private int optionId;
    private String optionName;
    private int optionQuantity;
    private int optionUnitPrice;
    private int shotQuantity;

    public int getOptionPrice() {
        return optionQuantity * (optionUnitPrice + shotQuantity * 1000);
    }

    public OrderItemDto(ItemDtoBuilder<?, ?> b) {
        super(b);
    }
}
