package com.doran.doran.model.service;

import com.doran.doran.model.dto.OrderTokenDto;
import com.doran.doran.model.entity.OrderToken;
import com.doran.doran.model.repository.OrderTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderTokenService {
    private final OrderTokenRepository orderTokenRepository;

    public OrderToken save(int orderId, OrderTokenDto data) {
        OrderToken result = null;
        try {
            Optional<OrderToken> prevToken = orderTokenRepository.findById(String.valueOf(orderId));
            if (prevToken.isPresent()) {
                orderTokenRepository.delete(prevToken.get());
            }
        } finally {
            OrderToken orderToken = OrderToken.builder()
                    .id(String.valueOf(orderId))
                    .orderTel(data.getOrderTel())
                    .tokenNum(data.getTokenNum())
                    .expiredTime(180)
                    .build();
            result = orderTokenRepository.save(orderToken);
        }
        return result;
    }

    public boolean checkToken(int orderId, OrderTokenDto data) {
        boolean result = true;
        try {
            Optional<OrderToken> currentToken = orderTokenRepository.findById(String.valueOf(orderId));
            if (!(currentToken.isPresent()
                    && currentToken.get().getTokenNum().equals(data.getTokenNum())
                    && currentToken.get().getOrderTel().equals(data.getOrderTel())))
                result = false;
        } catch (Exception e) {
            result = false;
        }
        return result;
    }

    public String createToken() {
        int tokenNum = (int) (Math.random() * (999999 - 100000 + 1)) + 100000;
        return Integer.toString(tokenNum);
    }
}
