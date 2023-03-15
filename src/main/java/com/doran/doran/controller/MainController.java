package com.doran.doran.controller;

import com.doran.doran.model.dto.CategoryDto;
import com.doran.doran.model.dto.MenuItemDto;
import com.doran.doran.model.service.CategoryService;
import com.doran.doran.model.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/menu")
public class MainController {
    @Autowired
    ProductService productService;
    @Autowired
    CategoryService categoryService;

    @GetMapping("/init")
    public ResponseEntity find() {
        Map<String, Object> res = new HashMap<>();

        List<MenuItemDto> products = productService.findAll();
        List<CategoryDto> categories = categoryService.findAll();

        res.put("products", products);
        res.put("categories", categories);

        return new ResponseEntity(res, HttpStatus.OK);
    }

    @GetMapping("/findByCategory")
    public ResponseEntity findByCategory(@RequestParam int categoryId) {
        List<MenuItemDto> res;

        if (categoryId == 0)
            res = productService.findAll();
        else
            res = productService.findByCategory(categoryId);

        return new ResponseEntity(res, HttpStatus.OK);
    }

    @GetMapping("/findByKeyword")
    public ResponseEntity findByKeyword(@RequestParam String keyword) {
        List<MenuItemDto> res = productService.findByKeyword(keyword);

        return new ResponseEntity(res, HttpStatus.OK);

    }
}
