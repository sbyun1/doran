package com.doran.doran.model.service;

import com.doran.doran.model.dto.OrderDetailsDto;
import com.doran.doran.model.dto.OrderInfoDto;
import com.doran.doran.model.dto.OrderItemDto;
import com.doran.doran.model.entity.Order;
import com.doran.doran.model.entity.OrderInfo;
import com.doran.doran.model.entity.OrderItem;
import com.doran.doran.model.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public Order save(Order order) {
        return orderRepository.save(order);
    }

    public OrderDetailsDto findOrderDetails(Order order) {
        Order currentOrder = orderRepository.findByOrderId(order.getOrderId());
        OrderInfo orderInfo = currentOrder.getOrderInfo();
        List<OrderItem> orderItems = currentOrder.getOrderItems();

        OrderDetailsDto res = new OrderDetailsDto();

        res.setOrderSeq(currentOrder.getOrderSeq());

        OrderInfoDto newInfo = new OrderInfoDto();

        newInfo.setOrderName(orderInfo.getOrderName());
        newInfo.setOrderMemo(orderInfo.getOrderMemo());

        res.setOrderInfo(newInfo);

        List<OrderItemDto> newItems = new ArrayList<>();

        orderItems.forEach(orderItem -> {
            OrderItemDto newItem = OrderItemDto
                    .builder()
                    .productName(orderItem.getOrderOption().getProduct().getProductName())
                    .optionName(orderItem.getOrderOption().getOptionName())
                    .optionQuantity(orderItem.getOrderQuantity())
                    .optionUnitPrice(orderItem.getOrderItemPrice())
                    .shotQuantity(orderItem.getOrderShotQuantity())
                    .build();

            newItems.add(newItem);
        });

        res.setOrderItems(newItems);
        res.setOrderStatus(order.getOrderStatus().toString());

        return res;
    }

    public Integer getCurrentSequence(Date currentDate) {
        Long count = orderRepository.getCurrentSequence(currentDate);
        return Integer.parseInt(String.valueOf(count));
    }

    public Order findByOrderData(int orderSeq, String orderDate) {
        Order res = orderRepository.findByOrderData(orderSeq, orderDate);
        return res;
    }
}
