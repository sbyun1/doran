package com.doran.doran.controller;

import com.doran.doran.model.dto.OrderInfoDto;
import com.doran.doran.model.dto.OrderItemDto;
import com.doran.doran.model.entity.*;
import com.doran.doran.model.service.OrderService;
import com.doran.doran.model.service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.List;


@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired
    OrderService orderService;
    @Autowired
    ProductService productService;
    @Autowired
    PasswordEncoder passwordEncoder;

    // 결제 방식 선택 없이 주문 처리하는 경우
    @PostMapping("/place")
    public boolean receiveOrder(@RequestBody @Validated OrderInfoDto orderInfoDto, HttpSession session) {
        try {
            Order order = new Order();
            List<OrderItemDto> cart = (List<OrderItemDto>) session.getAttribute("cart");

            OrderInfo orderInfo = new OrderInfo();

            orderInfo.setOrderName(orderInfoDto.getOrderName());
            orderInfo.setOrderPassword(passwordEncoder.encode(orderInfoDto.getOrderPassword()));
            orderInfo.setOrderMemo(orderInfoDto.getOrderMemo());

            order.addOrderInfo(orderInfo);
            order.setOrderDate();
            order.setOrderStatus(OrderStatus.received);

            cart.forEach(cartItem -> {
                OrderItem orderItem = new OrderItem();
                orderItem.setOrderItem(productService.findOptionById(cartItem.getOptionId()).get());
                orderItem.setOrderQuantity(cartItem.getOptionQuantity());
                orderItem.setOrderShotQuantity(cartItem.getShotQuantity());

                order.addOrderItems(orderItem);
            });

            Order orderConfirm = orderService.save(order);
            session.setAttribute("order", orderConfirm);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

        return true;
    }
}
