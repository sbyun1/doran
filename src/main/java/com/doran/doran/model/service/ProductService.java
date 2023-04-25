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
            MenuItemDto dto = null;

            // Response로 보내기 적절한 타입으로 Entity를 Dto로 변환
            dto = dto.builder()
                    .categoryName(p.getCategory().getCategoryName())
                    .productId(p.getProductId())
                    .productName(p.getProductName())
                    .productDesc(p.getProductDesc())
                    .productOptions(p.getOptions())
                    .build();

            res.add(dto);
        });
        return res;
    }

    public List<MenuItemDto> findByCategory(Integer categoryId) {
        List<MenuItemDto> res = new ArrayList<>();
        Optional<Category> category = categoryRepository.findById(categoryId);
        productRepository.findByCategory(category).forEach(p -> {
            MenuItemDto dto = null;

            // Response로 보내기 적절한 타입으로 Entity를 Dto로 변환
            dto = dto.builder()
                    .categoryName(p.getCategory().getCategoryName())
                    .productId(p.getProductId())
                    .productName(p.getProductName())
                    .productDesc(p.getProductDesc())
                    .productOptions(p.getOptions())
                    .build();

            res.add(dto);
        });
        return res;
    }

    public List<MenuItemDto> findByKeyword(Integer categoryId, String keyword) {
        List<MenuItemDto> res = new ArrayList<>();
        List<Product> products = new ArrayList<>();
        Optional<Category> category = categoryRepository.findById(categoryId);

        if (categoryId == 0) {
            // 카테고리 전체로 선택한 경우
            products = productRepository.findByProductNameContaining(keyword);
        } else {
            products = productRepository.findByCategoryAndProductNameContaining(category.get(), keyword);
        }

        products.forEach(p -> {
            MenuItemDto dto = null;

            // Response로 보내기 적절한 타입으로 Entity를 Dto로 변환
            dto = dto.builder()
                    .categoryName(p.getCategory().getCategoryName())
                    .productId(p.getProductId())
                    .productName(p.getProductName())
                    .productDesc(p.getProductDesc())
                    .productOptions(p.getOptions())
                    .build();

            res.add(dto);
        });

        return res;
    }

    public Optional<ProductOption> findOptionById(Integer optionId) {
        return productOptionRepository.findById(optionId);
    }

    public OrderItemDto findByOption(Integer optionId) {
        Optional<ProductOption> option = productOptionRepository.findById(optionId);
        OrderItemDto dto = null;

        if (option.isPresent()) {
            ProductOption po = option.get();
            dto = dto.builder()
                    .optionId(po.getOptionId())
                    .optionQuantity(po.getOptionId())
                    .optionName(po.getOptionName())
                    .optionUnitPrice(po.getOptionPrice())
                    .productId(po.getProduct().getProductId())
                    .productName(po.getProduct().getProductName())
                    .build();
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
