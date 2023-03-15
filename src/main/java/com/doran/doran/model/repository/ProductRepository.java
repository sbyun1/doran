package com.doran.doran.model.repository;

import com.doran.doran.model.entity.Category;
import com.doran.doran.model.entity.Product;
import com.doran.doran.model.entity.ProductOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByCategory(Optional<Category> category);

    List<Product> findByProductNameContaining(String keyword);
}
