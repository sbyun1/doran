package com.doran.doran.controller;

import com.doran.doran.model.dto.OrderItemDto;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/")
public class SessionController {
    public void createCartSession(HttpSession session) {
        if (session.getAttribute("cart") == null) {
            List<OrderItemDto> newCart = new ArrayList<>();
            session.setAttribute("cart", newCart);
        }
    }
}
