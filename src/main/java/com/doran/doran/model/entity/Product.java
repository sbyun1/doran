package com.doran.doran.model.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "PRODUCT")
public class Product {
    @Id
    @GeneratedValue
    private int productId;
    private String productName;
    private String productDesc;
    private String productImg;
    private Boolean productAvailable;
    @OneToMany(mappedBy = "product")
    @JsonManagedReference
    private List<ProductOption> options = new ArrayList<>();
    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "categoryId")
    private Category category;

    public void addOptions(ProductOption option) {
        options.add(option);
        option.setProduct(this);
    }
}
