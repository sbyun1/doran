package com.doran.doran.controller;

import com.doran.doran.model.dto.*;
import com.doran.doran.model.entity.*;
import com.doran.doran.model.service.*;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.List;


@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired
    OrderService orderService;
    @Autowired
    ProductService productService;
    @Autowired
    OrderTokenService orderTokenService;
    @Autowired
    MessageService messageService;
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

            /*
             * 결제 방식이 현장 결제인 경우에만
             * 결제 상태를 참으로 변경하고
             * 아닌 경우(ex: 간편결제-카카오페이 선택 시)
             * 결제가 완료된 후에 결제 상태를 변경하도록 구현
             */
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

    /*
     * 주문자 정보가 확실하고,
     * 주문 내역이 존재하며,
     * 결제가 완료된 경우에만 DB에 저장하도록 구현
     */
    @GetMapping("/check")
    public int checkOrder(HttpSession session) {
        int orderSeq = 0;

        try {
            List<OrderItemDto> cart = (List<OrderItemDto>) session.getAttribute("cart");
            OrderInfoDto orderInfoDto = (OrderInfoDto) session.getAttribute("orderInfo");
            String paymentType = (String) session.getAttribute("paymentType");

            boolean paymentStatus = (boolean) session.getAttribute("paymentStatus");

            if (paymentType == null || orderInfoDto == null || cart == null || !paymentStatus)
                return 0;

            OrderInfo orderInfo = new OrderInfo(orderInfoDto);
            Order order = new Order(orderInfo);
            orderSeq = orderService.getCurrentSequence(order.getOrderDate()) + 1;
            order.setOrderSeq(orderSeq);

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
            return 0;
        }

        return orderSeq;
    }

    /*
     * Naver SMS API와 연결하기 전
     * Redis에 저장이 된 후 확인이 되는 것 까지
     */
    @PostMapping("/sendMessage")
    public boolean sendMessage(@RequestBody OrderTokenDto data, HttpSession session) throws UnsupportedEncodingException, NoSuchAlgorithmException, URISyntaxException, InvalidKeyException, JsonProcessingException {
        Order currentOrder = (Order) session.getAttribute("order");
        data.setTokenNum(orderTokenService.createToken());

        OrderToken orderToken = orderTokenService.save(currentOrder.getOrderId(), data);
        boolean isSaved = !orderToken.equals(null);

//        if (isSaved) {
//            messageService.sendMessage(orderToken.getTokenNum(), orderToken.getOrderTel());
//        }
        return isSaved;
    }

    @PostMapping("/checkToken")
    public boolean checkToken(@RequestBody OrderTokenDto data, HttpSession session) {
        Order currentOrder = (Order) session.getAttribute("order");
        Order newOrder = null;

        boolean isValid = orderTokenService.checkToken(currentOrder.getOrderId(), data);

        if (isValid) {
            currentOrder.getOrderInfo().setOrderTel(data.getOrderTel());
            newOrder = orderService.save(currentOrder);
        }
        session.setAttribute("order", newOrder);
        return isValid;
    }

    @PostMapping("/checkAuth")
    public boolean checkAuth(@RequestBody OrderDataDto data, HttpSession session) {
        boolean isValid = false;

        try {
            Order order = orderService.findByOrderData(data.getOrderSeq(), data.getOrderDate());
            OrderInfo responseInfo = order.getOrderInfo();

            OrderInfoDto requestInfo = data.getOrderInfo();
            if (passwordEncoder.matches(requestInfo.getOrderPassword(), responseInfo.getOrderPassword())
                    && responseInfo.getOrderName().equals(requestInfo.getOrderName())) {
                isValid = true;
                // 세션에 현재 불러온 주문 정보를 저장
                session.setAttribute("order", order);
            }

        } catch (Exception e) {
            e.printStackTrace();
            isValid = false;
        }

        return isValid;
    }

    @GetMapping("/getDetails")
    public ResponseEntity<OrderDetailsDto> getOrderDetails(HttpSession session) {
        OrderDetailsDto result = orderService.findOrderDetails((Order) session.getAttribute("order"));
        return new ResponseEntity(result, HttpStatus.OK);
    }

}