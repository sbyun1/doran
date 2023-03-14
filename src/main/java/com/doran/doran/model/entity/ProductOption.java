package com.doran.doran.model.entity;

import javax.persistence.*;

@Entity
@Table(name = "PRODUCT_PRICE")
public class ProductOption {
    @Id
    @GeneratedValue
    public int id;

    @ManyToOne
    @JoinColumn(name = "productId")
    public Product product;

    public String optionName;
    public int optionPrice;
}
