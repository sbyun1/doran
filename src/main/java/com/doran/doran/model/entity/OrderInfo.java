package com.doran.doran.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Getter
@Setter
@Table(name = "ORDER_INFO")
public class OrderInfo {
    @Id
    @GeneratedValue
    private int orderInfoId;

    @Column(nullable = false)
    @Size(max = 10)
    private String orderName;

    @Column(nullable = false)
    private String orderPassword;

    private String orderMemo;

    private String orderTel;
    @OneToOne
    private Order order;
}
