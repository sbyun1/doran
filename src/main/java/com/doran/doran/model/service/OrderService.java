package com.doran.doran.model.service;

import com.doran.doran.model.entity.Order;
import com.doran.doran.model.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public Order save(Order order) {
        return orderRepository.save(order);
    }

    public Integer getCurrentSequence(Date currentDate) {
        Long count = orderRepository.getCurrentSequence(currentDate);
        return Integer.parseInt(String.valueOf(count));
    }
}
