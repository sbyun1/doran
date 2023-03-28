package com.doran.doran.model.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "PRODUCT_OPTION")
public class ProductOption {
    @Id
    @GeneratedValue
    private int optionId;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "productId")
    private Product product;

    private String optionName;
    private int optionPrice;
}
