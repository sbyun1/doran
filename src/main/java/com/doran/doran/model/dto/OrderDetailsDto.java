package com.doran.doran.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class OrderDetailsDto {
    int orderSeq;
    OrderInfoDto orderInfo;
    List<OrderItemDto> orderItems;

    String orderStatus;
}
