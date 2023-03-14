package com.doran.doran.model.service;

import com.doran.doran.model.dto.CategoryDto;
import com.doran.doran.model.entity.Category;
import com.doran.doran.model.repo.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    public List<CategoryDto> findAll() {
        List<CategoryDto> list = new ArrayList<>();
        categoryRepository.findAll().forEach(c -> {
            CategoryDto dto = new CategoryDto();

            dto.setCategoryId(c.getCategoryId());
            dto.setCategoryName(c.getCategoryName());

            list.add(dto);
        });
        return list;
    }

    public Optional<Category> findById(Integer categoryId) {
        Optional<Category> category = categoryRepository.findById(categoryId);
        return category;
    }

    public Category save(Category category) {
        categoryRepository.save(category);
        return category;
    }

    public void deleteById(Integer categoryId) {
        categoryRepository.deleteById(categoryId);
    }

    public void updateById(Integer categoryId, Category updatedCategory) {
        Optional<Category> category = categoryRepository.findById(categoryId);
        // if (category.isPresent()){
        //  수정된 내용을 기재
        // }
    }
}
