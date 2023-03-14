package com.doran.doran.model.entity;

import javax.persistence.*;

@Entity
@Table(name = "PRODUCT")
public class Product {
    @Id
    @GeneratedValue
    private int productId;
    private String productName;
    private String desc;
    private String imgSrc;
    private Boolean available;

    @ManyToOne
    
    private int categoryId;
}
