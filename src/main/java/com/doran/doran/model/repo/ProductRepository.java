package com.doran.doran.model.repo;

import com.doran.doran.model.entity.Category;
import com.doran.doran.model.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    public List<Product> findByCategory(Optional<Category> category);
}
