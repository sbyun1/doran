package com.doran.doran.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrderDetailsDto {
    OrderInfoDto orderInfo;
    List<OrderItemDto> orderItemList;
}
