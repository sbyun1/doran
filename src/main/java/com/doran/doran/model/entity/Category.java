package com.doran.doran.model.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "CATEGORY")
public class Category {
    @Id
    @GeneratedValue
    private int categoryId;
    private String categoryName;
    @OneToMany(mappedBy = "category")
    @JsonManagedReference
    private List<Product> products = new ArrayList<>();

    public Category() {
    }

    public void addProducts(Product product) {
        products.add(product);
        product.setCategory(this);
    }
}
