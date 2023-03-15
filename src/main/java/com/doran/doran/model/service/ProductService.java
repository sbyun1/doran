package com.doran.doran.model.service;

import com.doran.doran.model.dto.MenuItemDto;
import com.doran.doran.model.dto.OrderItemDto;
import com.doran.doran.model.entity.Category;
import com.doran.doran.model.entity.Product;
import com.doran.doran.model.entity.ProductOption;
import com.doran.doran.model.repository.CategoryRepository;
import com.doran.doran.model.repository.ProductOptionRepository;
import com.doran.doran.model.repository.ProductRepository;
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
    @Autowired
    private ProductOptionRepository productOptionRepository;

    public List<MenuItemDto> findAll() {
        List<MenuItemDto> res = new ArrayList<MenuItemDto>();
        productRepository.findAll().forEach(p -> {
            MenuItemDto dto = new MenuItemDto();

            // Response로 보내기 적절한 타입으로 Entity를 Dto로 변환
            dto.setCategoryName(p.getCategory().getCategoryName());
            dto.setProductId(p.getProductId());
            dto.setProductName(p.getProductName());
            dto.setProductDesc(p.getProductDesc());
            dto.setProductOptions(p.getOptions());

            res.add(dto);
        });
        return res;
    }

    public List<MenuItemDto> findByCategory(Integer categoryId) {
        List<MenuItemDto> res = new ArrayList<>();
        Optional<Category> category = categoryRepository.findById(categoryId);
        productRepository.findByCategory(category).forEach(p -> {
            MenuItemDto dto = new MenuItemDto();

            // Response로 보내기 적절한 타입으로 Entity를 Dto로 변환
            dto.setCategoryName(p.getCategory().getCategoryName());
            dto.setProductId(p.getProductId());
            dto.setProductName(p.getProductName());
            dto.setProductDesc(p.getProductDesc());
            dto.setProductOptions(p.getOptions());

            res.add(dto);
        });
        return res;
    }

    public List<MenuItemDto> findByKeyword(String keyword) {
        List<MenuItemDto> res = new ArrayList<>();
        productRepository.findByProductNameContaining(keyword).forEach(p -> {
            MenuItemDto dto = new MenuItemDto();

            // Response로 보내기 적절한 타입으로 Entity를 Dto로 변환
            dto.setCategoryName(p.getCategory().getCategoryName());
            dto.setProductId(p.getProductId());
            dto.setProductName(p.getProductName());
            dto.setProductDesc(p.getProductDesc());
            dto.setProductOptions(p.getOptions());

            res.add(dto);
        });

        return res;
    }

    public OrderItemDto findByOption(Integer optionId) {
        Optional<ProductOption> option = productOptionRepository.findById(optionId);
        OrderItemDto dto = new OrderItemDto();

        if (option.isPresent()) {
            ProductOption productOption = option.get();

            dto.setOptionId(productOption.getOptionId());
            dto.setOptionName(productOption.getOptionName());
            dto.setOptionQuantity(1);
            dto.setOptionUnitPrice(productOption.getOptionPrice());
            dto.setProductId(productOption.getProduct().getProductId());
            dto.setProductName(productOption.getProduct().getProductName());
        }

        return dto;
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
