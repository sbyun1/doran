package com.doran.doran.controller;

import com.doran.doran.model.dto.OrderInfoDto;
import com.doran.doran.model.dto.OrderItemDto;
import com.doran.doran.model.entity.*;
import com.doran.doran.model.service.OrderService;
import com.doran.doran.model.service.ProductService;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired
    OrderService orderService;

    @Autowired
    ProductService productService;

    // 결제 방식 선택 없이 주문 처리하는 경우
    @PostMapping("/place")
    public boolean receiveOrder(@RequestBody OrderInfoDto orderInfoDto, HttpSession session) {
        try {
            Order order = new Order();
            List<OrderItemDto> cart = (List<OrderItemDto>) session.getAttribute("cart");

            OrderInfo orderInfo = new OrderInfo();

            orderInfo.setOrderName(orderInfoDto.getOrderName());
            orderInfo.setOrderPassword(orderInfoDto.getOrderPassword());
            orderInfo.setOrderMemo(orderInfoDto.getOrderMemo());

            order.setOrderInfo(orderInfo);
            order.setOrderDate(new Date());
            order.setOrderStatus(OrderStatus.received);

            cart.forEach(cartItem -> {
                OrderItem orderItem = new OrderItem();
                orderItem.setOrderItem(productService.findOptionById(cartItem.getOptionId()).get());
                orderItem.setOrderQuantity(cartItem.getOptionQuantity());
                orderItem.setOrderShotQuantity(cartItem.getShotQuantity());

                order.addOrderItems(orderItem);
            });

            orderService.save(order);

            cart = new ArrayList<>();
            session.setAttribute("cart", cart);
            session.setAttribute("orderSeq", 0);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

        return true;
    }
}
