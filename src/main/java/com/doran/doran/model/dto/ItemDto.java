package com.doran.doran.model.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
public abstract class ItemDto {
    private int productId;
    private String productName;

    public ItemDto() {
    }
}
