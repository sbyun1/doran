package com.doran.doran.controller;

import com.doran.doran.model.dto.OrderItemDto;
import com.doran.doran.model.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {
    @Autowired
    ProductService productService;

    @GetMapping("/add")
    public boolean addItem(@RequestParam("optionId") Integer optionId, HttpSession session) {
        boolean flag = true;

        try {
            List<OrderItemDto> cart = (List<OrderItemDto>) session.getAttribute("cart");
            OrderItemDto item = productService.findByOption(optionId);

            if (cart == null) {
                List<OrderItemDto> newCart = new ArrayList<>();
                newCart.add(item);
            } else {
                if (cart.contains(item)) {
                    int cartIndex = cart.indexOf(item);
                    item.setOptionQuantity(cart.remove(cartIndex).getOptionQuantity() + 1);
                }
                cart.add(item);
            }

            session.setAttribute("cart", cart);
        } catch (Exception e) {
            e.printStackTrace();
            flag = false;
        }

        return flag;
    }

    @GetMapping("/remove")
    public boolean removeItem(@RequestParam("optionId") Integer optionId, HttpSession session) {
        boolean flag = true;

        try {
            List<OrderItemDto> cart = (List<OrderItemDto>) session.getAttribute("cart");
            OrderItemDto item = productService.findByOption(optionId);

            if (cart == null) {
                flag = false;
            } else {
                if (cart.contains(item)) {
                    int cartIndex = cart.indexOf(item);
                    cart.remove(cartIndex);
                }
            }

            session.setAttribute("cart", cart);
        } catch (Exception e) {
            e.printStackTrace();
            flag = false;
        }

        return flag;
    }


    @GetMapping("/showList")
    public ResponseEntity showList(HttpSession session) {
        return new ResponseEntity(session.getAttribute("cart"), HttpStatus.OK);
    }
}