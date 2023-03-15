package com.doran.doran.controller;

import com.doran.doran.model.dto.OrderItemDto;
import com.doran.doran.model.service.ProductService;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
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
                cart = newCart;
            } else {
                for (int i = 0; i < cart.size(); i++) {
                    if (cart.get(i).getOptionId() == item.getOptionId()) {
                        item.setOptionQuantity(cart.remove(i).getOptionQuantity() + 1);
                        break;
                    }
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
                for (int i = 0; i < cart.size(); i++) {
                    if (cart.get(i).getOptionId() == item.getOptionId()) {
                        cart.remove(i);
                        break;
                    }
                }
            }

            session.setAttribute("cart", cart);
        } catch (Exception e) {
            e.printStackTrace();
            flag = false;
        }

        return flag;
    }

    @GetMapping("/setQuantity")
    public boolean setQuantity(@RequestParam("optionId") Integer optionId, @RequestParam("optionQuantity") Integer optionQuantity, HttpSession session) {
        boolean flag = true;

        try {
            List<OrderItemDto> cart = (List<OrderItemDto>) session.getAttribute("cart");
            OrderItemDto item = productService.findByOption(optionId);

            if (cart == null) {
                flag = false;
            } else {
                for (int i = 0; i < cart.size(); i++) {
                    if (cart.get(i).getOptionId() == item.getOptionId()) {
                        OrderItemDto dto = cart.remove(i);
                        dto.setOptionQuantity(optionQuantity);
                        cart.add(i, dto);
                        break;
                    }
                }
            }

            session.setAttribute("cart", cart);
        } catch (Exception e) {
            e.printStackTrace();
            flag = false;
        }
        return flag;
    }


    @GetMapping("/selectList")
    public ResponseEntity<List<OrderItemDto>> showList(HttpSession session) {
        return new ResponseEntity(session.getAttribute("cart"), HttpStatus.OK);
    }
}