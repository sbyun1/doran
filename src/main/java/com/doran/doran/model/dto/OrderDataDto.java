package com.doran.doran.model.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class OrderDataDto {
    private String orderDate;
    private int orderSeq;
    private OrderInfoDto orderInfo;
    private String paymentType;
}
