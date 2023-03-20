package com.doran.doran.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class ItemDto {
    private int productId;
    private String productName;
}
