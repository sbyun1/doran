package com.doran.doran.model.service;

import com.doran.doran.model.dto.MenuDto;
import com.doran.doran.model.entity.Category;
import com.doran.doran.model.entity.Product;
import com.doran.doran.model.repo.CategoryRepository;
import com.doran.doran.model.repo.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    public List<MenuDto> findAll() {
        List<MenuDto> list = new ArrayList<MenuDto>();
        productRepository.findAll().forEach(p -> {
            MenuDto dto = new MenuDto();

            // Response로 보내기 적절한 타입으로 Entity를 Dto로 변환
            dto.setCategoryName(p.getCategory().getCategoryName());
            dto.setProductId(p.getProductId());
            dto.setProductName(p.getProductName());
            dto.setProductDesc(p.getProductDesc());
            dto.setProductOptions(p.getOptions());

            list.add(dto);
        });
        return list;
    }

    public List<MenuDto> findByCategory(Integer categoryId) {
        List<MenuDto> list = new ArrayList<>();
        Optional<Category> category = categoryRepository.findById(categoryId);
        productRepository.findByCategory(category).forEach(p -> {
            MenuDto dto = new MenuDto();

            // Response로 보내기 적절한 타입으로 Entity를 Dto로 변환
            dto.setCategoryName(p.getCategory().getCategoryName());
            dto.setProductId(p.getProductId());
            dto.setProductName(p.getProductName());
            dto.setProductDesc(p.getProductDesc());
            dto.setProductOptions(p.getOptions());

            list.add(dto);
        });
        return list;
    }

    public Optional<Product> findById(Integer productId) {
        Optional<Product> product = productRepository.findById(productId);
        return product;
    }

    public Product save(Product product) {
        productRepository.save(product);
        return product;
    }

    public void deleteById(Integer productId) {
        productRepository.deleteById(productId);
    }

    public void updateById(Integer productId, Product updatedProduct) {
        Optional<Product> product = productRepository.findById(productId);
//        if(product.isPresent()){
//          수정될 내용을 기재
//        }
    }
}
