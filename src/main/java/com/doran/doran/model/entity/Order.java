package com.doran.doran.model.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "ORDER_TABLE")
public class Order {
    @Id
    @GeneratedValue
    private int orderId;

    private int orderSeq;

    @Temporal(TemporalType.TIMESTAMP)
    private Date orderDate;

    private String orderPayment;

    @OneToOne(mappedBy = "order", cascade = CascadeType.ALL)
    @JsonManagedReference
    private OrderInfo orderInfo;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<OrderItem> orderItems = new ArrayList<>();

    private int orderTotalPrice = 0;

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus = OrderStatus.received;

    public void addOrderInfo(OrderInfo orderInfo) {
        this.setOrderInfo(orderInfo);
        orderInfo.setOrder(this);
    }

    public void addOrderItems(OrderItem orderItem) {
        orderItems.add(orderItem);
        orderTotalPrice += orderItem.getOrderItemPrice();
        orderItem.setOrder(this);
    }

    public void setOrderDate() {
        orderDate = new Date();
    }

    public Order(OrderInfo orderInfo) {
        this.addOrderInfo(orderInfo);
        this.setOrderDate(new Date());
    }
}