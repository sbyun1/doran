package com.doran.doran.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "ORDER_INFO")
public class OrderInfo {
    @Id
    @GeneratedValue
    private int orderInfoId;
    private String orderName;
    private String orderPassword;
    private String orderMemo;
    private String orderTel;
    @OneToOne
    private Order order;
}
