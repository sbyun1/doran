package com.doran.doran.model.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
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
    private ProductOption orderItem;
    private int orderQuantity;
    private int orderShotQuantity;
}
