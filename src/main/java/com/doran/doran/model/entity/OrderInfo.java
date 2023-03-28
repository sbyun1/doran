package com.doran.doran.model.entity;

import com.doran.doran.model.dto.OrderInfoDto;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "ORDER_INFO")
public class OrderInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderInfoId;

    @Column(nullable = false)
    @Size(max = 10)
    private String orderName;

    @Column(nullable = false)
    private String orderPassword;

    private String orderMemo;

    private String orderTel;

    @OneToOne
    @JsonBackReference
    @JoinColumn(name = "orderId")
    private Order order;

    public OrderInfo(OrderInfoDto dto) {
        this.setOrderName(dto.getOrderName());
        this.setOrderPassword(dto.getOrderPassword());
        this.setOrderMemo(dto.getOrderMemo());
    }
}
