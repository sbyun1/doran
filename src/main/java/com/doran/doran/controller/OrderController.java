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

    // 결제 방식 선택 후 주문 정보를 저장하도록 변경
    @PostMapping("/place")
    public boolean receiveOrder(@RequestBody OrderDataDto data, HttpSession session) throws JSONException {
        OrderInfoDto orderInfoDto = data.getOrderInfo();
        String paymentType = data.getPaymentType();

        try {
            List<OrderItemDto> cart = (List<OrderItemDto>) session.getAttribute("cart");

            if (cart == null || cart.size() == 0) {
                return false;
            }

            orderInfoDto.setOrderPassword(passwordEncoder.encode(orderInfoDto.getOrderPassword()));
            session.setAttribute("orderInfo", orderInfoDto);
            session.setAttribute("paymentType", paymentType);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

        return true;
    }
}