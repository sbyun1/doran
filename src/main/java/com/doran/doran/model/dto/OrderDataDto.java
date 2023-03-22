package com.doran.doran.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderDataDto {
    private OrderInfoDto orderInfo;
    private String paymentType;
}
