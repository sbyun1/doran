package com.doran.doran.controller;

import com.doran.doran.model.dto.OrderItemDto;
import com.doran.doran.model.service.ProductService;
import org.apache.coyote.Request;
import org.aspectj.weaver.ast.Or;
import org.hibernate.criterion.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public boolean addItem(@RequestBody OrderItemDto newItem, HttpSession session) {
        boolean flag = true;

        try {
            List<OrderItemDto> cart = (List<OrderItemDto>) session.getAttribute("cart");
            int orderSeq = (int) session.getAttribute("orderSeq");

            OrderItemDto item = productService.findByOption(newItem.getOptionId());

            item.setOrderItemId(orderSeq + 1);
            item.setOptionQuantity(newItem.getOptionQuantity());
            item.setShotQuantity(newItem.getShotQuantity());

            int index = cart.size();

            for (int i = 0; i < cart.size(); i++) {
                OrderItemDto currentItem = cart.get(i);
                if (currentItem.getOptionId() == item.getOptionId() && currentItem.getShotQuantity() == item.getShotQuantity()) {
                    OrderItemDto oldItem = cart.remove(i);
                    item.setOptionQuantity(oldItem.getOptionQuantity() + newItem.getOptionQuantity());
                    index = i;
                    break;
                }
            }
            cart.add(index, item);

            session.setAttribute("cart", cart);
            session.setAttribute("orderSeq", orderSeq + 1);
        } catch (
                Exception e) {
            e.printStackTrace();
            flag = false;
        }

        return flag;
    }

    @GetMapping("/remove")
    public boolean removeItem(@RequestParam("orderItemId") Integer orderItemId, HttpSession session) {
        boolean flag = true;

        try {
            List<OrderItemDto> cart = (List<OrderItemDto>) session.getAttribute("cart");

            for (int i = 0; i < cart.size(); i++) {
                if (cart.get(i).getOrderItemId() == orderItemId) {
                    cart.remove(i);
                    flag = true;
                    break;
                } else {
                    flag = false;
                }
            }

            session.setAttribute("cart", cart);
        } catch (Exception e) {
            e.printStackTrace();
            flag = false;
        }

        return flag;
    }

    @RequestMapping(value = "/setQuantity", method = RequestMethod.POST)
    public boolean setQuantity(@RequestBody OrderItemDto changedItem, HttpSession session) {
        boolean flag = true;

        try {
            List<OrderItemDto> cart = (List<OrderItemDto>) session.getAttribute("cart");

            for (int i = 0; i < cart.size(); i++) {
                if (cart.get(i).getOrderItemId() == changedItem.getOrderItemId()) {
                    OrderItemDto item = cart.remove(i);
                    item.setOptionQuantity(changedItem.getOptionQuantity());
                    cart.add(i, item);
                    flag = true;
                    break;
                } else {
                    flag = false;
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
        List<OrderItemDto> cart = (List<OrderItemDto>) session.getAttribute("cart");
        if (cart == null) {
            cart = new ArrayList<>();
            session.setAttribute("cart", cart);
            session.setAttribute("orderSeq", 0);
        }
        return new ResponseEntity(cart, HttpStatus.OK);
    }
}