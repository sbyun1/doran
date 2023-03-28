package com.doran.doran.model.entity;

import com.doran.doran.model.dto.OrderItemDto;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "ORDER_ITEM")
public class OrderItem {
    @Id
    @GeneratedValue
    private int orderItemId;
    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "orderId")
    private Order order;
    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "optionId")
    private ProductOption orderOption;
    private int orderQuantity;
    private int orderShotQuantity;

    private int orderItemPrice = 0;

    public OrderItem(ProductOption orderOption, OrderItemDto orderItemDto) {
        this.setOrderOption(orderOption);
        this.setOrderQuantity(orderItemDto.getOptionQuantity());
        this.setOrderShotQuantity(orderItemDto.getShotQuantity());
        this.setOrderItemPrice(orderItemDto.getOptionPrice());
    }
}
