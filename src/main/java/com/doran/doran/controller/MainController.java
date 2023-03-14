package com.doran.doran.controller;

import com.doran.doran.model.dto.CategoryDto;
import com.doran.doran.model.dto.MenuDto;
import com.doran.doran.model.service.CategoryService;
import com.doran.doran.model.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class MainController {
    @Autowired
    ProductService productService;
    @Autowired
    CategoryService categoryService;

    @GetMapping("/menu/init")
    public ResponseEntity find() {
        Map<String, Object> response = new HashMap<>();

        List<MenuDto> products = productService.findAll();
        List<CategoryDto> categories = categoryService.findAll();

        response.put("products", products);
        response.put("categories", categories);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @GetMapping("/menu/findByCategory")
    public ResponseEntity findByCategory(@RequestParam int categoryId) {
        List<MenuDto> products = productService.findByCategory(categoryId);

        return new ResponseEntity(products, HttpStatus.OK);
    }
}
