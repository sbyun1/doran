package com.doran.doran.controller;

import com.doran.doran.model.dto.OrderDataDto;
import com.doran.doran.model.dto.OrderInfoDto;
import com.doran.doran.model.dto.OrderItemDto;
import com.doran.doran.model.entity.*;
import com.doran.doran.model.service.OrderService;
import com.doran.doran.model.service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired
    OrderService orderService;
    @Autowired
    ProductService productService;
    @Autowired
    PasswordEncoder passwordEncoder;

    // 결제 방식 선택 후 주문 정보를 저장하도록 변경
    @PostMapping("/request")
    public boolean receiveOrder(@RequestBody OrderDataDto data, HttpSession session) throws JSONException {
        OrderInfoDto orderInfoDto = data.getOrderInfo();
        String paymentType = data.getPaymentType();
        boolean paymentStatus = false;

        try {
            List<OrderItemDto> cart = (List<OrderItemDto>) session.getAttribute("cart");

            if (cart == null || cart.size() == 0) {
                return false;
            }

            orderInfoDto.setOrderPassword(passwordEncoder.encode(orderInfoDto.getOrderPassword()));
            session.setAttribute("orderInfo", orderInfoDto);

            if (paymentType.equals("payAfter")) {
                paymentStatus = true;
            }

            session.setAttribute("paymentType", paymentType);
            session.setAttribute("paymentStatus", paymentStatus);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

        return true;
    }

    @GetMapping("/check")
    public boolean checkOrder(HttpSession session) {
        List<OrderItemDto> cart = (List<OrderItemDto>) session.getAttribute("cart");
        OrderInfoDto orderInfoDto = (OrderInfoDto) session.getAttribute("orderInfo");
        String paymentType = (String) session.getAttribute("paymentType");

        boolean paymentStatus = (boolean) session.getAttribute("paymentStatus");

        try {
            if (paymentType == null || orderInfoDto == null || cart == null || !paymentStatus)
                return false;

            OrderInfo orderInfo = new OrderInfo(orderInfoDto);
            Order order = new Order(orderInfo);
            order.setOrderSeq(orderService.getCurrentSequence(order.getOrderDate()) + 1);

            cart.forEach(cartItem -> {
                ProductOption orderOption = productService.findOptionById(cartItem.getOptionId()).get();
                OrderItem orderItem = new OrderItem(orderOption, cartItem);

                order.addOrderItems(orderItem);
            });

            order.setOrderPayment(paymentType);

            Order orderConfirm = orderService.save(order);
            if (orderConfirm != null) {
                session.removeAttribute("cart");
                session.removeAttribute("orderInfo");
                session.removeAttribute("paymentType");

                session.setAttribute("order", orderConfirm);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

        return true;
    }
}